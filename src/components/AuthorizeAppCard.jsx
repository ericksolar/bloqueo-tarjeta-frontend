import AppPhone from "./brand/AppPhone";
import QrPlaceholder from "./brand/QrPlaceholder";
import { AppStoreBadge, GooglePlayStoreBadge } from "./brand/StoreBadges";
import { Card, CardHeader } from "./ui/Card";

const kindLabel = { credit: "crédito", debit: "débito" };

/** Card / Web / Authorize: invita a descargar PassBanco para poder desbloquear. */
export default function AuthorizeAppCard({ card }) {
  return (
    <Card>
      <CardHeader title={`Desbloquea tu tarjeta de ${kindLabel[card.kind]} con PassBanco`} />
      <div className="flex flex-col items-center gap-6 px-4 py-6 sm:px-8 lg:flex-row">
        <AppPhone className="h-[160px] w-[165px] shrink-0" />

        <div className="flex max-w-[370px] flex-1 flex-col gap-2 text-center text-[14px] leading-5 text-label lg:text-left">
          <p className="font-bold">¡Usa PassBanco!</p>
          <p>
            Te invitamos a descargar PassBanco, la App que te permite autorizar transacciones de
            forma fácil, rápida y segura. Encuéntrala en App Store y Google Play.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 lg:ml-auto">
          <a href="https://apps.apple.com/" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2">
            <AppStoreBadge scale={1.37} />
            <QrPlaceholder seed={7} label="Código QR para descargar en App Store" />
          </a>
          <a href="https://play.google.com/store" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2">
            <GooglePlayStoreBadge scale={1.25} />
            <QrPlaceholder seed={42} label="Código QR para descargar en Google Play" />
          </a>
        </div>
      </div>
    </Card>
  );
}
