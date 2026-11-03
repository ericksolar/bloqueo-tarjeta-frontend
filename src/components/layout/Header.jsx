import avatarBg from "../../assets/figma/avatar-bg.svg";
import chevronRightWhite from "../../assets/figma/chevron-right-white.svg";
import logoutIcon from "../../assets/figma/logout.svg";
import { BrandLogo } from "../brand/BrandMark";

export default function Header({ user, onLogoClick, onLogout, onMenuClick }) {
  return (
    <header className="sticky top-0 z-20 flex h-[60px] w-full shrink-0 items-center bg-brand px-2 text-white sm:px-4 lg:static lg:h-[72px] lg:pl-[92px] lg:pr-[73px]">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Abrir menú"
        className="mr-1 flex size-11 items-center justify-center rounded-[4px] hover:bg-white/10 lg:hidden"
      >
        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <button type="button" onClick={onLogoClick} aria-label="Ir al inicio" className="origin-left scale-[0.8] sm:scale-100">
        <BrandLogo />
      </button>

      <p className="ml-[80px] hidden truncate xl:block text-[12px] font-medium leading-[18px] tracking-[0.2px]">
        Último acceso {user.lastAccess}
      </p>

      <div className="ml-auto flex h-full items-center">
        <div className="flex items-center gap-3 px-2">
          <div className="relative size-[42px] shrink-0">
            <img src={avatarBg} alt="" className="absolute inset-0 block size-full" />
            <span className="absolute inset-0 flex items-center justify-center text-[18px] font-medium leading-6 tracking-[0.2px]">
              {user.initials}
            </span>
          </div>
          <div className="hidden flex-col md:flex">
            <span className="text-[14px] font-bold leading-5 tracking-[0.2px]">
              {user.name}
            </span>
            <a href="#" className="flex items-center gap-[2px] text-[12px] leading-[18px] tracking-[0.2px]">
              Editar mis datos
              <img src={chevronRightWhite} alt="" className="size-4" />
            </a>
          </div>
        </div>

        <button
          type="button"
          onClick={onLogout}
          aria-label="Cerrar sesión"
          className="flex h-[60px] w-12 flex-col items-center justify-center gap-2 lg:ml-[14px] lg:h-[72px] lg:w-[94px]"
        >
          <img src={logoutIcon} alt="" className="size-6" />
          <span className="hidden whitespace-nowrap text-[12px] lg:inline font-medium leading-[18px] tracking-[0.2px]">
            Cerrar sesión
          </span>
        </button>
      </div>
    </header>
  );
}
