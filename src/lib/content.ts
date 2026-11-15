export const team = [
  "Ayala Puecas Yanela Yunzu",
  "Coronado Falla Marilin Abril",
  "Juarez Morales María Fernanda",
  "Mechato Castillo Danitza Pierina",
  "Vilchez Alvinez Ayelen Abigail",
];

export type Organ = {
  id: string;
  name: string;
  short: string;
  job: string;
  where: string;
  care: string;
  fact: string;
  question: string;
  answer: string;
};

export const organs: Organ[] = [
  {
    id: "cerebro",
    name: "Cerebro",
    short: "El jefe que piensa, recuerda y manda mensajes a todo el cuerpo.",
    job: "Piensa, recuerda los nombres de tus amigos y decide cuando quieres saltar o dibujar.",
    where: "Dentro de la cabeza, bien protegido por el cráneo.",
    care: "Duerme lo suficiente, juega y come frutas de colores.",
    fact: "Pesa más o menos como un pomelo y trabaja incluso cuando sueñas.",
    question: "¿Dónde está el cerebro?",
    answer: "Está en la cabeza, detrás de la frente. El cráneo lo cubre para que un golpe no le llegue directo.",
  },
  {
    id: "corazon",
    name: "Corazón",
    short: "Un músculo que late y manda la sangre de paseo por el cuerpo.",
    job: "Bombea sangre para llevar oxígeno y comida a cada parte de ti.",
    where: "En el pecho, un poquito hacia el lado izquierdo.",
    care: "Corre, baila y respira profundo. El corazón se pone feliz cuando te mueves.",
    fact: "Late cerca de cien mil veces en un solo día.",
    question: "¿Para qué sirve el corazón?",
    answer: "Empuja la sangre para que llegue a las manos, los pies y todo lo demás. Por eso lo sientes latir.",
  },
  {
    id: "pulmones",
    name: "Pulmones",
    short: "Dos esponjas que se llenan de aire cada vez que respiras.",
    job: "Toman el aire limpio y botan el aire que ya usaste.",
    where: "En el pecho, uno a cada lado del corazón.",
    care: "Juega al aire libre y respira por la nariz cuando corres despacio.",
    fact: "Si los abrieras bien grandes, ocuparían mucho espacio, como una sábana grande.",
    question: "¿Qué hacen los pulmones?",
    answer: "Se llenan cuando entra el aire y se vacían un poco cuando lo botas. Así el cuerpo recibe aire nuevo.",
  },
  {
    id: "estomago",
    name: "Estómago",
    short: "Una bolsita fuerte que mezcla la comida con jugos especiales.",
    job: "Revuelve lo que comes para empezar a convertirlo en energía.",
    where: "En la barriga, un poco hacia la izquierda, debajo de las costillas.",
    care: "Come despacio, mastica bien y no llenes la barriga hasta que duela.",
    fact: "Puede estirarse cuando comes mucho, como un globo suave.",
    question: "¿La comida se queda en el estómago para siempre?",
    answer: "No. Ahí se mezcla un rato y después sigue su camino hacia los intestinos.",
  },
  {
    id: "higado",
    name: "Hígado",
    short: "El órgano interno más grande: limpia y guarda energía.",
    job: "Ayuda a digerir las comidas con grasa y limpia cosas que la sangre ya no necesita.",
    where: "En la barriga, hacia el lado derecho, debajo de las costillas.",
    care: "Toma agua y come verduras. El hígado trabaja mejor si no le das comida solo de dulce.",
    fact: "Si se lastima un poquito, puede repararse solo, como un superhéroe de la reparación.",
    question: "¿El hígado es un músculo?",
    answer: "No. Es blando y bastante grande. Ayuda a digerir y también a limpiar la sangre.",
  },
  {
    id: "intestinos",
    name: "Intestinos",
    short: "Un camino largo y enrollado que termina de aprovechar la comida.",
    job: "Absorben lo bueno de los alimentos y preparan lo que el cuerpo va a botar.",
    where: "Enrollados en el centro de la barriga, debajo del estómago.",
    care: "Come frutas, pan integral y verduras para que el camino funcione suave.",
    fact: "Si estiraras el intestino delgado, sería más largo que una persona adulta.",
    question: "¿Por qué la barriga hace ruidos?",
    answer: "Porque la comida y un poco de aire se van moviendo por dentro. No quiere decir que algo esté mal.",
  },
];

