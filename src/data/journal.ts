import type { JournalPost } from './types'

const UNSPLASH = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`

export const journalPosts: JournalPost[] = [
  {
    id: '1',
    slug: 'la-luz-como-primer-material',
    title: 'La luz como primer material',
    category: 'Reflexión',
    date: '2024-11-15',
    excerpt: 'Antes de elegir la piedra o la madera, antes de trazar el primer plano, existe una decisión que lo condiciona todo: ¿de dónde viene la luz?',
    coverImage: UNSPLASH('1484154218962-a197022b5858'),
    content: `Antes de elegir la piedra o la madera, antes de trazar el primer plano, existe una decisión que lo condiciona todo: ¿de dónde viene la luz?

En Tomo Studio llevamos años pensando la luz no como consecuencia del proyecto sino como su primera materia prima. Una estancia con luz norte tiene una temperatura diferente a una con luz sur. Una cocina que recibe la luz de la tarde tiene otro ritmo que una que la recibe por la mañana.

Cuando visitamos un solar por primera vez, antes de medir, hacemos algo simple: miramos el cielo. La dirección, la altura del sol en cada estación, los obstáculos, las reflexiones posibles. Ese primer análisis determina las decisiones posteriores con más fuerza que cualquier condicionante normativo.

La luz no es un recurso decorativo. Es el material con el que trabajamos cuando todavía no hemos puesto ningún ladrillo.`,
  },
  {
    id: '2',
    slug: 'travertino-cal-madera-paleta-serena',
    title: 'Travertino, cal y madera: una paleta serena',
    category: 'Materiales',
    date: '2024-09-03',
    excerpt: 'Tres materiales que el tiempo trata bien, que envejecen con gracia y que juntos crean una atmósfera difícil de fabricar con sintéticos.',
    coverImage: UNSPLASH('1600566753190-17f0baa2a6c3'),
    content: `Hay combinaciones de materiales que son atemporales no por convención sino por física: sus texturas se complementan, sus temperaturas se equilibran, sus patinas convergen hacia la misma gama.

Travertino, cal y madera es una de esas combinaciones. El travertino aporta peso y patrón; la cal, uniformidad y reflexión de la luz; la madera, calidez y escala humana. Los tres envejecen bien y el paso del tiempo los hace más coherentes, no menos.

**Por qué funciona esta combinación**

En nuestros proyectos hemos usado esta combinación en contextos muy distintos: en una vivienda madrileña, en una reforma sevillana, en un apartamento costero. En todos los casos, la reacción de los clientes al cabo de un año es la misma: se sienten más a gusto que el primer día. No es nostalgia. Es que los materiales se han integrado en su vida.

La paleta serena no es una tendencia estética. Es una consecuencia de elegir bien los materiales desde el principio.`,
  },
  {
    id: '3',
    slug: 'como-documentamos-una-reforma-integral',
    title: 'Cómo documentamos una reforma integral',
    category: 'Proceso',
    date: '2024-06-20',
    excerpt: 'El antes y el después es la forma más fácil de contar una reforma. También es la más pobre. Hay una manera mejor de documentar el proceso.',
    coverImage: UNSPLASH('1600596542815-ffad4c1539a9'),
    content: `El antes y el después es la narrativa más usada para comunicar una reforma. También es la más limitada: elimina todo el proceso, toda la decisión, todo el conflicto resuelto.

En Tomo Studio documentamos las reformas en tres fases que consideramos igual de importantes.

**El estado previo**

No es solo un registro fotográfico. Es un análisis: qué hay que conservar, qué hay que eliminar y por qué. En la reforma Arco, el descubrimiento de los arcos bajo la escayola no fue un accidente: fue el resultado de una investigación previa sobre la historia del edificio.

**El proceso de obra**

Nos interesa especialmente. Las decisiones que se toman en obra, los cambios de última hora, los problemas que obligan a improvisar.

**El resultado final**

Se fotografía siempre con luz natural y sin muebles de atrezzo. Lo que ves es el espacio tal como será habitado, no una puesta en escena para una revista.`,
  },
  {
    id: '4',
    slug: 'la-importancia-del-umbral-en-una-vivienda',
    title: 'La importancia del umbral en una vivienda',
    category: 'Reflexión',
    date: '2024-04-08',
    excerpt: 'El umbral es la pieza más olvidada de la arquitectura doméstica contemporánea. Y es la que más condiciona cómo vivimos.',
    coverImage: UNSPLASH('1504307651254-35680f356dfd'),
    content: `El umbral es la transición entre dos estados: el interior y el exterior, lo privado y lo público, el trabajo y el descanso. En la arquitectura doméstica contemporánea, el umbral ha desaparecido.

Las viviendas modernas abren la puerta directamente al salón, sin pausa, sin transición. Esto tiene consecuencias psicológicas que raramente se mencionan. Sin umbral, la calle entra en casa. Sin transición, el cuerpo no tiene tiempo de cambiar de registro.

**El umbral en el proyecto Arco**

En el proyecto Arco, trabajamos explícitamente con los umbrales: los tres arcos preexistentes se convirtieron en transiciones ritualizadas entre estancias. Cruzar un arco es distinto a cruzar una puerta: el arco no tiene hoja, no tiene bisagra, no bloquea. Pero su presencia cambia el estado del que lo atraviesa.

Pensamos que recuperar el umbral en sus múltiples formas es una de las contribuciones más importantes que puede hacer la arquitectura doméstica a la calidad de vida.`,
  },
]

export const getPostBySlug = (slug: string) => journalPosts.find(p => p.slug === slug)
