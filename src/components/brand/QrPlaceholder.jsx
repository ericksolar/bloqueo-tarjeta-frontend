/**
 * QR de ejemplo (no escaneable). Reemplazar por el QR real de cada tienda.
 * Genera un patrón determinista a partir de `seed`.
 */
const SIZE = 25;

function modules(seed) {
  let x = seed;
  const rand = () => {
    x = (x * 1103515245 + 12345) & 0x7fffffff;
    return x / 0x7fffffff;
  };
  const cells = [];
  const inFinder = (r, c) =>
    (r < 8 && c < 8) || (r < 8 && c >= SIZE - 8) || (r >= SIZE - 8 && c < 8);
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (!inFinder(r, c) && rand() > 0.5) cells.push([r, c]);
    }
  }
  return cells;
}

function Finder({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="7" height="7" />
      <rect x="1" y="1" width="5" height="5" fill="white" />
      <rect x="2" y="2" width="3" height="3" />
    </g>
  );
}

export default function QrPlaceholder({ seed = 1, label }) {
  return (
    <svg
      viewBox={`-1 -1 ${SIZE + 2} ${SIZE + 2}`}
      className="size-[121px] bg-white"
      role="img"
      aria-label={label}
      shapeRendering="crispEdges"
    >
      {modules(seed).map(([r, c]) => (
        <rect key={`${r}-${c}`} x={c} y={r} width="1" height="1" />
      ))}
      <Finder x={0} y={0} />
      <Finder x={SIZE - 7} y={0} />
      <Finder x={0} y={SIZE - 7} />
    </svg>
  );
}
