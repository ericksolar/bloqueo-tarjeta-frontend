import appStoreSvg from "../../assets/figma/appstore.svg";
import GooglePlayBadge from "../dashboard/GooglePlayBadge";

/** Badge App Store (90x30 en el diseño). `scale` lo agranda proporcionalmente. */
export function AppStoreBadge({ scale = 1 }) {
  return (
    <span
      className="relative block overflow-hidden"
      style={{ width: 90 * scale, height: 30 * scale }}
      role="img"
      aria-label="Disponible en App Store"
    >
      <span className="absolute" style={{ inset: "0.9% 0.96% 1.08% 0.16%" }}>
        <img src={appStoreSvg} alt="" className="absolute inset-0 block size-full max-w-none" />
      </span>
    </span>
  );
}

/** Badge Google Play (98.7x30). Se escala con transform porque usa máscaras en px. */
export function GooglePlayStoreBadge({ scale = 1 }) {
  return (
    <span className="block" style={{ width: 98.727 * scale, height: 30 * scale }}>
      <span className="block origin-top-left" style={{ transform: `scale(${scale})` }}>
        <GooglePlayBadge />
      </span>
    </span>
  );
}