export const activities = [
  {
    title: "Señala y nombra",
    time: "10 minutos",
    image: "/activities/partes.png",
    steps: [
      "Un niño se pone de pie y el grupo lo observa con respeto.",
      "La docente dice: cabeza, pecho, barriga.",
      "Cada niño toca esa parte en su propio cuerpo y dice el nombre en voz alta.",
      "Luego relacionan: en la cabeza está el cerebro, en el pecho el corazón y los pulmones.",
    ],
  },
  {
    title: "El corazón late",
    time: "8 minutos",
    image: "/activities/corazon.jpeg",
    steps: [
      "Todos ponen la mano en el pecho y cuentan en silencio hasta diez.",
      "Saltan en el sitio ocho veces, con cuidado.",
      "Vuelven a poner la mano y comentan si el corazón late más rápido.",
      "Cierran respirando lento: inhalar, exhalar.",
    ],
  },
  {
    title: "La comida de viaje",
    time: "12 minutos",
    image: "/activities/comida.jpg",
    steps: [
      "Con una fruta de juguete o una lámina, cuentan el viaje: boca, estómago, intestinos.",
      "Usan palabras simples: masticar, mezclar, aprovechar.",
      "Dibujan el camino con tres círculos de colores.",
      "Pegan el dibujo en el mural “Así viaja mi almuerzo”.",
    ],
  },
  {
    title: "Adivina la parte",
    time: "10 minutos",
    image: "/activities/organo.jpg",
    steps: [
      "Una persona describe un órgano sin decir el nombre: dónde está y qué hace.",
      "El grupo piensa un momento y dice su idea.",
      "Quien quiera puede señalar esa zona en su propio cuerpo.",
      "Después leen juntos la ficha, aunque la respuesta no haya salido a la primera.",
    ],
  },
  {
    title: "Respiramos despacio",
    time: "6 minutos",
    image: "/activities/respiraciones.jpg",
    steps: [
      "Todos se sientan y ponen las manos a los lados del pecho.",
      "Entran aire por la nariz contando hasta tres y lo botan contando hasta tres.",
      "Notan si el pecho sube y baja.",
      "Comentan, con calma, que esos movimientos los hacen los pulmones.",
    ],
  },
  {
    title: "Un vaso de agua",
    time: "8 minutos",
    image: "/activities/agua.jpeg",
    steps: [
      "Cada quien tiene un vaso con un poco de agua.",
      "Antes de beber, recuerdan que los riñones usan el agua para limpiar la sangre.",
      "Beben despacio y dicen en qué parte de la barriga imaginan los riñones.",
      "Cierran nombrando otra parte que también cuida el cuerpo, como el corazón o el cerebro.",
    ],
  },
];

export const faqs = [
  {
    q: "¿Esta página es para niños de Inicial?",
    a: "Sí. Se puede mirar en clase o en casa. Las frases son cortas para leerlas en voz alta si hace falta.",
  },
  {
    q: "¿Sirve junto con la maqueta?",
    a: "Sí. La maqueta se toca con las manos y aquí se puede girar el cuerpo para ver lo mismo desde otro lado.",
  },
  {
    q: "¿Por qué el cuerpo no parece de un libro de medicina?",
    a: "Porque aquí importa reconocer el lugar y el trabajo de cada parte, sin nombres difíciles.",
  },
  {
    q: "¿Qué órganos vamos a ver?",
    a: "Cerebro, corazón, pulmones, estómago, hígado e intestinos, cada uno en su lugar.",
  },
  {
    q: "¿Por dónde empiezo?",
    a: "Entra, abre Explorar y gira el cuerpo. Si quieres más detalle, abre la ficha de esa parte.",
  },
  {
    q: "¿Se puede mirar sin un adulto al lado?",
    a: "Sí. Tocar y girar se puede solo. Si sale una palabra nueva, alguien mayor la puede leer.",
  },
];
// ========== CUERPO COMPLETO ==========
export type SystemId =
  | "piel"
  | "huesos"
  | "musculos"
  | "organos"
  | "articulaciones"
  | "sentidos";

export type BodyPart = {
  id: string;
  system: SystemId;
  name: string;
  blurb: string;
  dato: string;
  image: string;
};

export const SYSTEMS: { id: SystemId; name: string }[] = [
  { id: "piel", name: "Piel" },
  { id: "huesos", name: "Huesos" },
  { id: "musculos", name: "Músculos" },
  { id: "organos", name: "Órganos" },
  { id: "articulaciones", name: "Articulaciones" },
  { id: "sentidos", name: "Sentidos" },
];

