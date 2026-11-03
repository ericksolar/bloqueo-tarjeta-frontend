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
const NETWORK_ERROR = "No pudimos conectarnos con el servidor. Revisa tu conexión e inténtalo nuevamente.";

/**
 * Error de la API. El backend siempre responde `{ detail, code }` (y `errors`
 * en los 422), así que `message` es apto para mostrarse al usuario.
 * `status` 0 = no hubo respuesta (sin conexión, servidor caído, CORS).
 */
export class ApiError extends Error {
  constructor(status, code, message, errors = []) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.errors = errors;
  }

  get isNetworkError() {
    return this.status === 0;
  }
}

/**
 * Mensaje para mostrar en pantalla:
 * - 4xx: el mensaje del backend (es específico: "La tarjeta ya se encuentra bloqueada.", etc.).
 * - sin conexión: aviso de conexión.
 * - 5xx u otro error: `fallback`, el mensaje propio de la pantalla.
 */
export function getErrorMessage(error, fallback = GENERIC_ERROR) {
  if (!(error instanceof ApiError)) return fallback;
  if (error.isNetworkError) return NETWORK_ERROR;
  if (error.status >= 400 && error.status < 500) return error.message;
  return fallback;
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
  return new ApiError(res.status, data.code ?? "http_error", message, data.errors ?? []);
}

export async function request(path, { method = "GET", body, retry = true } = {}) {
  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method,
      credentials: "include",
      headers: body === undefined ? undefined : { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    // fetch solo rechaza si no hubo respuesta: red caída, servidor apagado o CORS.
    throw new ApiError(0, "network_error", NETWORK_ERROR);
  }

  if (res.status === 401 && retry && !path.startsWith("/auth/")) {
    if (await refreshSession()) {
      return request(path, { method, body, retry: false });
    }
    sessionExpiredHandler();
  }

  if (!res.ok) throw await toApiError(res);
  return res.status === 204 ? null : res.json();
}
