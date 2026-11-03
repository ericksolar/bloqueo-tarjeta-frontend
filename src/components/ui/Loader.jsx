import { useEffect, useState } from "react";
import loader1 from "../../assets/figma/loader-1.svg";
import loader2 from "../../assets/figma/loader-2.svg";
import loader3 from "../../assets/figma/loader-3.svg";

const frames = [loader1, loader2, loader3];

/** Loader del sistema de diseño: anima los 3 estados del componente. */
export function Loader() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setFrame((f) => (f + 1) % frames.length), 300);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex h-[107px] w-[360px] max-w-full items-center justify-center p-8">
      <img src={frames[frame]} alt="Cargando" className="h-[47px] w-[119.283px]" />
    </div>
  );
}

/** Overlay de carga a pantalla completa (fondo blanco al 70%). */
export function LoadingOverlay() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/70"
      aria-busy="true"
      aria-live="polite"
    >
      <Loader />
    </div>
  );
}
