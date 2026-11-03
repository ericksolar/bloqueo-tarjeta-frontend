import { useEffect, useId, useState } from "react";
import ReplaceReceipt from "../components/ReplaceReceipt";
import Alert from "../components/ui/Alert";
import { BackButton } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import CardThumbnail from "../components/ui/CardThumbnail";
import { Radio, Select } from "../components/ui/FormControls";
import { LoadingOverlay } from "../components/ui/Loader";
import Modal from "../components/ui/Modal";
import { blockReasons } from "../data/blockReasons";
import { getErrorMessage } from "../services/api";
import { blockAndReplaceCard, getRegions } from "../services/cards";

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6 shrink-0 text-label-secondary" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="3.2" />
      <path d="M12 11.2V19" />
      <path d="M7.5 17c-2 .4-3.5 1.1-3.5 1.9C4 20.1 7.6 21 12 21s8-.9 8-2.1c0-.8-1.5-1.5-3.5-1.9" />
    </svg>
  );
}

/** Ilustración del modal: aviso de bloqueo definitivo. */
function WarningIllustration() {
  return (
    <div className="relative flex size-[104px] items-center justify-center rounded-full bg-[#f6ead2]">
      <svg viewBox="0 0 64 64" className="size-16" aria-hidden="true">
        <rect x="10" y="20" width="44" height="28" rx="4" fill="#5f5f5f" />
        <rect x="10" y="27" width="44" height="5" fill="#3d3d3d" />
        <rect x="15" y="38" width="14" height="4" rx="1" fill="#bdbdbd" />
      </svg>
      <span className="absolute -right-1 top-1 flex size-9 items-center justify-center">
        <svg viewBox="0 0 24 24" className="size-9" aria-hidden="true">
          <path d="M10.3 3.3a2 2 0 0 1 3.4 0l8.2 14.2A2 2 0 0 1 20.2 20.5H3.8a2 2 0 0 1-1.7-3L10.3 3.3Z" fill="#f2b705" />
          <rect x="11" y="8.5" width="2" height="6" rx="1" fill="#383838" />
          <circle cx="12" cy="17" r="1.2" fill="#383838" />
        </svg>
      </span>
    </div>
  );
}

/**
 * Bloqueo y reemplazo (bloqueo definitivo):
 * motivo → sucursal → confirmación → loading → comprobante | error.
 */
