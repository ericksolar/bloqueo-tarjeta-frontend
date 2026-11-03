import arrowLeft from "../../assets/figma/arrow-left.svg";

export function PrimaryButton({ children, className = "", ...props }) {
  return (
    <button
      type="button"
      className={`flex h-12 items-center justify-center rounded-[4px] bg-brand-secondary px-6 text-center text-[14px] font-medium leading-5 text-white enabled:hover:bg-[#006a9c] disabled:cursor-not-allowed disabled:bg-disabled-fill ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function BackButton({ onClick, label = "Volver" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-12 items-center gap-2 rounded-[4px] pl-4 pr-6 text-[14px] font-medium leading-5 text-brand hover:bg-brand/5"
    >
      <img src={arrowLeft} alt="" className="size-6" />
      {label}
    </button>
  );
}
