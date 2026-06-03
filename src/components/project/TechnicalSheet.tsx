import type { TechnicalData, ProjectStatus } from '@/data/types'

const STATUS_LABELS: Record<ProjectStatus, string> = {
  construido: 'Construido',
  'en-proceso': 'En proceso',
  concepto: 'Concepto',
}

interface TechnicalSheetProps { data: TechnicalData }

export default function TechnicalSheet({ data }: TechnicalSheetProps) {
  const rows: { label: string; value: string | undefined }[] = [
    { label: 'Cliente', value: data.client },
    { label: 'Localización', value: data.location },
    { label: 'Año', value: String(data.year) },
    { label: 'Superficie', value: data.surface },
    { label: 'Estado', value: STATUS_LABELS[data.status] },
    { label: 'Equipo', value: data.team?.join(', ') },
    { label: 'Fotografía', value: data.photography },
    { label: 'Colaboradores', value: data.collaborators?.join(', ') },
  ].filter((r): r is { label: string; value: string } => Boolean(r.value))

  return (
    <dl className="border border-[#E5E3DF] rounded-sm overflow-hidden">
      {rows.map((row, i) => (
        <div key={row.label} className={`flex gap-6 px-5 py-3 ${i % 2 === 0 ? 'bg-[#F8F7F4]' : 'bg-[#E5E3DF]/30'}`}>
          <dt className="font-mono-arch text-[0.6rem] tracking-[0.12em] text-[#8A8880] uppercase w-28 flex-shrink-0">
            {row.label}
          </dt>
          <dd className="font-inter text-sm text-[#2C2C2C]">{row.value}</dd>
        </div>
      ))}
    </dl>
  )
}
