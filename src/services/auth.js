import { toUser } from "./adapters";
import { request } from "./api";

export async function login(rut, password) {
  const data = await request("/auth/login", { method: "POST", body: { rut, password } });
  return toUser(data.user);
}

export function logout() {
  return request("/auth/logout", { method: "POST" });
}

/** Usuario de la sesión actual (renueva la sesión con el refresh token si hace falta). */
export async function getMe() {
  return toUser(await request("/me"));
}
