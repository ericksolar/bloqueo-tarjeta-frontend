import { BrandMark } from "./BrandMark";

/** Mockup genérico del celular con la app PassBanco. */
export default function AppPhone({ className = "" }) {
  return (
    <div className={`relative ${className}`} role="img" aria-label="App PassBanco">
      {/* Teléfono trasero */}
      <div className="absolute bottom-0 right-0 h-[78%] w-[52%] rounded-[12px] border-[3px] border-[#d9d9d9] bg-white p-1.5 shadow-md">
        <div className="mb-1.5 h-2 w-3/4 rounded-full bg-[#e6e6e6]" />
        <div className="mb-1 h-1.5 w-1/2 rounded-full bg-[#eeeeee]" />
        <div className="mb-3 h-1.5 w-2/3 rounded-full bg-[#eeeeee]" />
        <div className="h-[40%] rounded-[6px] bg-blue-soft" />
      </div>
      {/* Teléfono principal */}
      <div className="absolute left-0 top-0 flex h-full w-[60%] flex-col items-center justify-center gap-1 rounded-[14px] border-[3px] border-[#2b2b2b] bg-gradient-to-b from-[#1e3a8a] to-[#03386c] text-white shadow-lg">
        <BrandMark className="size-6" />
        <span className="text-[11px] font-bold tracking-[0.5px]">BANCO</span>
        <span className="text-[7px] opacity-80">PassBanco</span>
      </div>
    </div>
  );
}
