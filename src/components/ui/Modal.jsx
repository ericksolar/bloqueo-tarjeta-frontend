import { useEffect, useId, useRef } from "react";

/** Modal centrado con fondo oscuro. Cierra con Escape o clic fuera. */
export default function Modal({ open, onClose, title, illustration, children, actions }) {
  const titleId = useId();
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    dialogRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/50 sm:items-center sm:p-4" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[480px] overflow-hidden rounded-t-[10px] bg-white shadow-xl outline-none sm:rounded-[5px]"
      >
        <div className="flex flex-col items-center gap-3 px-6 pb-6 pt-8 text-center sm:px-10">
          {illustration}
          <h2 id={titleId} className="text-[18px] font-bold leading-6 text-label sm:text-[20px] sm:leading-[26px]">
            {title}
          </h2>
          <div className="text-[14px] leading-5 text-label">{children}</div>
        </div>
        <div className="flex flex-col-reverse gap-2 border-t border-border px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          {actions}
        </div>
      </div>
    </div>
  );
}
