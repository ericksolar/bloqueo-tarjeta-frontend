import { useEffect, useState } from "react";
import ReplaceReceipt from "../components/ReplaceReceipt";
import Alert from "../components/ui/Alert";
import { BackButton } from "../components/ui/Button";
import { LoadingOverlay } from "../components/ui/Loader";
import { getReplacementReceipt } from "../services/cards";

/** Vuelve a mostrar el comprobante de una tarjeta bloqueada definitivamente. */
export default function ReceiptPage({ card, onBack, onHome }) {
  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    getReplacementReceipt(card.id)
      .then((data) => active && setReceipt(data))
      .catch(() => active && setError(true));
    return () => {
      active = false;
    };
  }, [card.id]);

  if (error) {
    return (
      <div className="flex max-w-[936px] flex-col gap-4">
        <Alert variant="error">No pudimos obtener el comprobante. Inténtalo nuevamente.</Alert>
        <div>
          <BackButton onClick={onBack} />
        </div>
      </div>
    );
  }

  if (!receipt) return <LoadingOverlay />;

  return <ReplaceReceipt receipt={receipt} onHome={onHome} showSuccess={false} />;
}
