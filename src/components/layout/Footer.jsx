import { BrandLogo } from "../brand/BrandMark";

const links = ["Seguridad", "Políticas de privacidad", "Términos de uso"];

export default function Footer() {
  return (
    <footer className="flex w-full shrink-0 flex-col items-start gap-2 border-t border-separator bg-white px-4 py-4 sm:px-8 md:h-20 md:flex-row md:items-center md:py-0 lg:pl-[34px]">
      <BrandLogo className="text-[#646569]" />
      <nav className="-ml-4 flex flex-wrap md:ml-6">
        {links.map((label) => (
          <a
            key={label}
            href="#"
            className="flex min-h-12 items-center px-4 text-[12px] leading-[18px] text-label-secondary underline"
          >
            {label}
          </a>
        ))}
      </nav>
    </footer>
  );
}
