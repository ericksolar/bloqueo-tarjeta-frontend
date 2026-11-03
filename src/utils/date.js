const months = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

const shortMonths = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

/** "30 Ago 2024 09:15hrs" (formato del encabezado "Último acceso"). */
export function formatLastAccess(date) {
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  return `${dd} ${shortMonths[date.getMonth()]} ${date.getFullYear()} ${hh}:${mm}hrs`;
}

/** "08 de febrero, 2024 11:27 hrs." */
export function formatReceiptDate(date) {
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  return `${dd} de ${months[date.getMonth()]}, ${date.getFullYear()} ${hh}:${mm} hrs.`;
}
