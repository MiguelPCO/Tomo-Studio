import type { Service } from './types'

export const services: Service[] = [
  {
    id: '1', number: '01',
    title: 'Proyecto de arquitectura',
    description: 'Diseño completo de viviendas, edificios y espacios de obra nueva. Desde el primer esquema hasta la dirección de obra.',
    deliverables: ['Anteproyecto', 'Proyecto básico', 'Proyecto de ejecución', 'Dirección de obra', 'Certificado final de obra'],
  },
  {
    id: '2', number: '02',
    title: 'Reforma integral',
    description: 'Intervención en edificios existentes con respeto por la preexistencia y claridad en las decisiones nuevas.',
    deliverables: ['Levantamiento del estado actual', 'Proyecto de reforma', 'Gestión de licencias', 'Coordinación de industriales'],
  },
  {
    id: '3', number: '03',
    title: 'Interiorismo',
    description: 'Diseño de interiores donde los materiales, la luz y el mobiliario forman un todo coherente.',
    deliverables: ['Diseño de espacios', 'Selección de materiales', 'Muebles a medida', 'Coordinación de instalaciones'],
  },
  {
    id: '4', number: '04',
    title: 'Espacios comerciales',
    description: 'Locales, oficinas y espacios de trabajo que comunican la identidad del negocio con precisión.',
    deliverables: ['Concepto de marca espacial', 'Proyecto ejecutivo', 'Coordinación de obra'],
  },
  {
    id: '5', number: '05',
    title: 'Arquitectura cultural',
    description: 'Equipamientos públicos y culturales donde el programa y el paisaje se convierten en argumento.',
    deliverables: ['Concursos', 'Anteproyecto', 'Proyecto completo', 'Colaboración con ingeniería'],
  },
  {
    id: '6', number: '06',
    title: 'Consultoría de materiales',
    description: 'Asesoramiento en la selección de materiales para proyectos propios o de terceros. La paleta como primera decisión de proyecto.',
    deliverables: ['Análisis de viabilidad', 'Propuesta de paleta', 'Fichas técnicas', 'Contacto con proveedores'],
  },
  {
    id: '7', number: '07',
    title: 'Documentación de obra',
    description: 'Registro fotográfico, textual y gráfico del proceso de construcción para archivo o publicación.',
    deliverables: ['Reportaje fotográfico', 'Textos de proyecto', 'Plantas y secciones para publicación'],
  },
]
