import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

const links = [
  { to: "/inicio", label: "Inicio" },
  { to: "/explorar", label: "Explorar" },
  { to: "/actividades", label: "Actividades" },
  { to: "/preguntas", label: "Preguntas" },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-line bg-cream/95 backdrop-blur-sm">
        <div className="container-page flex items-center justify-between gap-4 py-3">
          <Link to="/" className="min-w-0">
            <p className="font-display text-lg leading-none font-bold text-ink">Cuerpo humano</p>
            <p className="text-xs font-bold tracking-wide text-coral uppercase">Interactivo</p>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((item) => {
              const active = path === item.to || path.startsWith(item.to + "/");
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={
                    "rounded-full px-3 py-2 text-sm font-extrabold " +
                    (active ? "bg-ink text-cream" : "text-ink-soft hover:bg-cream-deep hover:text-ink")
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <Link
            to="/explorar"
            className="rounded-full bg-coral px-4 py-2 text-sm font-extrabold text-cream hover:bg-coral-deep"
          >
            Explorar
          </Link>
        </div>
        
<nav className="container-page grid grid-cols-4 gap-1.5 pb-3 md:hidden">
  {links.map((item) => {
    const active = path === item.to;
    return (
      <Link
        key={item.to}
        to={item.to}
        className={
          "flex min-w-0 items-center justify-center whitespace-nowrap rounded-full px-1 py-2 text-xs font-extrabold " +
          (active ? "bg-ink text-cream" : "bg-card text-ink-soft")
        }
      >
        {item.label}
      </Link>
    );
  })}
</nav>

      </header>
      <main>{children}</main>
      <footer className="mt-16 border-t border-line bg-ink text-cream">
        <div className="container-page py-8">
          <p className="font-display text-2xl font-bold">Cuerpo Humano Interactivo</p>
          <p className="mt-2 text-sm">Explorando nuestro interior</p>
        </div>
      </footer>
    </div>
  );
}
