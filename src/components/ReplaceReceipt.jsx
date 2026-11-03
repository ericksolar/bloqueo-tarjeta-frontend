import { BrandMark } from "./brand/BrandMark";
import Alert from "./ui/Alert";
import { Card } from "./ui/Card";
import { formatReceiptDate } from "../utils/date";
import { SimplePdf } from "../utils/pdf";

const kindLabel = { credit: "Crédito", debit: "Débito" };
const NOTE = "La nueva tarjeta estará disponible 3 días hábiles desde la fecha de bloqueo.";

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M4 19h16" />
    </svg>
  );
}

function downloadPdf(receipt) {
  const { card, reason, branch } = receipt;
  const date = formatReceiptDate(receipt.date);
  const pdf = new SimplePdf();
  pdf.rect(0, 0, 595.28, 70, "#E81E2B").text(48, 44, "BANCO", { size: 22, bold: true, color: "#FFFFFF" });
  pdf.text(48, 120, "Comprobante", { size: 20, bold: true });
  pdf.text(48, 150, "Bloqueo y reemplazo de tarjeta", { size: 13, bold: true });
  pdf.line(48, 165, 547);

  const rows = [
    ["Tarjeta bloqueada", kindLabel[card.kind]],
    ["N° de tarjeta", `**** **** **** ${card.last4}`],
    ["Motivo del bloqueo", reason.label],
    ["Sucursal de retiro", `${branch.name} - ${branch.address}`],
    ["N° de operación", receipt.operationId],
    ["Fecha", date],
  ];
  let y = 192;
  for (const [label, value] of rows) {
    pdf.text(48, y, label, { bold: true }).text(200, y, value);
    pdf.line(48, y + 14, 547);
    y += 34;
  }
  pdf.text(48, y + 6, NOTE, { size: 10, bold: true });
  pdf.text(48, y + 30, "Solo el titular podrá retirar la nueva tarjeta presentando su cédula de identidad.", {
    size: 10,
    color: "#646569",
  });
  pdf.text(48, 800, "Transacciones 100% seguras", { size: 9, color: "#747474" });
  pdf.download(`comprobante-bloqueo-reemplazo-${card.last4}.pdf`);
}

function Row({ label, value }) {
  return (
    <div className="flex flex-col gap-1 border-b border-separator px-4 py-4 sm:flex-row sm:gap-0 sm:px-8">
      <span className="text-[14px] font-bold leading-5 text-label sm:w-[260px]">{label}</span>
      <span className="text-[14px] leading-5 text-label">{value}</span>
    </div>
  );
}

/** Comprobante del bloqueo y reemplazo (descargable en PDF). */
/**
 * `showSuccess`: el mensaje de éxito solo se muestra justo después del bloqueo,
 * no cuando se vuelve a abrir el comprobante.
 */
export default function ReplaceReceipt({ receipt, onHome, showSuccess = true }) {
  const { card } = receipt;
  return (
    <div className="flex max-w-[936px] flex-col gap-4">
      {showSuccess && (
        <Alert variant="success">
          Tu tarjeta ya está bloqueada y estamos preparando una nueva. Enviaremos el comprobante a tu
          e-mail registrado.
        </Alert>
      )}

      <Card>
        <header className="flex items-center justify-between gap-4 border-b border-border px-4 py-4 sm:px-8 sm:py-5">
          <h2 className="text-[20px] font-bold leading-[26px] text-label sm:text-[24px] sm:leading-[30px]">
            Comprobante
          </h2>
          <button
            type="button"
            onClick={() => downloadPdf(receipt)}
            className="flex items-center gap-2 rounded-[4px] px-2 py-2 text-[14px] font-medium leading-5 text-brand hover:bg-brand/5"
          >
            Descargar
            <DownloadIcon />
          </button>
        </header>

        <p className="border-b border-separator px-4 py-4 text-[16px] font-bold leading-[22px] text-label sm:px-8">
          Bloqueo y reemplazo de tarjeta
        </p>
        <Row label="Tarjeta bloqueada" value={kindLabel[card.kind]} />
        <Row label="N° de tarjeta" value={`**** **** **** ${card.last4}`} />
        <p className="border-b border-separator px-4 py-4 text-[14px] font-bold leading-5 text-label sm:px-8">
          {NOTE}
        </p>

        <div className="flex items-end justify-between gap-4 px-4 py-5 sm:px-8">
          <div className="flex flex-col gap-1">
            <span className="text-[14px] leading-5 text-label">Fecha</span>
            <span className="text-[14px] font-bold leading-5 text-label">
              {formatReceiptDate(receipt.date)}
            </span>
          </div>
          <div className="flex items-center gap-3 text-[12px] leading-[18px] text-disabled">
            <span className="hidden sm:inline">Transacciones 100% seguras</span>
            <span className="relative flex size-12 items-center justify-center rounded-full border-2 border-dashed border-[#c7c7c7] text-[#9e9e9e]">
              <BrandMark className="size-5" />
              <span className="absolute -bottom-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-green-darker text-[10px] text-white">
                ✓
              </span>
            </span>
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onHome}
          className="h-12 w-full rounded-[4px] bg-brand px-6 text-[14px] font-medium leading-5 text-white shadow-button hover:bg-red-darker sm:w-auto"
        >
          Ir al inicio
        </button>
      </div>
    </div>
  );
}
