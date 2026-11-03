/** Deja solo dígitos y K, en mayúscula. Máximo 9 caracteres (8 + DV). */
export function cleanRut(value) {
  return value.replace(/[^0-9kK]/g, "").toUpperCase().slice(0, 9);
}

/** Formatea como 12.345.678-K mientras se escribe. */
export function formatRut(value) {
  const clean = cleanRut(value);
  if (clean.length < 2) return clean;
  const body = clean.slice(0, -1).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${body}-${clean.slice(-1)}`;
}

/** Valida el dígito verificador (módulo 11). */
export function isValidRut(value) {
  const clean = cleanRut(value);
  if (!/^\d{7,8}[0-9K]$/.test(clean)) return false;

  const body = clean.slice(0, -1);
  let sum = 0;
  let factor = 2;
  for (let i = body.length - 1; i >= 0; i--) {
    sum += Number(body[i]) * factor;
    factor = factor === 7 ? 2 : factor + 1;
  }
  const rest = 11 - (sum % 11);
  const expected = rest === 11 ? "0" : rest === 10 ? "K" : String(rest);
  return clean.slice(-1) === expected;
}
