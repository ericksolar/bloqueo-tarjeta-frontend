import blockedLock from "../../assets/figma/card-blocked-lock.svg";

/** CardATM / X-Small (76x48) con el overlay de candado cuando está bloqueada. */
export default function CardThumbnail({ card }) {
  return (
    <div className="relative h-12 w-[76px] shrink-0 overflow-hidden rounded-[5px]">
      <img src={card.thumbnail} alt="" className="absolute inset-0 block h-[99.83%] w-full" />
      {card.locked && (
        <div className="absolute left-[22px] top-2 flex items-center justify-center overflow-hidden rounded-full border-2 border-white bg-black/38 p-2">
          <img src={blockedLock} alt="Bloqueada" className="size-4" />
        </div>
      )}
    </div>
  );
}
