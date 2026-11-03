import group from "../../assets/figma/illustration/group.svg";
import group1 from "../../assets/figma/illustration/group1.svg";
import group2Mask from "../../assets/figma/illustration/group2-mask.svg";
import group3 from "../../assets/figma/illustration/group3.svg";

/** Ilustración de "Simula tu Crédito" (230x100) con sus capas de Figma. */
export default function CreditIllustration() {
  return (
    <div className="relative h-[100px] w-[230px] shrink-0 overflow-hidden">
      <img src={group} alt="" className="absolute inset-0 block size-full max-w-none" />
      <img src={group1} alt="" className="absolute inset-0 block size-full max-w-none" />
      <div
        className="absolute"
        style={{
          inset: "8.33% 29.86% -42.71% 15.84%",
          maskImage: `url("${group2Mask}")`,
          maskMode: "luminance",
          maskRepeat: "no-repeat",
          maskClip: "no-clip",
          maskComposite: "intersect",
          maskPosition: "-36.425px -8.333px",
          maskSize: "230px 100px",
        }}
      >
        <img src={group3} alt="" className="absolute inset-0 block size-full max-w-none" />
      </div>
    </div>
  );
}
