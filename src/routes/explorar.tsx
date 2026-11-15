import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Bone,
  CircleDot,
  Dumbbell,
  Eye,
  Hand,
  Heart,
  Play,
  RotateCcw,
  Star,
  X,
} from "lucide-react";
import {
  DEFAULT_SKIN,
  PARTS,
  SYSTEMS,
  TONES,
  partById,
  partsOf,
  type SystemId,
  type ToneId,
} from "@/data/anatomy";
import { BodyFigure } from "@/components/body-figure";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/explorar")({ component: Explore });

const ICONS = {
  piel: Hand,
  huesos: Bone,
  musculos: Dumbbell,
  organos: Heart,
  articulaciones: CircleDot,
  sentidos: Eye,
} as const;

function pickQuiz(system: SystemId, exclude: string[] = []) {
  const pool = partsOf(system);
  const choices = pool.filter((part) => !exclude.includes(part.id));

  if (choices.length === 0) return null;

  return choices[Math.floor(Math.random() * choices.length)].id;
}

function Explore() {
  const [system, setSystem] = useState<SystemId>("organos");
  const [activeId, setActiveId] = useState("corazon");
  const [skin, setSkin] = useState(0.34);
  const [tone, setTone] = useState<ToneId>("medio");
  const [videoFor, setVideoFor] = useState<string | null>(null);
  const [finding, setFinding] = useState(false);
  const [quest, setQuest] = useState("corazon");
  const [round, setRound] = useState(0);
  const [hits, setHits] = useState(0);
  const [celebrate, setCelebrate] = useState(false);
  const [done, setDone] = useState(false);
  const [shakeId, setShakeId] = useState<string | null>(null);
  const [flash, setFlash] = useState(false);
  const [seen, setSeen] = useState<string[]>([]);
  const [asked, setAsked] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("cuerpo-real-vistos");
      if (raw) setSeen(JSON.parse(raw) as string[]);
    } catch {}
  }, []);

  useEffect(() => {
    setFlash(true);
    const timer = window.setTimeout(() => setFlash(false), 480);
    return () => window.clearTimeout(timer);
  }, [system]);

  const active = partById(activeId);
  const questPart = partById(quest);
  const videoPart = videoFor ? partById(videoFor) : null;
  const list = useMemo(() => partsOf(system), [system]);

  function remember(id: string) {
    setSeen((current) => {
      if (current.includes(id)) return current;
      const next = [...current, id];
      localStorage.setItem("cuerpo-real-vistos", JSON.stringify(next));
      return next;
    });
  }

  function chooseSystem(next: SystemId) {
  setSystem(next);

  const first = partsOf(next)[0];
  setActiveId(first.id);
  setSkin(DEFAULT_SKIN[next]);
  setDone(false);
  setCelebrate(false);
  setAsked([]);

  if (next === "piel" || next === "musculos") {
    setFinding(false);
    return;
  }

  if (finding) {
    setQuest(pickQuiz(next) ?? first.id);
    setRound(0);
    setHits(0);
  }

  remember(first.id);
}

  function choosePart(id: string) {
  if (finding && !done) {
    if (celebrate) return;

    if (id === quest && !asked.includes(id)) {
      const nextRound = round + 1;
      const total = partsOf(system).length;

      const nextAsked = [...asked, id];

      setAsked(nextAsked);
      setHits(nextRound);
      setActiveId(id);
      setCelebrate(true);
      remember(id);

      window.setTimeout(() => {
        setCelebrate(false);
        setRound(nextRound);

        if (nextRound >= total) {
          setDone(true);
        } else {
          setQuest(pickQuiz(system, nextAsked) ?? "");
        }
      }, 700);
    } else {
      setShakeId(id);
      window.setTimeout(() => setShakeId(null), 380);
    }

    return;
  }

  setActiveId(id);
  remember(id);
}

  function replay() {
  setDone(false);
  setCelebrate(false);
  setRound(0);
  setHits(0);
  setAsked([]);
  setQuest(pickQuiz(system) ?? "");
}

