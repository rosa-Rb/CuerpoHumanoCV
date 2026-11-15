import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { activities } from "@/lib/content";

export const Route = createFileRoute("/actividades")({ component: Activities });

function Activities() {
  return (
    <SiteShell>
      <section className="container-page py-10">
        <p className="text-sm font-extrabold text-sage">Para hacer en el aula</p>
        <h1 className="mt-2 max-w-2xl font-display text-4xl font-bold sm:text-5xl">
          Actividades cortas, de pie y con palabras simples
        </h1>
        <p className="mt-4 max-w-2xl font-bold text-ink-soft">
          No hace falta material caro. Sirven el propio cuerpo, una fruta de juguete y las fichas de esta página.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {activities.map((activity) => (
            <article
              key={activity.title}
              className="overflow-hidden rounded-card border border-line bg-card"
            >
              {/* Imagen arriba – altura fija para que no se estire */}
              {activity.image && (
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <div className="p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="font-display text-2xl font-bold">
                    {activity.title}
                  </h2>
                  <p className="text-xs font-extrabold tracking-wide text-coral uppercase">
                    {activity.time}
                  </p>
                </div>

                <ol className="mt-4 space-y-2 text-sm font-bold text-ink-soft">
                  {activity.steps.map((step, index) => (
                    <li key={step}>
                      <span className="text-ink">{index + 1}. </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}