export const BODY_PARTS: BodyPart[] = [
  { id: "piel", system: "piel", name: "Piel", blurb: "Cubre todo el cuerpo y siente frío, calor y roce.", dato: "El órgano más grande", image: "/anatomy/skinlayers.png" },
  { id: "craneo", system: "huesos", name: "Cráneo", blurb: "Un casco de huesos que protege el cerebro.", dato: "22 huesos unidos", image: "/anatomy/skeleton.png" },
  { id: "columna", system: "huesos", name: "Columna", blurb: "Te mantiene en pie y deja pasar los nervios.", dato: "33 vértebras", image: "/anatomy/skeleton.png" },
  { id: "costillas", system: "huesos", name: "Costillas", blurb: "Forman una jaula para el corazón y los pulmones.", dato: "12 pares", image: "/anatomy/skeleton.png" },
  { id: "pelvis", system: "huesos", name: "Pelvis", blurb: "Une la columna con las piernas y sostiene el abdomen.", dato: "Hueso de la cadera", image: "/anatomy/skeleton.png" },
  { id: "humero", system: "huesos", name: "Húmero", blurb: "El hueso largo del brazo, del hombro al codo.", dato: "Uno en cada brazo", image: "/anatomy/skeleton.png" },
  { id: "femur", system: "huesos", name: "Fémur", blurb: "El hueso más largo y fuerte. Está en el muslo.", dato: "El más largo", image: "/anatomy/skeleton.png" },
  { id: "deltoides", system: "musculos", name: "Deltoides", blurb: "Levanta el brazo hacia arriba y hacia el lado.", dato: "En el hombro", image: "/anatomy/muscles.png" },
  { id: "biceps", system: "musculos", name: "Bíceps", blurb: "Se acorta y dobla el codo cuando levantas algo.", dato: "Dobla el brazo", image: "/anatomy/muscles.png" },
  { id: "abdominales", system: "musculos", name: "Abdominales", blurb: "Sostienen el centro del cuerpo y ayudan a girar.", dato: "Protegen por dentro", image: "/anatomy/muscles.png" },
  { id: "cuadriceps", system: "musculos", name: "Cuádriceps", blurb: "Estira la rodilla para caminar, saltar y patear.", dato: "4 músculos", image: "/anatomy/muscles.png" },
  { id: "cerebro", system: "organos", name: "Cerebro", blurb: "Piensa, recuerda y manda cada movimiento.", dato: "Centro de mando", image: "/anatomy/brain.png" },
  { id: "corazon", system: "organos", name: "Corazón", blurb: "Un músculo que empuja la sangre sin parar.", dato: "Como tu puño", image: "/anatomy/heart.png" },
  { id: "pulmones", system: "organos", name: "Pulmones", blurb: "Llenan el cuerpo de aire y sueltan lo que sobra.", dato: "Son dos", image: "/anatomy/lungs.png" },
  { id: "higado", system: "organos", name: "Hígado", blurb: "Limpia la sangre y guarda energía de la comida.", dato: "Órgano interno grande", image: "/anatomy/digest.png" },
  { id: "estomago", system: "organos", name: "Estómago", blurb: "Mezcla la comida con jugos y la va ablandando.", dato: "Como una bolsa", image: "/anatomy/digest.png" },
  { id: "intestinos", system: "organos", name: "Intestinos", blurb: "Toman lo útil de la comida y dejan pasar el resto.", dato: "Varios metros", image: "/anatomy/digest.png" },
  { id: "hombro", system: "articulaciones", name: "Hombro", blurb: "Muy móvil: el brazo puede girar en círculo.", dato: "Bola y cavidad", image: "/anatomy/skeleton.png" },
  { id: "codo", system: "articulaciones", name: "Codo", blurb: "Dobla y estira el brazo.", dato: "Como una bisagra", image: "/anatomy/skeleton.png" },
  { id: "cadera", system: "articulaciones", name: "Cadera", blurb: "Une el fémur con la pelvis y aguanta el peso.", dato: "Fuerte y estable", image: "/anatomy/skeleton.png" },
  { id: "rodilla", system: "articulaciones", name: "Rodilla", blurb: "Dobla la pierna. La rótula la protege por delante.", dato: "Bisagra con rótula", image: "/anatomy/knee.png" },
  { id: "tobillo", system: "articulaciones", name: "Tobillo", blurb: "Mueve el pie para caminar y guardar el equilibrio.", dato: "Une pierna y pie", image: "/anatomy/skeleton.png" },
  { id: "vista", system: "sentidos", name: "Vista", blurb: "Los ojos captan la luz y el cerebro arma la imagen.", dato: "Ojos", image: "/anatomy/eye.png" },
  { id: "oido", system: "sentidos", name: "Oído", blurb: "Recoge el sonido y también ayuda a no caerte.", dato: "Oír y equilibrar", image: "/anatomy/ear.png" },
  { id: "olfato", system: "sentidos", name: "Olfato", blurb: "La nariz avisa si algo huele rico, raro o peligroso.", dato: "Nariz", image: "/anatomy/nose.svg" },
  { id: "gusto", system: "sentidos", name: "Gusto", blurb: "La lengua prueba dulce, salado, ácido y amargo.", dato: "Miles de papilas", image: "/anatomy/tongue.svg" },
  { id: "tacto", system: "sentidos", name: "Tacto", blurb: "La piel nota textura, calor, frío y presión.", dato: "En todo el cuerpo", image: "/anatomy/skinlayers.png" },
];

export function partsOf(system: SystemId) {
  return BODY_PARTS.filter((p) => p.system === system);
}