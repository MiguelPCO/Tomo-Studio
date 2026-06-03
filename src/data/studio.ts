import type { StudioData, ProcessStep } from './types'

const UNSPLASH = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`

export const studio: StudioData = {
  name: 'Tomo Studio',
  tagline: 'Cada proyecto merece su propio volumen.',
  founded: 2018,
  city: 'Madrid',
  email: 'hola@tomostudio.es',
  phone: '+34 91 123 45 67',
  address: 'Calle del Pez 21, 2º izq. 28004 Madrid',
  philosophy: 'Hacemos arquitectura desde la escucha. Cada proyecto comienza con una conversación larga, muchas visitas al lugar y un período de silencio en el que dejamos que el problema se sedimente. La forma llega cuando el programa, el lugar y el cliente son ya inseparables.',
  team: [
    {
      name: 'Carmen Vidal',
      role: 'Arquitecta fundadora',
      bio: 'Arquitecta por la ETSAM y máster en Patrimonio por la Universidad de Venecia. Antes de fundar Tomo Studio trabajó seis años en Portugal con Eduardo Souto de Moura. Le interesan los proyectos donde la preexistencia y lo nuevo se tratan con el mismo respeto.',
    },
    {
      name: 'Pablo Ortega',
      role: 'Arquitecto asociado',
      bio: 'Arquitecto por la ETSAB y máster en Paisajismo. Ha colaborado con estudios en Rotterdam y Copenhague. En Tomo Studio dirige los proyectos de mayor escala y los trabajos de exterior. Cree que el paisaje es el interior que más descuidamos.',
    },
  ],
}

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Escucha',
    description: 'El primer mes no dibujamos. Escuchamos. Visitamos el lugar varias veces, a distintas horas y estaciones. Hablamos con el cliente sobre su vida, no sobre su vivienda. El programa emerge de esa conversación, no de un cuestionario.',
    imageUrl: UNSPLASH('1484154218962-a197022b5858'),
  },
  {
    number: '02',
    title: 'Concepto',
    description: 'Un concepto es una frase. No una imagen, no un estilo: una frase que resume lo que el proyecto quiere ser. Sin esa frase, el proyecto pierde el norte en los momentos difíciles.',
    imageUrl: UNSPLASH('1600566753190-17f0baa2a6c3'),
  },
  {
    number: '03',
    title: 'Materia',
    description: 'Los materiales se eligen antes de dibujar los planos definitivos. La materialidad no es un acabado: es una decisión estructural que condiciona la forma, la luz y el presupuesto.',
    imageUrl: UNSPLASH('1600585154340-be6161a56a0c'),
  },
  {
    number: '04',
    title: 'Proyecto',
    description: 'El proyecto de ejecución es la última etapa antes de la obra. Los detalles constructivos no son trámite: son el lugar donde la arquitectura se decide.',
    imageUrl: UNSPLASH('1512917774080-9991f1c4c750'),
  },
  {
    number: '05',
    title: 'Obra',
    description: 'La obra es el momento de la verdad. Visitamos la obra tres veces por semana, mínimo. Las sorpresas de la obra son información sobre el edificio que no había llegado al proyecto.',
    imageUrl: UNSPLASH('1558618666-fcd25c85cd64'),
  },
  {
    number: '06',
    title: 'Entrega',
    description: 'La entrega no es el final del proyecto sino el inicio de su vida. Visitamos el espacio a los seis meses y al año de la entrega. Esas visitas alimentan el siguiente proyecto.',
    imageUrl: UNSPLASH('1600596542815-ffad4c1539a9'),
  },
]
