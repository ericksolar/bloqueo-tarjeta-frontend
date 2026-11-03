import { useEffect, useState } from "react";
import ReplaceReceipt from "../components/ReplaceReceipt";
import Alert from "../components/ui/Alert";
import { BackButton } from "../components/ui/Button";
import { LoadingOverlay } from "../components/ui/Loader";
import { getErrorMessage } from "../services/api";
import { getReplacementReceipt } from "../services/cards";

/** Vuelve a mostrar el comprobante de una tarjeta bloqueada definitivamente. */
export default function ReceiptPage({ card, onBack, onHome }) {
  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState(""); // "" = sin error

  useEffect(() => {
    let active = true;
    getReplacementReceipt(card.id)
      .then((data) => active && setReceipt(data))
      .catch(
        (err) =>
          active && setError(getErrorMessage(err, "No pudimos obtener el comprobante. Inténtalo nuevamente.")),
      );
    return () => {
      active = false;
    };
  }, [card.id]);

  if (error) {
    return (
      <div className="flex max-w-[936px] flex-col gap-4">
        <Alert variant="error">{error}</Alert>
        <div>
          <BackButton onClick={onBack} />
        </div>
      </div>
    );
  }

  if (!receipt) return <LoadingOverlay />;

  return <ReplaceReceipt receipt={receipt} onHome={onHome} showSuccess={false} />;
}
