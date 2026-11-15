import type { SystemId, ToneId } from "@/data/anatomy";

type Pt = [number, number];
type Hit = { id: string; x: number; y: number };

const P = {
  shoulderL: [116, 196] as Pt,
  elbowL: [68, 352] as Pt,
  wristL: [46, 492] as Pt,
  palmL: [38, 542] as Pt,
  shoulderR: [284, 196] as Pt,
  elbowR: [332, 352] as Pt,
  wristR: [354, 492] as Pt,
  palmR: [362, 542] as Pt,
  hipL: [164, 500] as Pt,
  kneeL: [156, 672] as Pt,
  ankleL: [152, 824] as Pt,
  hipR: [236, 500] as Pt,
  kneeR: [244, 672] as Pt,
  ankleR: [248, 824] as Pt,
};

function limb(a: Pt, b: Pt, w1: number, w2: number) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy) || 1;
  const px = -dy / len;
  const py = dx / len;
  const side = (pt: Pt, w: number, s: number) =>
    [pt[0] + px * w * s, pt[1] + py * w * s] as Pt;
  const a1 = side(a, w1, 0.5);
  const b1 = side(b, w2, 0.5);
  const b2 = side(b, w2, -0.5);
  const a2 = side(a, w1, -0.5);
  return `M ${a1[0].toFixed(1)} ${a1[1].toFixed(1)} L ${b1[0].toFixed(1)} ${b1[1].toFixed(1)} L ${b2[0].toFixed(1)} ${b2[1].toFixed(1)} L ${a2[0].toFixed(1)} ${a2[1].toFixed(1)} Z`;
}

function along(a: Pt, b: Pt, t: number): Pt {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}

function inset(a: Pt, b: Pt, dist: number): [Pt, Pt] {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy) || 1;
  return [
    [a[0] + (dx / len) * dist, a[1] + (dy / len) * dist],
    [b[0] - (dx / len) * dist, b[1] - (dy / len) * dist],
  ];
}

function shift(a: Pt, b: Pt, dist: number): [Pt, Pt] {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy) || 1;
  const px = (-dy / len) * dist;
  const py = (dx / len) * dist;
  return [
    [a[0] + px, a[1] + py],
    [b[0] + px, b[1] + py],
  ];
}

const HITS: Record<SystemId, Hit[]> = {
  piel: [
    { id: "piel", x: 200, y: 320 },
    { id: "piel", x: 156, y: 580 },
  ],
  huesos: [
    { id: "craneo", x: 200, y: 86 },
    { id: "columna", x: 200, y: 330 },
    { id: "costillas", x: 154, y: 286 },
    { id: "costillas", x: 246, y: 286 },
   // { id: "pelvis", x: 200, y: 478 },
   // { id: "humero", x: 92, y: 274 },
    //{ id: "humero", x: 308, y: 274 },
    //{ id: "femur", x: 160, y: 586 },
   // { id: "femur", x: 240, y: 586 },
  ],
  musculos: [
   // { id: "deltoides", x: 112, y: 214 },
   // { id: "deltoides", x: 288, y: 214 },
   // { id: "biceps", x: 88, y: 286 },
   // { id: "biceps", x: 312, y: 286 },
    { id: "abdominales", x: 200, y: 390 },
   // { id: "cuadriceps", x: 158, y: 575 },
   // { id: "cuadriceps", x: 242, y: 575 },
  ],
  organos: [
    { id: "cerebro", x: 200, y: 96 },
    { id: "pulmones", x: 162, y: 286 },
    { id: "pulmones", x: 238, y: 286 },
    { id: "corazon", x: 218, y: 300 },
    { id: "higado", x: 160, y: 372 },
    { id: "estomago", x: 232, y: 368 },
    { id: "intestinos", x: 200, y: 430 },
  ],
  articulaciones: [
    { id: "hombro", x: 116, y: 196 },
    { id: "hombro", x: 284, y: 196 },
    { id: "codo", x: 68, y: 352 },
    { id: "codo", x: 332, y: 352 },
    { id: "muneca", x: 46, y: 492 },
    { id: "muneca", x: 354, y: 492 },
    { id: "cadera", x: 164, y: 500 },
    { id: "cadera", x: 236, y: 500 },
    { id: "rodilla", x: 156, y: 672 },
    { id: "rodilla", x: 244, y: 672 },
    { id: "tobillo", x: 152, y: 824 },
    { id: "tobillo", x: 248, y: 824 },
  ],
  sentidos: [
    { id: "vista", x: 182, y: 100 },
    { id: "vista", x: 218, y: 100 },
    { id: "oido", x: 148, y: 112 },
    { id: "oido", x: 252, y: 112 },
    { id: "olfato", x: 200, y: 122 },
    { id: "gusto", x: 200, y: 142 },
    { id: "tacto", x: 38, y: 560 },
    { id: "tacto", x: 362, y: 560 },
  ],
};

