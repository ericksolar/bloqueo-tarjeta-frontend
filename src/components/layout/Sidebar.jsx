import chevronUp from "../../assets/figma/nav-chevron-up.svg";
import creditCardIcon from "../../assets/figma/nav-credit-card.svg";
import homeIcon from "../../assets/figma/nav-home.svg";

function NavItem({ icon, label, trailing, active = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-[52px] w-full items-center gap-2 py-4 pl-1 pr-2 text-left ${
        active ? "bg-black/5" : "hover:bg-black/[0.03]"
      }`}
    >
      <span className="flex flex-1 items-center gap-1">
        <span className="p-1">
          <img src={icon} alt="" className="size-4" />
        </span>
        <span className="text-[16px] leading-[22px] tracking-[0.2px] text-label">
          {label}
        </span>
      </span>
      {trailing && (
        <span className="p-1">
          <img src={trailing} alt="" className="size-4" />
        </span>
      )}
    </button>
  );
}

function SubNavItem({ label, active = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full px-8 py-[14px] text-left text-[14px] leading-5 ${
        active ? "text-brand" : "text-label hover:text-brand"
      }`}
    >
      {label}
    </button>
  );
}

/**
 * @param {"dashboard" | "cards"} section  Sección activa del menú.
 */
export default function Sidebar({
  section,
  onNavigate,
  open = false,
  onClose,
}) {
  const inCards = section === "cards";

  return (
    <>
      {/* Fondo oscuro del menú en móvil/tablet */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-30 bg-black/40 transition-opacity lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[280px] shrink-0 justify-end overflow-y-auto border-r border-separator bg-white px-4 pt-4 transition-transform lg:static lg:z-auto lg:w-[310px] lg:translate-x-0 lg:self-stretch lg:overflow-visible ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav
          className="flex w-full flex-col lg:w-[215px]"
          aria-label="Menú principal"
        >
          <NavItem
            icon={homeIcon}
            label="Inicio"
            onClick={() => onNavigate("dashboard")}
          />
          <NavItem
            icon={creditCardIcon}
            label="Mis Tarjetas"
            trailing={chevronUp}
            active={inCards}
          />
          <SubNavItem
            label="Bloqueo / desbloqueo tarjetas"
            active={inCards}
            onClick={() => onNavigate("list")}
          />
        </nav>
      </aside>
    </>
  );
}
