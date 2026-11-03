/**
 * Switch 48x24 del sistema de diseño. El estado "on" replica el componente
 * de Figma (track #007DB7, knob blanco de 18px con sombra).
 */
export default function Switch({ checked, onChange, label, disabled = false }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-12 shrink-0 rounded-full transition-colors disabled:cursor-wait disabled:opacity-60 ${
        checked ? "bg-brand-secondary" : "bg-[#bdbdbd]"
      }`}
    >
      <span
        className={`absolute top-[3px] size-[18px] rounded-full bg-white shadow-[0_3px_1px_rgba(0,0,0,0.06),0_3px_8px_rgba(0,0,0,0.15)] outline outline-[0.5px] outline-black/5 transition-[left] ${
          checked ? "left-[27px]" : "left-[3px]"
        }`}
      />
    </button>
  );
}
