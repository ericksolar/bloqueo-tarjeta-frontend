import { toCard, toReceipt } from "./adapters";
import { request } from "./api";

export async function getCards() {
  return (await request("/cards")).map(toCard);
}

/** Bloqueo (`locked = true`) o desbloqueo temporal. Devuelve la tarjeta actualizada. */
export async function setCardLock(cardId, locked) {
  const action = locked ? "block" : "unblock";
  return toCard(await request(`/cards/${cardId}/${action}`, { method: "POST" }));
}

/** "Administra tus bloqueos". `changes` = { presential?, online?, atm? }. */
export async function updateCardLimits(cardId, changes) {
  return toCard(await request(`/cards/${cardId}/limits`, { method: "PATCH", body: changes }));
}

/** Bloqueo definitivo con reemplazo. Devuelve el comprobante. */
export async function blockAndReplaceCard(cardId, { reasonId, branchId }) {
  const data = await request(`/cards/${cardId}/replacement`, {
    method: "POST",
    body: { reason: reasonId, branch_id: branchId },
  });
  return toReceipt(data);
}

/** Comprobante de una tarjeta ya bloqueada definitivamente. */
export async function getReplacementReceipt(cardId) {
  return toReceipt(await request(`/cards/${cardId}/replacement`));
}

let regionsCache = null;

/** Regiones con sus sucursales (se piden una sola vez). */
export async function getRegions() {
  regionsCache ??= request("/regions").catch((error) => {
    regionsCache = null;
    throw error;
  });
  return regionsCache;
}
