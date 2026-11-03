/** Convierte las respuestas del backend (snake_case) al formato que usan los componentes. */
import cardBlue from "../assets/figma/card-xs-blue.svg";
import cardGray from "../assets/figma/card-xs-gray.svg";
import cardRed from "../assets/figma/card-xs-red.svg";
import cardYellow from "../assets/figma/card-xs-yellow.svg";
import { blockReasons } from "../data/blockReasons";
import { formatLastAccess } from "../utils/date";

const thumbnails = {
  "#DBAC04": cardYellow,
  "#F22435": cardRed,
  "#5F5F5F": cardGray,
  "#03386C": cardBlue,
};

const holderLabel = { TITULAR: "Titular", ADICIONAL: "Adicional" };

export function toUser(api) {
  return {
    name: api.name,
    initials: api.initials,
    hasPassBanco: api.has_pass_banco,
    // `last_access_at` es la sesión anterior; en el primer ingreso no existe.
    lastAccess: formatLastAccess(api.last_access_at ? new Date(api.last_access_at) : new Date()),
  };
}

export function toCard(api) {
  return {
    id: api.id,
    kind: api.kind.toLowerCase(), // "credit" | "debit"
    title: api.title,
    last4: api.last4,
    holder: holderLabel[api.holder] ?? api.holder,
    network: api.network,
    cardholderName: api.cardholder_name,
    color: api.color,
    thumbnail: thumbnails[api.color.toUpperCase()] ?? cardGray,
    balance: api.balance,
    status: api.status,
    locked: api.status !== "ACTIVE",
    permanentlyBlocked: api.status === "PERMANENTLY_BLOCKED",
    limits: api.limits,
  };
}

export function toReceipt(api) {
  return {
    date: new Date(api.created_at),
    operationId: api.operation_number,
    availableFrom: api.available_from,
    reason: blockReasons.find((r) => r.id === api.reason) ?? { id: api.reason, label: api.reason },
    branch: api.branch,
    card: toCard(api.card),
  };
}
