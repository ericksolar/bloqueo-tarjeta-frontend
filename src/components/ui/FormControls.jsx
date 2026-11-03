/** Radio del sistema de diseño (anillo gris; seleccionado: azul con punto). */
export function Radio({ name, value, checked, onChange, label }) {
  return (
    <label className="flex w-fit cursor-pointer items-center gap-3 py-2 text-[14px] leading-5 text-label">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className={`flex size-6 items-center justify-center rounded-full border-2 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-brand-secondary/30 ${
          checked ? "border-brand-secondary" : "border-label-secondary"
        }`}
      >
        {checked && <span className="size-3 rounded-full bg-brand-secondary" />}
      </span>
      {label}
    </label>
  );
}

/** Select nativo con el estilo del diseño (chevron azul; deshabilitado en gris). */
export function Select({ id, label, value, onChange, placeholder, options, disabled = false }) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id} className="text-[14px] font-bold leading-5 text-label">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={`h-12 w-full appearance-none rounded-[4px] border px-3 pr-10 text-[14px] leading-5 outline-none transition-colors focus:border-brand-secondary focus:ring-2 focus:ring-brand-secondary/20 ${
            disabled
              ? "cursor-not-allowed border-border bg-bg-secondary text-[#bdbdbd]"
              : `cursor-pointer border-label-secondary bg-white ${value ? "text-label" : "text-disabled"}`
          }`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={`pointer-events-none absolute right-3 top-1/2 size-6 -translate-y-1/2 ${
            disabled ? "text-[#bdbdbd]" : "text-brand-secondary"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}
