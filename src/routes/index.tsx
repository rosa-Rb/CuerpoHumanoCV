import { createFileRoute, Link } from "@tanstack/react-router";
import { team } from "@/lib/content";

export const Route = createFileRoute("/")({ component: Cover });

function Cover() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-cream">
      <div className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-sage-soft" />
      <div className="pointer-events-none absolute bottom-0 -left-20 h-64 w-64 rounded-full bg-sage-soft" />
      <div className="container-page relative flex min-h-screen flex-col justify-between py-8">
        <p className="text-sm font-extrabold tracking-wide text-sage uppercase">
          Universidad César Vallejo · Educación Inicial
        </p>
        <div className="max-w-3xl py-10">
          <p className="text-sm font-bold text-coral">Explorando nuestro interior</p>
          <h1 className="mt-3 font-display text-5xl leading-none font-bold text-ink sm:text-7xl">
            Cuerpo Humano Interactivo
          </h1>
          <p className="mt-4 max-w-xl text-xl font-bold text-ink-soft">
            Mira por dentro, toca cada parte y descubre para qué sirve.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/inicio"
              className="rounded-full bg-coral px-6 py-3 text-base font-bold text-cream hover:bg-coral-deep"
            >
              Entrar
            </Link>
          </div>
        </div>
        <section>
          <h2 className="text-sm font-extrabold tracking-wide text-ink-soft uppercase">Integrantes</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((name) => (
              <li key={name} className="rounded-2xl border border-line bg-card px-4 py-3 text-sm font-extrabold">
                {name}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
