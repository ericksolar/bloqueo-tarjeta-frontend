import depositIcon from "../assets/figma/deposit.svg";
import walletIcon from "../assets/figma/wallet-32.svg";
import AppPhone from "../components/brand/AppPhone";
import CreditIllustration from "../components/dashboard/CreditIllustration";
import CardThumbnail from "../components/ui/CardThumbnail";
import { formatCLP } from "../utils/currency";
import {
  AppStoreBadge,
  GooglePlayStoreBadge,
} from "../components/brand/StoreBadges";

const dashCard = "overflow-hidden rounded-[5px] bg-white shadow-dashboard";

const statusLabel = {
  ACTIVE: "Activa",
  TEMP_BLOCKED: "Bloqueada temporalmente",
  PERMANENTLY_BLOCKED: "Bloqueada definitivamente",
};

/** Tarjeta de crédito o débito con su cupo / saldo disponible. */
function CardProduct({ card, onSelect }) {
  const isCredit = card.kind === "credit";
  return (
    <button
      type="button"
      onClick={() => onSelect(card.id)}
      className={`flex flex-1 flex-col gap-4 px-5 pb-8 pt-[18px] text-left transition-shadow hover:shadow-card sm:px-8 sm:pb-11 ${dashCard}`}
    >
      <div className="flex items-center gap-4">
        <CardThumbnail card={card} />
        <div className="flex flex-1 flex-col">
          <p className="text-[16px] font-medium leading-[22px] text-label">
            {card.title}
          </p>
          <p className="text-[14px] leading-5 text-black">
            **** {card.last4} - {card.holder}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 text-black sm:flex-row">
        <div className="flex flex-1 flex-col gap-2">
          <p className="text-[14px] leading-5">
            {isCredit ? "Cupo disponible:" : "Saldo disponible:"}
          </p>
          <p className="text-[24px] font-bold leading-[30px]">
            {formatCLP(card.balance)}
          </p>
        </div>
        <div className="flex flex-1 flex-col gap-2 text-[14px] leading-5">
          <p>{card.network}</p>
          <p
            className={
              card.status === "ACTIVE" ? "" : "font-medium text-red-darker"
            }
          >
            Estado: {statusLabel[card.status]}
          </p>
        </div>
      </div>
    </button>
  );
}

function PassBancoCard() {
  return (
    <article
      className={`flex flex-1 items-center gap-4 px-5 pb-6 pt-[18px] sm:px-8 ${dashCard}`}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-2 sm:w-[250px] sm:flex-none">
        <p className="w-[205px] text-[18px] font-bold leading-6 tracking-[0.2px] text-black">
          ¿Ya tienes tu PassBanco?
        </p>
        <p className="text-[14px] leading-5 text-black">
          Realiza transacciones de forma fácil, rápida y segura. Disponible en:
        </p>
        <div className="flex flex-wrap items-start gap-3 pt-2 sm:gap-4">
          <a href="#">
            <AppStoreBadge />
          </a>
          <a href="#">
            <GooglePlayStoreBadge />
          </a>
        </div>
      </div>
      <div className="hidden w-36 justify-end min-[420px]:flex">
        <AppPhone className="h-[140px] w-[111.656px]" />
      </div>
    </article>
  );
}

function QuickAccess({ icon, label }) {
  return (
    <button
      type="button"
      className={`flex flex-1 flex-col items-center justify-center gap-2 px-4 py-5 ${dashCard}`}
    >
      <img src={icon} alt="" className="size-8" />
      <span className="text-center text-[14px] font-medium leading-5 text-black">
        {label}
      </span>
    </button>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 className="text-[20px] font-medium leading-[26px] text-label">
      {children}
    </h2>
  );
}

export default function Dashboard({ cards, onSelectCard }) {
  return (
    <div className="flex max-w-[979px] flex-col gap-5 lg:gap-6">
      <section className="flex flex-col gap-[18px]">
        <SectionTitle>Mis tarjetas</SectionTitle>
        <div className="grid grid-cols-1 gap-4 pb-2 md:grid-cols-2 md:gap-6">
          {cards.map((card) => (
            <CardProduct key={card.id} card={card} onSelect={onSelectCard} />
          ))}
          <div className="flex md:col-span-2">
            <PassBancoCard />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[18px] py-2">
        <SectionTitle>Accesos rápidos</SectionTitle>
        <div className="flex flex-col gap-4 md:flex-row md:gap-6">
          <div className="flex flex-1 gap-4 md:gap-6">
            <QuickAccess icon={walletIcon} label="Transferir Ahora" />
            <QuickAccess icon={depositIcon} label="Depósito a Plazo" />
          </div>
          <article className={`flex flex-1 items-end ${dashCard}`}>
            <div className="flex flex-1 flex-col gap-2 self-stretch py-4 pl-5 pr-4 text-black sm:pl-8">
              <p className="text-[18px] font-bold leading-6 tracking-[0.2px]">
                Simula tu Crédito
              </p>
              <p className="text-[14px] leading-5">
                Analiza la opción que más te acomode.{" "}
                <a href="#" className="font-medium text-red-darker">
                  Simular ahora
                </a>
              </p>
            </div>
            <div className="hidden min-[420px]:block">
              <CreditIllustration />
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
