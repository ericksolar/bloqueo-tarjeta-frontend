/** Contenedor de card estándar (borde + sombra "Card shadow/Primary"). */
export function Card({ children, className = "" }) {
  return (
    <section
      className={`w-full overflow-hidden rounded-[5px] border border-border bg-white shadow-card ${className}`}
    >
      {children}
    </section>
  );
}

export function CardHeader({ title, size = "lg", children }) {
  const text =
    size === "lg"
      ? "text-[20px] leading-[26px] sm:text-[24px] sm:leading-[30px]"
      : "text-[18px] leading-6 sm:text-[20px] sm:leading-[26px]";
  return (
    <header className="flex items-center gap-2 border-b border-border bg-white py-4 pl-4 pr-4 sm:py-5 sm:pl-8">
      <h2 className={`font-bold text-label ${text}`}>{title}</h2>
      {children}
    </header>
  );
}
