const clp = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

/** 445900 → "$445.900" */
export function formatCLP(amount) {
  return clp.format(amount);
}
