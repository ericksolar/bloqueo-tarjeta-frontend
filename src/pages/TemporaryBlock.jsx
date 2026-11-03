import { useState } from "react";
import tooltipIcon from "../assets/figma/tooltip.svg";
import AuthorizeAppCard from "../components/AuthorizeAppCard";
import { blockLimits } from "../data/blockLimits";
import Alert from "../components/ui/Alert";
import { BackButton, PrimaryButton } from "../components/ui/Button";
import { Card, CardHeader } from "../components/ui/Card";
import CardThumbnail from "../components/ui/CardThumbnail";
import { LoadingOverlay } from "../components/ui/Loader";
import Switch from "../components/ui/Switch";
import { getErrorMessage } from "../services/api";
import { setCardLock, updateCardLimits } from "../services/cards";

const kindLabel = { credit: "crédito", debit: "débito" };

function StatusCard({ card, onToggleLock, disabled, hasPassBanco }) {
  return (
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
        {card.locked ? (
          <>
            <div className="flex flex-col gap-3">
              <p className="text-[16px] font-bold leading-[22px]">Tu tarjeta se encuentra bloqueada</p>
              <p className="text-[14px] leading-5">
                <strong>Al desbloquear</strong>, se activarán{" "}
                <strong>todos los usos de la tarjeta</strong>, tanto nacional como internacional.
              </p>
            </div>
            <Alert variant="info" role="note" action={{ label: "Administrar Suscripciones" }}>
              Suscripciones digitales (ej. Netflix) se seguirán cobrando.
            </Alert>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-3">
              <p className="text-[16px] font-bold leading-[22px]">Tu tarjeta se encuentra activa</p>
              <p className="text-[14px] leading-5">
                <strong>Al bloquear temporalmente,</strong> desactivas de inmediato todos los usos
                de la tarjeta, tanto nacional como internacional.
              </p>
              {hasPassBanco && (
                <p className="mt-2 text-[14px] leading-5">
                  <strong>Podrás desbloquear tu tarjeta</strong> en cualquier momento.
                </p>
              )}
            </div>
            {!hasPassBanco && (
              <Alert variant="warning" role="note" action={{ label: "Descargar PassBanco" }}>
                Si bloqueas tu tarjeta, <strong>necesitarás PassBanco para desbloquearla.</strong>
              </Alert>
            )}
          </>
        )}
      </div>

      <div className="border-t border-border px-4 py-4 sm:px-8">
        <PrimaryButton
          className="w-full sm:w-auto"
          onClick={onToggleLock}
          disabled={disabled || (card.locked && !hasPassBanco)}
        >
          {card.locked ? "Desbloquear tarjeta" : "Bloquear temporalmente"}
        </PrimaryButton>
      </div>
    </Card>
  );
}

/**
 * "Administra tus bloqueos": cada switch se guarda en el backend al cambiarlo.
 * Si se desactivan los tres usos, el backend bloquea la tarjeta temporalmente.
 */
function LimitsCard({ card, hasPassBanco, onCardChange, onAutoBlock }) {
  const [saving, setSaving] = useState(null); // id del switch que se está guardando
  const [error, setError] = useState(""); // "" = sin error

  async function handleChange(id, value) {
    setSaving(id);
    setError("");
    try {
      const updated = await updateCardLimits(card.id, { [id]: value });
      onCardChange(updated);
      if (updated.locked) onAutoBlock();
    } catch (err) {
      setError(getErrorMessage(err, "No pudimos guardar el cambio. Inténtalo nuevamente."));
    } finally {
      setSaving(null);
    }
  }

  const enabledCount = blockLimits.filter((limit) => card.limits[limit.id]).length;

  return (
    <Card>
      <CardHeader title="Administra tus bloqueos" size="md">
        <img
          src={tooltipIcon}
          alt="Más información"
          title="Activa o desactiva cada tipo de uso de tu tarjeta"
          className="size-4"
        />
      </CardHeader>
      {error && (
        <div className="px-4 pt-4 sm:px-8">
          <Alert variant="error">{error}</Alert>
        </div>
      )}
      {enabledCount === 1 && (
        <div className="px-4 pt-4 sm:px-8">
          <Alert variant="warning" role="note">
            Si desactivas el último uso, <strong>tu tarjeta se bloqueará temporalmente</strong>
            {hasPassBanco ? "." : <> y <strong>necesitarás PassBanco para desbloquearla.</strong></>}
          </Alert>
        </div>
      )}
      <ul>
        {blockLimits.map((limit) => (
          <li key={limit.id} className="flex flex-col gap-1 border-b border-separator px-4 py-4 last:border-b-0 sm:px-8">
            <div className="flex items-center gap-3">
              <p className="flex-1 text-[16px] font-bold leading-[22px] text-label">{limit.title}</p>
              <Switch
                label={limit.title}
                checked={card.limits[limit.id]}
                disabled={saving !== null}
                onChange={(value) => handleChange(limit.id, value)}
              />
            </div>
            <p className="text-[14px] leading-5 text-label-secondary">{limit.description}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/**
 * Bloqueo temporal: estados idle → loading → success | error.
 */
export default function TemporaryBlock({ card, hasPassBanco, onCardChange, onBack }) {
  const [status, setStatus] = useState("idle");
  const [lastAction, setLastAction] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleToggleLock() {
    const nextLocked = !card.locked;
    setLastAction(nextLocked ? "lock" : "unlock");
    setStatus("loading");
    try {
      onCardChange(await setCardLock(card.id, nextLocked));
      setStatus("success");
    } catch (err) {
      // 403 sin PassBanco, 409 estado inválido, etc.: el backend explica el motivo.
      setErrorMessage(
        getErrorMessage(
          err,
          nextLocked
            ? "El bloqueo temporal no se completó. Inténtalo nuevamente."
            : "El desbloqueo no se completó. Inténtalo nuevamente.",
        ),
      );
      setStatus("error");
    }
  }

  const cardName = `tarjeta de ${kindLabel[card.kind]} terminada en ${card.last4}`;
  const successMessage =
    lastAction === "auto"
      ? `Desactivaste todos los usos de tu ${cardName}, por lo que quedó bloqueada temporalmente.`
      : lastAction === "lock"
      ? `Tu ${cardName} fue bloqueada. Enviaremos el comprobante a tu e-mail registrado.`
      : `Tu ${cardName} fue desbloqueada. Enviaremos el comprobante a tu e-mail registrado.`;

  return (
    <div className="flex max-w-[936px] flex-col gap-8">
      <div className="flex flex-col gap-4">
        {status === "success" && <Alert variant="success">{successMessage}</Alert>}
        {status === "error" && <Alert variant="error">{errorMessage}</Alert>}
        <StatusCard
          card={card}
          hasPassBanco={hasPassBanco}
          onToggleLock={handleToggleLock}
          disabled={status === "loading"}
        />
        {card.locked && hasPassBanco && (
          <div>
            <BackButton onClick={onBack} />
          </div>
        )}
      </div>

      {card.locked && !hasPassBanco && (
        <div className="flex flex-col gap-8">
          <AuthorizeAppCard card={card} />
          <div>
            <BackButton onClick={onBack} />
          </div>
        </div>
      )}

      {!card.locked && (
        <div className="flex flex-col gap-4">
          <LimitsCard
            card={card}
            hasPassBanco={hasPassBanco}
            onCardChange={onCardChange}
            onAutoBlock={() => {
              setLastAction("auto");
              setStatus("success");
            }}
          />
          <div>
            <BackButton onClick={onBack} />
          </div>
        </div>
      )}

      {status === "loading" && <LoadingOverlay />}
    </div>
  );
}
