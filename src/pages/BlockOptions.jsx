import menuCardIcon from "../assets/figma/menu-card.svg";
import menuChevronRight from "../assets/figma/menu-chevron-right.svg";
import menuLockIcon from "../assets/figma/menu-lock.svg";
import Alert from "../components/ui/Alert";
import { BackButton } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import CreditCard from "../components/ui/CreditCard";

function OptionItem({ icon, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className="flex h-14 w-full items-center gap-3 overflow-hidden rounded-[5px] border border-border bg-white p-4 text-left enabled:hover:bg-black/[0.02] disabled:cursor-default disabled:opacity-50"
    >
      <img src={icon} alt="" className="size-6" />
      <span className="flex-1 text-[14px] leading-5 text-label">{label}</span>
      <img src={menuChevronRight} alt="" className="size-6" />
    </button>
  );
}

export default function BlockOptions({ card, onTemporaryBlock, onReplace, onShowReceipt, onBack }) {
  const blocked = card.permanentlyBlocked;
  return (
    <div className="flex max-w-[936px] flex-col gap-4">
      {blocked && (
        <Alert variant="info" role="note">
          Esta tarjeta fue <strong>bloqueada definitivamente</strong>. Tu nueva tarjeta estará
          disponible en la sucursal elegida 3 días hábiles desde la fecha de bloqueo.
        </Alert>
      )}
      <Card className="flex flex-col items-stretch gap-4 p-4 md:flex-row md:items-start md:gap-0">
        <div className="flex justify-center md:w-[320px] md:shrink-0 md:justify-start md:pr-6">
          <CreditCard card={card} />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <OptionItem
            icon={menuLockIcon}
            label={card.locked ? "Desbloqueo temporal" : "Bloqueo temporal"}
            onClick={blocked ? undefined : onTemporaryBlock}
          />
          <OptionItem
            icon={menuCardIcon}
            label="Bloqueo y reemplazo"
            onClick={blocked ? undefined : onReplace}
          />
          <OptionItem icon={menuCardIcon} label="Bloqueo permanente voluntario" />
          {blocked && (
            <OptionItem icon={menuCardIcon} label="Ver comprobante de bloqueo" onClick={onShowReceipt} />
          )}
        </div>
      </Card>
      <div>
        <BackButton onClick={onBack} />
      </div>
    </div>
  );
}
