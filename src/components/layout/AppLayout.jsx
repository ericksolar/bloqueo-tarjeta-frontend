import { useState } from "react";
import menuCardIcon from "../../assets/figma/menu-card.svg";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

function SubHeader({ title }) {
  return (
    <div className="flex w-full items-start gap-3 border-b border-separator bg-bg-secondary px-4 py-4 sm:gap-4 sm:px-8 lg:px-14 lg:py-5">
      <img src={menuCardIcon} alt="" className="size-6" />
      <h1 className="flex-1 text-[16px] font-bold sm:text-[18px] leading-6 tracking-[0.2px] text-label">
        {title}
      </h1>
    </div>
  );
}

export default function AppLayout({
  user,
  section,
  subHeader,
  mainClassName = "pt-8 pb-20",
  onNavigate,
  onLogout,
  children,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleNavigate(next) {
    setMenuOpen(false);
    onNavigate(next);
  }

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <Header
        user={user}
        onLogoClick={() => handleNavigate("dashboard")}
        onLogout={onLogout}
        onMenuClick={() => setMenuOpen(true)}
      />
      <div className="flex flex-1 items-stretch">
        <Sidebar
          section={section}
          onNavigate={handleNavigate}
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
        />
        <div className="flex min-w-0 flex-1 flex-col">
          {subHeader && <SubHeader title={subHeader} />}
          <main className={`flex-1 px-4 sm:px-8 lg:px-[47px] ${mainClassName}`}>{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
