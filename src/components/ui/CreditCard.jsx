import cardLargeBg from "../../assets/figma/card-large-bg.png";
import mastercardLogo from "../../assets/figma/mastercard.svg";
import { BrandMark } from "../brand/BrandMark";

/** CardATM / Large (296x190). */
export default function CreditCard({ card }) {
  return (
    <div
      className="relative flex h-[190px] w-full max-w-[296px] shrink-0 flex-col justify-between overflow-hidden rounded-[10px] p-4 text-white"
      style={{ backgroundColor: card.color }}
    >
      <img
        src={cardLargeBg}
        alt=""
        className="pointer-events-none absolute inset-0 size-full rounded-[10px] object-cover"
      />

      <div className="relative -mb-1 flex flex-col gap-4">
        <div className="flex items-center gap-1">
          <BrandMark className="size-6" />
          <p className="flex-1 text-[14px] leading-5">{card.network}</p>
          <span className="flex h-[18px] w-16 items-center rounded-[4px] bg-black/50 px-2 text-[12px] leading-[18px] uppercase">
            {card.holder}
          </span>
        </div>

        <p className="flex gap-4 text-[18px] font-bold leading-6">
          <span>****</span>
          <span>****</span>
          <span>****</span>
          <span className="tracking-[0.2px]">{card.last4}</span>
        </p>

        <div className="flex gap-4 tracking-[0.2px]">
          <div className="flex flex-col">
            <span className="text-[12px] leading-[18px]">Válida hasta</span>
            <span className="text-[14px] font-bold leading-5">** / **</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] leading-[18px]">Código CVC</span>
            <span className="text-[14px] font-bold leading-5">***</span>
          </div>
        </div>
      </div>

      <div className="relative flex h-11 items-end justify-between">
        <p className="w-48 text-[14px] font-bold leading-5 tracking-[0.2px]">
          {card.cardholderName}
        </p>
        <img src={mastercardLogo} alt="Mastercard" className="h-[29px] w-[53px]" />
      </div>

      {card.permanentlyBlocked && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-[10px] bg-black/80"
          role="img"
          aria-label="Tarjeta bloqueada definitivamente"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="5" y="10.5" width="14" height="10" rx="2" />
            <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
            <path d="M12 14.5v2.5" />
          </svg>
          <span className="text-[16px] font-medium leading-[22px]">Bloqueada</span>
        </div>
      )}
    </div>
  );
}
