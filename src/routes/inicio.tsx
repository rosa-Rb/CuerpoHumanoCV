import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, CircleHelp, Compass, HeartPulse, Shapes } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { organs } from "@/lib/content";

export const Route = createFileRoute("/inicio")({ component: Home });

const cards = [
  {
    to: "/explorar",
    title: "Explorar el cuerpo",
    text: "Señala cabeza, pecho y barriga. Cada zona abre una explicación corta.",
    icon: Compass,
  },
  {
    to: "/organos/corazon",
    title: "Fichas de órganos",
    text: "Cerebro, corazón, pulmones, estómago, hígado e intestinos.",
    icon: HeartPulse,
  },
  {
    to: "/actividades",
    title: "Actividades de aula",
    text: "Juegos de diez minutos para hacer de pie, sin pantallas extras.",
    icon: Shapes,
  },
  {
    to: "/preguntas",
    title: "Preguntas",
    text: "Respuestas cortas para cuando alguien pregunta en clase o en casa.",
    icon: CircleHelp,
  },
  {
    to: "/explorar",
    title: "Cómo se usa",
    text: "Primero mirar, luego nombrar y después jugar un ratito.",
    icon: BookOpen,
  },
];

function Home() {
  return (
    <SiteShell>
      <section className="container-page py-12">
        <p className="text-sm font-bold text-sage">Para mirar juntos</p>
        <h1 className="mt-2 max-w-2xl font-display text-4xl leading-tight font-bold sm:text-6xl">
          Aprende dónde está cada parte y para qué sirve
        </h1>
        <p className="mt-4 max-w-xl text-lg font-bold text-ink-soft">
          Gira el cuerpo, elige una parte y lee qué hace. Cabeza, pecho y barriga están en su
          lugar, con los órganos de verdad: cerebro, corazón, pulmones, estómago, hígado
          e intestinos.
        </p>
        <Link
          to="/explorar"
          className="mt-6 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-bold text-cream"
        >
          Empezar a explorar
        </Link>
      </section>

      <section className="container-page pb-4">
        <h2 className="font-display text-3xl font-bold">Qué vas a encontrar</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.title}
              to={card.to}
              className="rounded-card border border-line bg-card p-5 transition hover:-translate-y-0.5 hover:border-coral"
            >
              <card.icon className="text-coral" size={22} />
              <h3 className="mt-3 font-display text-2xl font-bold">{card.title}</h3>
              <p className="mt-2 text-sm font-bold text-ink-soft">{card.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page py-12">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-bold">Los órganos, en orden</h2>
          <Link to="/explorar" className="text-sm font-extrabold text-coral">
            Ver en el cuerpo
          </Link>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {organs.map((organ, index) => (
            <Link
              key={organ.id}
              to="/organos/$id"
              params={{ id: organ.id }}
              className="flex gap-4 rounded-2xl border border-line bg-card p-4"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sage-soft text-sm font-extrabold text-sage">
                {index + 1}
              </span>
              <span>
                <span className="block font-display text-xl font-bold">{organ.name}</span>
                <span className="mt-1 block text-sm font-bold text-ink-soft">{organ.short}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