const NAMES: Record<string, string> = {
  piel: "Piel",
  craneo: "Cráneo",
  columna: "Columna",
  costillas: "Costillas",
 // pelvis: "Pelvis",
 // humero: "Húmero",
 // femur: "Fémur",
 // deltoides: "Deltoides",
  //biceps: "Bíceps",
  abdominales: "Abdominales",
 // cuadriceps: "Cuádriceps",
  cerebro: "Cerebro",
  corazon: "Corazón",
  pulmones: "Pulmones",
  higado: "Hígado",
  estomago: "Estómago",
  intestinos: "Intestinos",
  hombro: "Hombro",
  codo: "Codo",
  muneca: "Muñeca",
  cadera: "Cadera",
  rodilla: "Rodilla",
  tobillo: "Tobillo",
  vista: "Vista",
  oido: "Oído",
  olfato: "Olfato",
  gusto: "Gusto",
  tacto: "Tacto",
};

function BoneLine({ a, b, w, hot }: { a: Pt; b: Pt; w: number; hot?: boolean }) {
  const [p, q] = inset(a, b, 10);
  return (
    <g className={hot ? "is-hot" : undefined}>
      <line x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke="url(#cr-bone)" strokeWidth={w} strokeLinecap="round" />
      <line
        x1={p[0]}
        y1={p[1]}
        x2={q[0]}
        y2={q[1]}
        stroke="var(--color-card)"
        strokeWidth={Math.max(2, w * 0.26)}
        strokeLinecap="round"
        opacity={0.75}
      />
    </g>
  );
}

function Fingers({ wrist, palm }: { wrist: Pt; palm: Pt }) {
  const dx = palm[0] - wrist[0];
  const dy = palm[1] - wrist[1];
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const px = -uy;
  const py = ux;
  return (
    <>
      {[-1.2, -0.4, 0.4, 1.15].map((spread, index) => {
        const origin: Pt = [palm[0] + px * spread * 8, palm[1] + py * spread * 8];
        const reach = index === 0 || index === 3 ? 22 : 30;
        const tip: Pt = [
          origin[0] + ux * reach + px * spread * 2,
          origin[1] + uy * reach + py * spread * 2,
        ];
        return <path key={spread} d={limb(origin, tip, 8, 5.5)} />;
      })}
    </>
  );
}

