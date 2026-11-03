/** Isotipo genérico del banco (24x24). Usa `currentColor`. */
export function BrandMark({ className = "size-6" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 1.5 22.5 7v2.5h-21V7L12 1.5Z" />
      <rect x="3.5" y="11" width="3" height="7.5" rx="0.5" />
      <rect x="8.25" y="11" width="3" height="7.5" rx="0.5" />
      <rect x="12.75" y="11" width="3" height="7.5" rx="0.5" />
      <rect x="17.5" y="11" width="3" height="7.5" rx="0.5" />
      <rect x="1.5" y="20" width="21" height="2.5" rx="0.5" />
    </svg>
  );
}

/** Logo "BANCO" (isotipo + texto). Ocupa el mismo espacio que el logo del diseño (170x30). */
export function BrandLogo({ className = "" }) {
  return (
    <span className={`flex h-[30px] w-[170px] items-center gap-2 ${className}`}>
      <BrandMark className="size-[30px] shrink-0" />
      <span className="text-[26px] font-bold leading-none tracking-[1px]">BANCO</span>
    </span>
  );
}
