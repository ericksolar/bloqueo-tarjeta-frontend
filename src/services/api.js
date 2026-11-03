/**
 * Cliente HTTP del backend (FastAPI).
 *
 * - La sesión viaja en cookies httpOnly (`credentials: "include"`), el frontend
 *   nunca ve los tokens.
 * - Si una llamada responde 401, intenta renovar la sesión con
 *   `POST /auth/refresh` y repite la llamada una vez. Si el refresh también
 *   falla, avisa con `onSessionExpired` para volver al login.
 *
 * En desarrollo `/api` pasa por el proxy de Vite hacia http://localhost:8000.
 */
const BASE_URL = import.meta.env.VITE_API_URL ?? "/api/v1";

const GENERIC_ERROR = "No fue posible completar la operación. Inténtalo nuevamente.";

export class ApiError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

let sessionExpiredHandler = () => {};

/** Registra qué hacer cuando la sesión no se puede renovar (ir al login). */
export function onSessionExpired(handler) {
  sessionExpiredHandler = handler;
}

// Si varias llamadas reciben 401 a la vez, comparten un único refresh.
let refreshPromise = null;

function refreshSession() {
  refreshPromise ??= fetch(`${BASE_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  })
    .then((res) => res.ok)
    .catch(() => false)
    .finally(() => {
      refreshPromise = null;
    });
  return refreshPromise;
}

async function toApiError(res) {
  const data = await res.json().catch(() => ({}));
  const message = typeof data.detail === "string" ? data.detail : GENERIC_ERROR;
  return new ApiError(res.status, data.code, message);
}

export async function request(path, { method = "GET", body, retry = true } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    credentials: "include",
    headers: body === undefined ? undefined : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (res.status === 401 && retry && !path.startsWith("/auth/")) {
    if (await refreshSession()) {
      return request(path, { method, body, retry: false });
    }
    sessionExpiredHandler();
  }

  if (!res.ok) throw await toApiError(res);
  return res.status === 204 ? null : res.json();
}