export function BodyFigure({
  system,
  skin,
  tone,
  activeId,
  shakeId,
  showLabel,
  onPick,
}: {
  system: SystemId;
  skin: number;
  tone: ToneId;
  activeId: string | null;
  shakeId: string | null;
  showLabel: boolean;
  onPick: (id: string) => void;
}) {
  const peeling = system === "piel" && skin < 0.82;
  const boneOp =
    system === "huesos" || system === "articulaciones"
      ? 1
      : system === "musculos"
        ? 0.18
        : system === "organos"
          ? 0.12
          : peeling
            ? 0.22
            : 0;
  const muscleOp = system === "musculos" ? 1 : 0;
  const organOp = system === "organos" || peeling ? 1 : system === "sentidos" ? 0.28 : 0;
  const jointOp = system === "articulaciones" ? 1 : 0;
  const hot = (id: string) => activeId === id;
  const hits = HITS[system];
  const labelHit = hits.find((hit) => hit.id === activeId) ?? null;
  const focus =
    system === "sentidos"
      ? "translate(200px, 120px) scale(1.7) translate(-200px, -120px)"
      : "translate(0px, 0px) scale(1)";

  const [radiusL, ulnaL] = [shift(P.elbowL, P.wristL, -5), shift(P.elbowL, P.wristL, 5)];
  const [radiusR, ulnaR] = [shift(P.elbowR, P.wristR, -5), shift(P.elbowR, P.wristR, 5)];
  const [fibulaL, tibiaL] = [shift(P.kneeL, P.ankleL, -6), shift(P.kneeL, P.ankleL, 5)];
  const [fibulaR, tibiaR] = [shift(P.kneeR, P.ankleR, -5), shift(P.kneeR, P.ankleR, 6)];

  return (
    <svg viewBox="0 0 400 900" className={`body-svg tone-${tone} sys-${system}`} role="group" aria-label="Figura del cuerpo humano">
      <defs>
        <linearGradient id="cr-bone" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--color-bone-lite)" />
          <stop offset="1" stopColor="var(--color-bone-deep)" />
        </linearGradient>
        <linearGradient id="cr-muscle" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--color-muscle-lite)" />
          <stop offset="1" stopColor="var(--color-muscle-deep)" />
        </linearGradient>
        <linearGradient id="cr-skin" x1="0.2" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="var(--skin-base)" />
          <stop offset="1" stopColor="var(--skin-shade)" />
        </linearGradient>
        <filter id="cr-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feDropShadow dx="0" dy="0" stdDeviation="3.2" floodColor="var(--color-gold)" floodOpacity="0.95" />
        </filter>
      </defs>

      <ellipse cx="200" cy="868" rx="70" ry="10" fill="var(--color-ink)" opacity="0.1" />

      <g className="figure-root" style={{ transform: focus }}>
        <g style={{ opacity: boneOp }}>
          <g className={hot("craneo") ? "is-hot" : undefined}>
            <ellipse cx="200" cy="102" rx="44" ry="54" fill="url(#cr-bone)" />
            <ellipse cx="184" cy="104" rx="11" ry="9" fill="var(--color-ink)" opacity="0.75" />
            <ellipse cx="216" cy="104" rx="11" ry="9" fill="var(--color-ink)" opacity="0.75" />
            <path d="M200 114 L193 132 L207 132 Z" fill="var(--color-ink)" opacity="0.5" />
            <rect x="186" y="136" width="28" height="10" rx="2" fill="var(--color-card)" />
          </g>
          {Array.from({ length: 18 }, (_, index) => {
            const y = 164 + index * 16;
            const w = index < 5 ? 12 : index < 12 ? 14 : 16;
            return (
              <rect
                key={y}
                x={200 - w / 2}
                y={y}
                width={w}
                height={10}
                rx={3}
                fill="url(#cr-bone)"
                className={hot("columna") ? "is-hot" : undefined}
              />
            );
          })}
          <g fill="none" stroke="url(#cr-bone)" strokeLinecap="round" className={hot("costillas") ? "is-hot" : undefined}>
            {Array.from({ length: 7 }, (_, index) => {
              const y = 214 + index * 16;
              const span = 58 - index * 2.4;
              return (
                <g key={y} strokeWidth="4.5">
                  <path d={`M200 ${y} Q ${200 - span} ${y + 14} ${196 - span} ${y + 28}`} />
                  <path d={`M200 ${y} Q ${200 + span} ${y + 14} ${204 + span} ${y + 28}`} />
                </g>
              );
            })}
            <path d="M200 210 V328" strokeWidth="7" />
          </g>
          <path d="M200 188 Q158 176 116 196" fill="none" stroke="url(#cr-bone)" strokeWidth="6" strokeLinecap="round" />
          <path d="M200 188 Q242 176 284 196" fill="none" stroke="url(#cr-bone)" strokeWidth="6" strokeLinecap="round" />
          <g className={hot("pelvis") ? "is-hot" : undefined}>
            <path
              d="M150 458 C146 434 172 418 200 420 C228 418 254 434 250 458 C246 486 226 502 200 496 C174 502 154 486 150 458 Z"
              fill="url(#cr-bone)"
            />
            <circle cx="170" cy="474" r="10" fill="var(--color-ink)" opacity="0.16" />
            <circle cx="230" cy="474" r="10" fill="var(--color-ink)" opacity="0.16" />
          </g>
          <BoneLine a={P.shoulderL} b={P.elbowL} w={18} hot={hot("humero")} />
          <BoneLine a={P.shoulderR} b={P.elbowR} w={18} hot={hot("humero")} />
          <BoneLine a={radiusL[0]} b={radiusL[1]} w={8} />
          <BoneLine a={ulnaL[0]} b={ulnaL[1]} w={8} />
          <BoneLine a={radiusR[0]} b={radiusR[1]} w={8} />
          <BoneLine a={ulnaR[0]} b={ulnaR[1]} w={8} />
          <BoneLine a={P.hipL} b={P.kneeL} w={20} hot={hot("femur")} />
          <BoneLine a={P.hipR} b={P.kneeR} w={20} hot={hot("femur")} />
          <BoneLine a={tibiaL[0]} b={tibiaL[1]} w={11} />
          <BoneLine a={fibulaL[0]} b={fibulaL[1]} w={6} />
          <BoneLine a={tibiaR[0]} b={tibiaR[1]} w={11} />
          <BoneLine a={fibulaR[0]} b={fibulaR[1]} w={6} />
          <circle cx={P.kneeL[0]} cy={P.kneeL[1]} r="9" fill="url(#cr-bone)" />
          <circle cx={P.kneeR[0]} cy={P.kneeR[1]} r="9" fill="url(#cr-bone)" />
        </g>

        <g style={{ opacity: muscleOp }} fill="url(#cr-muscle)">
          <ellipse cx="108" cy="214" rx="24" ry="28" className={hot("deltoides") ? "is-hot" : undefined} />
          <ellipse cx="292" cy="214" rx="24" ry="28" className={hot("deltoides") ? "is-hot" : undefined} />
          <path d={limb(along(P.shoulderL, P.elbowL, 0.16), along(P.shoulderL, P.elbowL, 0.8), 24, 18)} className={hot("biceps") ? "is-hot" : undefined} />
          <path d={limb(along(P.shoulderR, P.elbowR, 0.16), along(P.shoulderR, P.elbowR, 0.8), 24, 18)} className={hot("biceps") ? "is-hot" : undefined} />
          <path d={limb(along(P.elbowL, P.wristL, 0.12), along(P.elbowL, P.wristL, 0.88), 18, 13)} />
          <path d={limb(along(P.elbowR, P.wristR, 0.12), along(P.elbowR, P.wristR, 0.88), 18, 13)} />
          <ellipse cx="172" cy="248" rx="26" ry="20" />
          <ellipse cx="228" cy="248" rx="26" ry="20" />
          <g className={hot("abdominales") ? "is-hot" : undefined}>
            {[0, 1, 2, 3].map((row) =>
              [-1, 1].map((side) => (
                <rect
                  key={`${row}-${side}`}
                  x={200 + side * 6 - (side < 0 ? 20 : 0)}
                  y={318 + row * 26}
                  width="20"
                  height="18"
                  rx="6"
                />
              )),
            )}
          </g>
          <path d={limb(along(P.hipL, P.kneeL, 0.08), along(P.hipL, P.kneeL, 0.76), 32, 22)} className={hot("cuadriceps") ? "is-hot" : undefined} />
          <path d={limb(along(P.hipR, P.kneeR, 0.08), along(P.hipR, P.kneeR, 0.76), 32, 22)} className={hot("cuadriceps") ? "is-hot" : undefined} />
          <path d={limb(along(P.kneeL, P.ankleL, 0.16), along(P.kneeL, P.ankleL, 0.72), 18, 12)} />
          <path d={limb(along(P.kneeR, P.ankleR, 0.16), along(P.kneeR, P.ankleR, 0.72), 18, 12)} />
        </g>

        <g style={{ opacity: organOp }}>
          <g className={organOp > 0 ? "lungs-live" : undefined}>
            <path
              d="M188 214 C156 224 142 270 150 324 C158 362 190 356 198 318 C204 278 202 232 188 214 Z"
              fill="var(--color-lung)"
              className={hot("pulmones") ? "is-hot" : undefined}
            />
            <path
              d="M214 210 C250 222 264 274 252 328 C242 360 214 352 210 314 C206 274 204 228 214 210 Z"
              fill="var(--color-lung)"
              className={hot("pulmones") ? "is-hot" : undefined}
            />
          </g>
          <path d="M200 160 V230" stroke="var(--color-stomach)" strokeWidth="5" strokeLinecap="round" opacity="0.65" />
          <g transform="translate(198 268)" className={hot("corazon") ? "is-hot" : undefined}>
            <g className={organOp > 0 ? "heart-live" : undefined}>
              <path
                d="M12 8 C12 -10 34 -8 34 8 C34 24 12 38 12 40 C12 38 -10 24 -10 8 C-10 -8 12 -10 12 8 Z"
                fill="var(--color-heart)"
              />
            </g>
          </g>
          <path
            d="M140 348 C132 376 156 408 194 398 C204 372 184 344 140 348 Z"
            fill="var(--color-liver)"
            className={hot("higado") ? "is-hot" : undefined}
          />
          <path
            d="M214 346 C250 348 258 386 234 398 C214 406 202 382 214 362 Z"
            fill="var(--color-stomach)"
            className={hot("estomago") ? "is-hot" : undefined}
          />
          <path
            d="M168 404 C208 390 236 414 216 436 C196 456 160 444 172 422 C184 400 230 414 240 440 C248 464 204 482 174 460"
            fill="none"
            stroke="var(--color-gut)"
            strokeWidth="11"
            strokeLinecap="round"
            className={hot("intestinos") ? "is-hot" : undefined}
          />
          <g className={hot("cerebro") ? "is-hot" : undefined}>
            <ellipse cx="200" cy="98" rx="30" ry="36" fill="var(--color-brain)" />
            <path
              d="M178 90 C190 80 198 104 212 86 C222 102 230 84 232 102 M180 112 C198 102 194 124 214 114"
              fill="none"
              stroke="var(--color-heart)"
              strokeWidth="2"
              opacity="0.4"
            />
          </g>
        </g>

        <g style={{ opacity: skin }} fill="url(#cr-skin)">
          <path d={limb(P.shoulderL, P.elbowL, 36, 28)} />
          <path d={limb(P.elbowL, P.wristL, 28, 18)} />
          <path d={limb(P.wristL, P.palmL, 20, 18)} />
          <Fingers wrist={P.wristL} palm={P.palmL} />
          <path d={limb(P.shoulderR, P.elbowR, 36, 28)} />
          <path d={limb(P.elbowR, P.wristR, 28, 18)} />
          <path d={limb(P.wristR, P.palmR, 20, 18)} />
          <Fingers wrist={P.wristR} palm={P.palmR} />
          <path d={limb(P.hipL, P.kneeL, 46, 32)} />
          <path d={limb(P.kneeL, P.ankleL, 32, 18)} />
          <path d={limb(P.ankleL, [118, 846], 22, 16)} />
          <path d={limb(P.hipR, P.kneeR, 46, 32)} />
          <path d={limb(P.kneeR, P.ankleR, 32, 18)} />
          <path d={limb(P.ankleR, [282, 846], 22, 16)} />
          {[P.shoulderL, P.elbowL, P.wristL, P.shoulderR, P.elbowR, P.wristR, P.hipL, P.kneeL, P.ankleL, P.hipR, P.kneeR, P.ankleR].map(
            (pt) => (
              <circle key={`${pt[0]}-${pt[1]}`} cx={pt[0]} cy={pt[1]} r="16" />
            ),
          )}
          <path d="M116 196 C150 168 250 168 284 196 C306 250 286 340 258 410 C246 456 236 492 230 508 C214 528 186 528 170 508 C164 492 154 456 142 410 C114 340 94 250 116 196 Z" />
          <path d="M182 150 C178 174 174 190 168 206 L232 206 C226 190 222 174 218 150 C206 142 194 142 182 150 Z" />
          <ellipse cx="200" cy="102" rx="48" ry="58" />
          <ellipse cx="150" cy="114" rx="10" ry="16" />
          <ellipse cx="250" cy="114" rx="10" ry="16" />
          <path d="M156 78 C154 42 176 30 200 30 C224 30 246 42 244 78 C230 62 216 54 200 54 C184 54 170 62 156 78 Z" fill="var(--hair)" />
          <g style={{ opacity: skin > 0.55 ? 1 : 0 }}>
            <g fill="none" stroke="var(--skin-deep)" strokeWidth="2.2" strokeLinecap="round">
              <path d="M168 88 Q180 84 190 90" />
              <path d="M210 90 Q220 84 232 88" />
              <path d="M200 114 L196 128" />
              <path d="M188 142 Q200 148 212 142" />
            </g>
            <ellipse cx="182" cy="102" rx="7.5" ry="5" fill="var(--color-card)" />
            <ellipse cx="218" cy="102" rx="7.5" ry="5" fill="var(--color-card)" />
            <circle cx="183" cy="102" r="2.8" fill="var(--color-iris)" />
            <circle cx="219" cy="102" r="2.8" fill="var(--color-iris)" />
            <circle cx="200" cy="430" r="2.2" fill="var(--skin-deep)" opacity="0.45" />
          </g>
        </g>

        <g fill="none" stroke="var(--skin-deep)" strokeWidth="2.4" strokeLinejoin="round" opacity="0.55" pointerEvents="none">
          <path d={limb(P.shoulderL, P.elbowL, 36, 28)} />
          <path d={limb(P.elbowL, P.wristL, 28, 18)} />
          <path d={limb(P.shoulderR, P.elbowR, 36, 28)} />
          <path d={limb(P.elbowR, P.wristR, 28, 18)} />
          <path d={limb(P.hipL, P.kneeL, 46, 32)} />
          <path d={limb(P.kneeL, P.ankleL, 32, 18)} />
          <path d={limb(P.hipR, P.kneeR, 46, 32)} />
          <path d={limb(P.kneeR, P.ankleR, 32, 18)} />
          <path d="M116 196 C150 168 250 168 284 196 C306 250 286 340 258 410 C246 456 236 492 230 508 C214 528 186 528 170 508 C164 492 154 456 142 410 C114 340 94 250 116 196 Z" />
          <ellipse cx="200" cy="102" rx="48" ry="58" />
        </g>

        <g style={{ opacity: jointOp }}>
          {(
            [
              ["hombro", P.shoulderL],
              ["hombro", P.shoulderR],
              ["codo", P.elbowL],
              ["codo", P.elbowR],
              ["muneca", P.wristL],
              ["muneca", P.wristR],
              ["cadera", P.hipL],
              ["cadera", P.hipR],
              ["rodilla", P.kneeL],
              ["rodilla", P.kneeR],
              ["tobillo", P.ankleL],
              ["tobillo", P.ankleR],
            ] as const
          ).map(([id, pt]) => (
            <g key={`${id}-${pt[0]}`} className={hot(id) ? "is-hot" : undefined}>
              <circle cx={pt[0]} cy={pt[1]} r={hot(id) ? 15 : 10} fill="var(--color-gold)" />
              <circle cx={pt[0]} cy={pt[1]} r={hot(id) ? 6 : 4} fill="var(--color-card)" />
            </g>
          ))}
        </g>

        {showLabel && labelHit ? <Tag x={labelHit.x} y={labelHit.y} text={NAMES[labelHit.id] ?? ""} /> : null}

        {hits.map((hit, index) => {
          const on = activeId === hit.id;
          return (
            <g key={`${hit.id}-${index}`} className={shakeId === hit.id ? "shake" : undefined}>
              {on ? (
                <circle className="pulse" cx={hit.x} cy={hit.y} r="14" fill="none" stroke="var(--color-ink)" strokeWidth="2" />
              ) : null}
              <circle
                cx={hit.x}
                cy={hit.y}
                r="20"
                fill="transparent"
                className="hit"
                role="button"
                tabIndex={0}
                aria-label={NAMES[hit.id]}
                onClick={() => onPick(hit.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onPick(hit.id);
                  }
                }}
              />
              {system === "articulaciones" ? null : (
                <circle cx={hit.x} cy={hit.y} r={on ? 6 : 4} fill="var(--pin)" pointerEvents="none" />
              )}
            </g>
          );
        })}
      </g>
    </svg>
  );
}

function Tag({ x, y, text }: { x: number; y: number; text: string }) {
  const w = Math.max(96, text.length * 12 + 26);
  const rx = Math.max(8, Math.min(392 - w, x < 200 ? x - w - 18 : x + 16));
  const ly = Math.max(8, y - 48);
  return (
    <g className="tag" pointerEvents="none">
      <line x1={x} y1={y} x2={rx + w / 2} y2={ly + 16} stroke="var(--color-ink)" strokeWidth="1.5" />
      <rect x={rx} y={ly} width={w} height="32" rx="16" fill="var(--color-card)" stroke="var(--color-line)" />
      <text x={rx + w / 2} y={ly + 21} textAnchor="middle" fontSize="16" fontFamily="Fredoka, Nunito, sans-serif" fill="var(--color-ink)">
        {text}
      </text>
    </g>
  );
}
