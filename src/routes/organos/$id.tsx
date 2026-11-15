import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { organs } from "@/lib/content";

export const Route = createFileRoute("/organos/$id")({
  component: OrganPage,
  loader: ({ params }) => {
    const organ = organs.find((item) => item.id === params.id);
    if (!organ) throw notFound();
    return organ;
  },
  notFoundComponent: () => (
    <SiteShell>
      <div className="container-page py-16">
        <h1 className="font-display text-4xl font-bold">No encontramos ese órgano</h1>
        <Link to="/inicio" className="mt-4 inline-block font-extrabold text-coral">
          Volver al inicio
        </Link>
      </div>
    </SiteShell>
  ),
});

function OrganPage() {
  const organ = Route.useLoaderData();
  const index = organs.findIndex((item) => item.id === organ.id);
  const next = organs[(index + 1) % organs.length];

  return (
    <SiteShell>
      <article className="container-page grid gap-8 py-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm font-extrabold text-sage">Ficha para leer en voz alta</p>
          <h1 className="mt-2 font-display text-5xl font-bold">{organ.name}</h1>
          <p className="mt-4 text-lg font-bold text-ink-soft">{organ.short}</p>
          <dl className="mt-8 space-y-5">
            <Block title="¿Qué hace?" text={organ.job} />
            <Block title="¿Dónde está?" text={organ.where} />
            <Block title="¿Cómo lo cuidamos?" text={organ.care} />
          </dl>
        </div>
        <aside className="space-y-4">
          <div className="rounded-card bg-ink p-6 text-cream">
            <p className="text-sm font-extrabold text-blush">Dato para sorprenderse</p>
            <p className="mt-2 font-display text-2xl font-bold">{organ.fact}</p>
          </div>
          <div className="rounded-card border border-line bg-card p-6">
            <p className="text-sm font-extrabold text-coral">Pregunta de niño</p>
            <p className="mt-2 font-display text-2xl font-bold">{organ.question}</p>
            <p className="mt-3 text-sm font-bold text-ink-soft">{organ.answer}</p>
          </div>
          <Link
            to="/organos/$id"
            params={{ id: next.id }}
            className="block rounded-card border border-line bg-sage-soft p-5"
          >
            <p className="text-xs font-extrabold tracking-wide text-sage uppercase">Siguiente</p>
            <p className="font-display text-2xl font-bold text-ink">{next.name}</p>
          </Link>
          <Link to="/explorar" className="inline-flex text-sm font-extrabold text-coral">
            Volver al cuerpo
          </Link>
        </aside>
      </article>
    </SiteShell>
  );
}

function Block({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <dt className="font-display text-xl font-bold">{title}</dt>
      <dd className="mt-1 text-sm font-bold text-ink-soft">{text}</dd>
    </div>
  );
}
