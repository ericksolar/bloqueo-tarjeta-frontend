import errorIcon from "../../assets/figma/alert-error.svg";
import infoIcon from "../../assets/figma/alert-info.svg";
import successIcon from "../../assets/figma/alert-success.svg";
import chevronRightInfo from "../../assets/figma/chevron-right-info.svg";

function WarningIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="currentColor" aria-hidden="true">
      <path d="M8.7 2.75a1.5 1.5 0 0 1 2.6 0l7.1 12.5A1.5 1.5 0 0 1 17.1 17.5H2.9a1.5 1.5 0 0 1-1.3-2.25l7.1-12.5Z" />
      <rect x="9.1" y="7" width="1.8" height="5.2" rx="0.9" fill="white" />
      <circle cx="10" cy="14.4" r="1" fill="white" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden="true">
      <path d="m7.5 4.5 5.5 5.5-5.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const variants = {
  success: { icon: <img src={successIcon} alt="" className="size-5" />, box: "bg-green-soft", text: "text-green-darker" },
  error: { icon: <img src={errorIcon} alt="" className="size-5" />, box: "bg-red-soft", text: "text-red-darker" },
  info: { icon: <img src={infoIcon} alt="" className="size-5" />, box: "bg-blue-soft", text: "text-info-dark" },
  warning: { icon: <WarningIcon />, box: "bg-yellow-soft", text: "text-yellow-darker" },
};

/** Message Item del sistema de diseño (success / error / info / warning). */
export default function Alert({ variant = "info", children, action, role }) {
  const { icon, box, text } = variants[variant];

  return (
    <div
      role={role ?? (variant === "error" ? "alert" : "status")}
      className={`flex w-full items-start gap-2 rounded-[4px] px-3 py-[10px] ${box} ${text}`}
    >
      <span className="flex py-1">{icon}</span>
      <div className="flex flex-1 flex-col items-start gap-1 sm:flex-row sm:gap-[18px]">
        <p className="flex-1 py-1 text-[14px] leading-5">{children}</p>
        {action && (
          <button
            type="button"
            onClick={action.onClick}
            className={`flex shrink-0 items-start gap-2 py-1 text-left text-[14px] leading-5 ${
              variant === "warning" ? "font-normal" : "font-medium"
            }`}
          >
            {action.label}
            {variant === "info" ? <img src={chevronRightInfo} alt="" className="size-5" /> : <ChevronRight />}
          </button>
        )}
      </div>
    </div>
  );
}
