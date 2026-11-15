import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { faqs, organs } from "@/lib/content";

export const Route = createFileRoute("/preguntas")({ component: Questions });

function Questions() {
  return (
    <SiteShell>
      <section className="container-page grid gap-10 py-10 lg:grid-cols-2">
        <div>
          <p className="text-sm font-extrabold text-sage">Para la docente y la familia</p>
          <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">Preguntas frecuentes</h1>
          <div className="mt-6 space-y-3">
            {faqs.map((item) => (
              <details key={item.q} className="rounded-2xl border border-line bg-card px-5 py-4">
                <summary className="cursor-pointer font-display text-xl font-bold">{item.q}</summary>
                <p className="mt-2 text-sm font-bold text-ink-soft">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-extrabold text-sage">Preguntas de los niños</p>
          <h2 className="mt-2 font-display text-3xl font-bold">Lo que suelen preguntar</h2>
          <ul className="mt-6 space-y-3">
            {organs.map((organ) => (
              <li key={organ.id} className="rounded-2xl border border-line bg-sage-soft p-4">
                <p className="font-display text-xl font-bold">{organ.question}</p>
                <p className="mt-1 text-sm font-bold text-ink-soft">{organ.answer}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteShell>
  );
}
