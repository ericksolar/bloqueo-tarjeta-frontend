import chevronRight from "../assets/figma/list-chevron-right.svg";
import { Card, CardHeader } from "../components/ui/Card";
import CardThumbnail from "../components/ui/CardThumbnail";

export default function CardList({ cards, onSelect }) {
  return (
    <Card className="max-w-[936px]">
      <CardHeader title="Selecciona una tarjeta" />
      <ul>
        {cards.map((card) => (
          <li key={card.id}>
            <button
              type="button"
              onClick={() => onSelect(card.id)}
              className="flex w-full items-start gap-3 border-b border-separator bg-white py-4 pl-4 pr-2 sm:pl-8 sm:pr-6 text-left hover:bg-black/[0.02]"
            >
              <CardThumbnail card={card} />
              <span className="flex flex-1 flex-col gap-1 self-stretch">
                <span className="text-[16px] font-bold leading-[22px] text-label">{card.title}</span>
                <span className="text-[14px] leading-5 text-disabled">
                  **** {card.last4} - {card.holder}
                </span>
              </span>
              <span className="flex w-10 items-center justify-center self-stretch">
                <img src={chevronRight} alt="" className="size-6" />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
}
