import { useCallback, useEffect, useState } from "react";
import AppLayout from "./components/layout/AppLayout";
import Alert from "./components/ui/Alert";
import { LoadingOverlay } from "./components/ui/Loader";
import BlockOptions from "./pages/BlockOptions";
import CardList from "./pages/CardList";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ReceiptPage from "./pages/ReceiptPage";
import ReplaceBlock from "./pages/ReplaceBlock";
import TemporaryBlock from "./pages/TemporaryBlock";
import { onSessionExpired } from "./services/api";
import { getMe, logout } from "./services/auth";
import { getCards } from "./services/cards";

export default function App() {
  // undefined = revisando si hay una sesión abierta; null = sin sesión.
  const [user, setUser] = useState(undefined);
  const [screen, setScreen] = useState("dashboard");
  const [cards, setCards] = useState(null);
  const [cardsError, setCardsError] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const selectedCard = cards?.find((c) => c.id === selectedId);

  const resetSession = useCallback(() => {
    setUser(null);
    setCards(null);
    setSelectedId(null);
    setScreen("dashboard");
  }, []);

  const loadCards = useCallback(async () => {
    setCardsError(false);
    try {
      setCards(await getCards());
    } catch {
      setCardsError(true);
    }
  }, []);

  // Al recargar la página: si la sesión sigue vigente (o se puede renovar), se mantiene.
  useEffect(() => {
    onSessionExpired(resetSession);
    getMe()
      .then((me) => {
        setUser(me);
        loadCards();
      })
      .catch(() => setUser(null));
  }, [resetSession, loadCards]);

  function navigate(next) {
    setScreen(next);
    window.scrollTo(0, 0);
  }

  function updateCard(updated) {
    setCards((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  }

  if (user === undefined) return <LoadingOverlay />;

  if (user === null) {
    return (
      <Login
        onLogin={(me) => {
          setUser(me);
          navigate("dashboard");
          loadCards();
        }}
      />
    );
  }

  let content;
  if (cardsError) {
    content = (
      <div className="max-w-[936px]">
        <Alert variant="error" action={{ label: "Reintentar", onClick: loadCards }}>
          No pudimos cargar tus tarjetas. Inténtalo nuevamente.
        </Alert>
      </div>
    );
  } else if (!cards) {
    content = <LoadingOverlay />;
  } else if (screen === "list") {
    content = (
      <CardList
        cards={cards}
        onSelect={(id) => {
          setSelectedId(id);
          navigate("options");
        }}
      />
    );
  } else if (screen === "options" && selectedCard) {
    content = (
      <BlockOptions
        card={selectedCard}
        onTemporaryBlock={() => navigate("temporary")}
        onReplace={() => navigate("replace")}
        onShowReceipt={() => navigate("receipt")}
        onBack={() => navigate("list")}
      />
    );
  } else if (screen === "temporary" && selectedCard) {
    content = (
      <TemporaryBlock
        // Reinicia el estado (mensajes) al cambiar de tarjeta
        key={selectedCard.id}
        card={selectedCard}
        hasPassBanco={user.hasPassBanco}
        onCardChange={updateCard}
        onBack={() => navigate("options")}
      />
    );
  } else if (screen === "replace" && selectedCard) {
    content = (
      <ReplaceBlock
        key={selectedCard.id}
        card={selectedCard}
        onCardChange={updateCard}
        onBack={() => navigate("options")}
        onHome={() => navigate("dashboard")}
      />
    );
  } else if (screen === "receipt" && selectedCard) {
    content = (
      <ReceiptPage
        key={selectedCard.id}
        card={selectedCard}
        onBack={() => navigate("options")}
        onHome={() => navigate("dashboard")}
      />
    );
  } else {
    content = (
      <Dashboard
        cards={cards}
        onSelectCard={(id) => {
          setSelectedId(id);
          navigate("options");
        }}
      />
    );
  }

  const isDashboard = screen === "dashboard";
  const subHeaders = {
    list: "Bloqueo / desbloqueo tarjetas",
    options: "Bloqueo / desbloqueo tarjetas",
    replace: "Bloqueo y reemplazo",
    receipt: "Bloqueo y reemplazo",
    temporary: selectedCard?.locked ? "Desbloqueo temporal" : "Bloqueo temporal",
  };

  return (
    <AppLayout
      user={user}
      section={isDashboard ? "dashboard" : "cards"}
      subHeader={subHeaders[screen]}
      mainClassName={isDashboard ? "pt-4 pb-6 lg:pt-6" : "pt-6 pb-12 lg:pt-8 lg:pb-20"}
      onNavigate={navigate}
      onLogout={() => {
        // Aunque el backend no responda, se cierra la sesión en pantalla.
        logout().catch(() => {});
        resetSession();
      }}
    >
      {content}
    </AppLayout>
  );
}