function startFind() {
  if (finding) {
    setFinding(false);
    setDone(false);
    setCelebrate(false);
    setAsked([]);
    return;
  }

  if (system === "piel" || system === "musculos") return;

  setFinding(true);
  setDone(false);
  setCelebrate(false);
  setRound(0);
  setHits(0);
  setAsked([]);
  setQuest(pickQuiz(system) ?? "");
}

  return (
    <SiteShell>
      <div className="shell" style={{ minHeight: "auto", background: "transparent" }}>
        <header className="topbar">
          <div>
            <p className="eyebrow">Explorar el cuerpo</p>
            <h1 className="font-display text-3xl font-bold">Cuerpo Real</h1>
          </div>
          {system !== "piel" && system !== "musculos" && (
  <button
    type="button"
    className={finding ? "find-btn on" : "find-btn"}
    onClick={startFind}
  >
    {finding ? <RotateCcw size={18} /> : <Star size={18} />}
    {finding ? "Explorar" : "Encuentra"}
  </button>
)}
        </header>

        <div className="systems" role="tablist">
          {SYSTEMS.map((item) => {
            const Icon = ICONS[item.id];
            const on = system === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={on}
                className="chip"
                data-system={item.id}
                data-on={on ? "true" : "false"}
                onClick={() => chooseSystem(item.id)}
              >
                <Icon size={18} strokeWidth={2.4} />
                {item.name}
              </button>
            );
          })}
        </div>

        <div className="workspace">
          <section className="stage-col">
            {finding ? (
              <div className={celebrate ? "quest good" : "quest"}>
                <Thumb src={questPart.image} name={questPart.name} />
                <div>
                  <p>{done ? "Ronda lista" : "Toca en el cuerpo"}</p>
<strong>
  {done ? `${hits} de ${list.length}` : questPart.name}
</strong>                </div>
                <div className="stars">
                  {Array.from({ length: list.length }, (_, i) => (
  <Star
    key={i}
    size={16}
    className={i < hits ? "star on" : "star"}
  />
))}
                </div>
                {done && (
                  <button type="button" className="text-btn" onClick={replay}>
                    Otra vez
                  </button>
                )}
              </div>
            ) : null}

            <div className="stage">
              <div className={flash ? "wash on" : "wash"} data-system={system} />
              <BodyFigure
                system={system}
                skin={skin}
                tone={tone}
                activeId={finding && !celebrate ? null : activeId}
                shakeId={shakeId}
                showLabel={!finding || celebrate}
                onPick={choosePart}
              />
            </div>

            <div className="controls">
              <label className="slider">
                <span>Piel transparente</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={Math.round(skin * 100)}
                  onChange={(e) => setSkin(Number(e.target.value) / 100)}
                />
                <span>Piel visible</span>
              </label>
              <div className="tones">
                {TONES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={tone === item.id ? "tone on" : "tone"}
                    data-tone={item.id}
                    onClick={() => setTone(item.id)}
                  >
                    <span className="swatch" />
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <aside className="side">
            <article className="story">
              <Thumb src={active.image} name={active.name} large />
              <div className="story-copy">
                <p className="dato">{active.dato}</p>
                <h2>{active.name}</h2>
                <p>{active.blurb}</p>
                <button
                  type="button"
                  className="video-btn"
                  onClick={() => setVideoFor(active.id)}
                >
                  <Play size={18} fill="currentColor" />
                  Ver video
                </button>
              </div>
            </article>

            <div className="pills">
              {list.map((part) => (
                <button
                  key={part.id}
                  type="button"
                  className={part.id === activeId ? "pill on" : "pill"}
                  onClick={() => choosePart(part.id)}
                >
                  <Thumb src={part.image} name={part.name} />
                  <span>{part.name}</span>
                  {seen.includes(part.id) && <i className="seen" />}
                </button>
              ))}
            </div>
          </aside>
        </div>

        <Dialog.Root open={videoPart !== null} onOpenChange={(open) => !open && setVideoFor(null)}>
          <Dialog.Portal>
            <Dialog.Overlay className="overlay" />
            <Dialog.Content className="video-dialog">
              <div className="video-head">
                <Dialog.Title>{videoPart?.videoTitle ?? "Video"}</Dialog.Title>
                <Dialog.Close className="icon-btn">
                  <X size={20} />
                </Dialog.Close>
              </div>
              {videoPart && (
                <iframe
                  className="player"
                  src={`https://www.youtube-nocookie.com/embed/${videoPart.video}?rel=0`}
                  title={videoPart.videoTitle}
                  allowFullScreen
                />
              )}
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </SiteShell>
  );
}

function Thumb({ src, name, large }: { src: string; name: string; large?: boolean }) {
  const [bad, setBad] = useState(false);
  useEffect(() => setBad(false), [src]);
  if (bad) {
    return <span className={large ? "thumb-fallback large" : "thumb-fallback"}>{name.slice(0, 1)}</span>;
  }
  return (
    <img
      src={src}
      alt={large ? name : ""}
      className={large ? "story-img" : "thumb"}
      onError={() => setBad(true)}
    />
  );
}