export default function ReplaceBlock({ card, onCardChange, onBack, onHome }) {
  const regionId = useId();
  const branchId = useId();
  const [reason, setReason] = useState("");
  const [region, setRegion] = useState("");
  const [branch, setBranch] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [regions, setRegions] = useState([]);
  const [regionsError, setRegionsError] = useState("");

  useEffect(() => {
    let active = true;
    getRegions()
      .then((data) => active && setRegions(data))
      .catch(
        (err) =>
          active &&
          setRegionsError(
            getErrorMessage(err, "No pudimos cargar las sucursales. Recarga la página e inténtalo nuevamente."),
          ),
      );
    return () => {
      active = false;
    };
  }, []);

  const selectedRegion = regions.find((r) => r.id === region);
  const selectedBranch = selectedRegion?.branches.find((b) => b.id === branch);
  const canContinue = Boolean(reason && selectedBranch);

  async function handleConfirm() {
    setConfirmOpen(false);
    setStatus("loading");
    try {
      const result = await blockAndReplaceCard(card.id, { reasonId: reason, branchId: branch });
      setReceipt(result);
      onCardChange(result.card);
      setStatus("success");
    } catch (err) {
      // 409 tarjeta ya bloqueada, 422 sucursal inexistente, etc.: el backend explica el motivo.
      setErrorMessage(
        getErrorMessage(err, "El bloqueo y reemplazo de tu tarjeta no se completó. Inténtalo nuevamente."),
      );
      setStatus("error");
    }
    window.scrollTo(0, 0);
  }

  if (status === "success" && receipt) {
    return (
      <ReplaceReceipt receipt={receipt} onHome={onHome} />
    );
  }

  return (
    <div className="flex max-w-[936px] flex-col gap-4">
      {regionsError && <Alert variant="error">{regionsError}</Alert>}
      {status === "error" && <Alert variant="error">{errorMessage}</Alert>}

      <Card>
        <div className="flex items-start gap-3 border-b border-separator p-4">
          <CardThumbnail card={card} />
          <div className="flex flex-1 flex-col gap-1 self-stretch">
            <p className="text-[16px] font-bold leading-[22px] text-label">{card.title}</p>
            <p className="text-[14px] leading-5 text-label-secondary">
              **** {card.last4} - {card.holder}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6 px-4 py-5 text-label sm:px-8 sm:py-6">
          <div className="flex flex-col gap-4 text-[14px] leading-5">
            <p>
              Esta opción te permite <strong>bloquear definitivamente tu tarjeta.</strong>
            </p>
            <p>
              La nueva tarjeta <strong>estará disponible 3 días hábiles desde la fecha de bloqueo.</strong>
            </p>
          </div>

          <Alert variant="info" role="note">
            <strong>Importante:</strong> Solo el titular podrá retirar la nueva tarjeta presentando
            su cédula de identidad.
          </Alert>

          <fieldset className="flex flex-col gap-1">
            <legend className="mb-2 text-[16px] font-bold leading-[22px]">
              Selecciona un motivo del bloqueo:
            </legend>
            {blockReasons.map((r) => (
              <Radio
                key={r.id}
                name="reason"
                value={r.id}
                label={r.label}
                checked={reason === r.id}
                onChange={setReason}
              />
            ))}
          </fieldset>

          {reason && (
            <section className="flex flex-col gap-4">
              <h3 className="text-[16px] font-bold leading-[22px]">
                Selecciona la sucursal de tu preferencia para retirar la nueva tarjeta:
              </h3>
              <div className="flex flex-col gap-4 md:flex-row md:items-end">
                <div className="md:w-[192px] md:shrink-0">
                  <Select
                    id={regionId}
                    label="Región"
                    value={region}
                    placeholder="Selecciona región"
                    options={regions.map((r) => ({ value: r.id, label: r.name }))}
                    onChange={(value) => {
                      setRegion(value);
                      setBranch("");
                    }}
                  />
                </div>
                <div className="md:w-[192px] md:shrink-0">
                  <Select
                    id={branchId}
                    label="Sucursal"
                    value={branch}
                    disabled={!selectedRegion}
                    placeholder="Selecciona sucursal"
                    options={(selectedRegion?.branches ?? []).map((b) => ({ value: b.id, label: b.name }))}
                    onChange={setBranch}
                  />
                </div>
                {selectedBranch && (
                  <div className="flex items-center gap-2 md:pb-3" aria-live="polite">
                    <PinIcon />
                    <div className="flex flex-col text-[14px] leading-5">
                      <span>{selectedBranch.name}</span>
                      <span className="font-bold">{selectedBranch.address}</span>
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </Card>

      <div className="flex flex-col-reverse items-stretch justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <BackButton onClick={onBack} />
        </div>
        <button
          type="button"
          disabled={!canContinue || status === "loading"}
          onClick={() => setConfirmOpen(true)}
          className="h-12 rounded-[4px] bg-brand px-6 text-[14px] font-medium leading-5 text-white shadow-button transition-colors enabled:hover:bg-red-darker disabled:cursor-not-allowed disabled:bg-disabled-fill disabled:shadow-none sm:min-w-[88px]"
        >
          Continuar
        </button>
      </div>

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        illustration={<WarningIllustration />}
        title="¿Deseas bloquear tu tarjeta definitivamente?"
        actions={
          <>
            <button
              type="button"
              onClick={() => setConfirmOpen(false)}
              className="h-12 rounded-[4px] px-4 text-[14px] font-medium leading-5 text-brand hover:bg-brand/5"
            >
              No por ahora
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="h-12 rounded-[4px] bg-brand px-6 text-[14px] font-medium leading-5 text-white shadow-button hover:bg-red-darker"
            >
              Bloquear definitivamente
            </button>
          </>
        }
      >
        Al bloquear, esta quedará desactivada de forma permanente y no podrá ser utilizada
        nuevamente.
      </Modal>

      {status === "loading" && <LoadingOverlay />}
    </div>
  );
}
