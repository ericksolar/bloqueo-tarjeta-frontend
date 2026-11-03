// Badge "Disponible en Google Play" reconstruido con las capas originales de Figma.
const svgs = import.meta.glob("../../assets/figma/googleplay/*.svg", {
  eager: true,
  import: "default",
});
const a = (name) => svgs[`../../assets/figma/googleplay/${name}.svg`];

const BASE_MASK = "97.637px 29.455px";

// inset: posición de la capa; flip: todas las capas vienen invertidas en Figma.
// mask: capas de máscara (la primera siempre es g160, el contorno del badge).
const layers = [
  { inset: "0.61% 0.37% 2.42% 0.18%", src: "g14" },
  { inset: "18.7% 82.95% 20.52% 7.53%", src: "g54" },
  { inset: "38.72% 75.46% 40.54% 17.05%", src: "g82" },
  { inset: "49.09% 79.84% 19.73% 7.87%", src: "g106" },
  { inset: "17.92% 79.84% 50.91% 7.87%", src: "g126" },
  {
    inset: "59.11% 79.84% 19.73% 7.87%",
    src: "g162",
    opacity: 0.2,
    masks: ["g160", "g161"],
    maskPosition: "-7.409px -17.187px, -0.001px 0px",
    maskSize: `${BASE_MASK}, 12.136px 6.349px`,
  },
  {
    inset: "75.55% 92.07% 20.69% 7.53%",
    src: "g177",
    opacity: 0.12,
    masks: ["g160", "g176"],
    maskPosition: "-7.071px -22.119px, 0px 0px",
    maskSize: `${BASE_MASK}, 0.391px 1.128px`,
  },
  {
    inset: "49.09% 75.46% 40.67% 20.09%",
    src: "g193",
    opacity: 0.12,
    masks: ["g160", "g192"],
    maskPosition: "-19.476px -14.183px, 0px 0px",
    maskSize: `${BASE_MASK}, 4.389px 3.072px`,
  },
  {
    inset: "17.92% 75.46% 50.91% 7.53%",
    src: "group6",
    opacity: 0.25,
    masks: ["g160", "group5"],
    maskPosition: "-7.071px -4.83px, 0px 0px",
    maskSize: `${BASE_MASK}, 16.793px 9.354px`,
  },
  // Texto "GET IT ON / Google Play": relleno + trazo por letra
  { inset: "17.58% 65.81% 67.88% 30.59%", src: "g214", pos: "-29.841px -4.728px" },
  { inset: "17.58% 65.81% 67.88% 30.59%", src: "g218", pos: "-29.841px -4.728px", img: "-5.73% -7.05%" },
  { inset: "17.58% 64.45% 67.88% 34.98%", src: "path222", pos: "-34.174px -4.728px", img: "-5.73% -44.58%" },
  { inset: "17.25% 60.72% 67.55% 36.27%", src: "g224", pos: "-35.441px -4.629px" },
  { inset: "17.25% 60.72% 67.55% 36.27%", src: "g228", pos: "-35.441px -4.629px", img: "-5.48% -8.39% -5.48% -9.9%" },
  { inset: "17.58% 57.01% 67.88% 40.1%", src: "g232", pos: "-39.226px -4.728px" },
  { inset: "17.58% 57.01% 67.88% 40.1%", src: "g236", pos: "-39.226px -4.728px", img: "-5.73% -8.76%" },
  { inset: "17.25% 52.03% 67.55% 43.43%", src: "g240", pos: "-42.511px -4.63px" },
  { inset: "17.25% 52.03% 67.55% 43.43%", src: "g244", pos: "-42.511px -4.63px", img: "-5.48% -5.57%" },
  { inset: "17.58% 47.83% 67.88% 48.77%", src: "g248", pos: "-47.783px -4.728px" },
  { inset: "17.58% 47.83% 67.88% 48.77%", src: "g252", pos: "-47.783px -4.728px", img: "-5.73% -7.43%" },
  { inset: "17.58% 46.25% 67.88% 53.19%", src: "path256", pos: "-52.146px -4.728px", img: "-5.73% -44.58%" },
  { inset: "17.58% 42.21% 67.88% 54.77%", src: "g258", pos: "-53.706px -4.728px" },
  { inset: "17.58% 42.21% 67.88% 54.77%", src: "g262", pos: "-53.706px -4.728px", img: "-5.73% -8.37%" },
  { inset: "17.58% 38.96% 67.88% 58.56%", src: "g266", pos: "-57.448px -4.728px" },
  { inset: "17.58% 38.96% 67.88% 58.56%", src: "g270", pos: "-57.448px -4.728px", img: "-5.73% -10.21%" },
  { inset: "17.58% 35.66% 67.88% 61.75%", src: "g274", pos: "-60.605px -4.728px" },
  { inset: "17.58% 35.66% 67.88% 61.75%", src: "g278", pos: "-60.605px -4.728px", img: "-5.73% -9.81%" },
  { inset: "17.58% 30.71% 67.88% 66.71%", src: "g274", pos: "-65.493px -4.728px" },
  { inset: "17.58% 30.71% 67.88% 66.71%", src: "g278", pos: "-65.493px -4.728px", img: "-5.73% -9.81%" },
  { inset: "17.58% 26.42% 67.88% 70.17%", src: "g290", pos: "-68.918px -4.728px" },
  { inset: "17.58% 26.42% 67.88% 70.17%", src: "g294", pos: "-68.918px -4.728px", img: "-5.73% -7.43%" },
];

function maskStyle(layer) {
  if (layer.masks) {
    return {
      maskImage: layer.masks.map((m) => `url("${a(m)}")`).join(", "),
      maskPosition: layer.maskPosition,
      maskSize: layer.maskSize,
      opacity: layer.opacity,
    };
  }
  if (layer.pos) {
    return {
      maskImage: `url("${a("g160")}")`,
      maskPosition: layer.pos,
      maskSize: BASE_MASK,
      maskMode: "luminance",
      maskRepeat: "no-repeat",
      maskClip: "no-clip",
      maskComposite: "intersect",
    };
  }
  return undefined;
}

export default function GooglePlayBadge() {
  return (
    <div
      className="relative h-[30px] w-[98.727px] shrink-0 overflow-hidden"
      role="img"
      aria-label="Disponible en Google Play"
    >
      {layers.map((layer, i) => (
        <div key={i} className="absolute -scale-y-100" style={{ inset: layer.inset }}>
          <div className="relative size-full" style={maskStyle(layer)}>
            {layer.img ? (
              <div className="absolute" style={{ inset: layer.img }}>
                <img src={a(layer.src)} alt="" className="block size-full max-w-none" />
              </div>
            ) : (
              <img src={a(layer.src)} alt="" className="absolute inset-0 block size-full max-w-none" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
