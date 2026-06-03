import type { Service } from '@/data/types'
import { cn } from '@/lib/utils'

interface ServiceCardProps { service: Service; dark?: boolean }

export default function ServiceCard({ service, dark = false }: ServiceCardProps) {
  return (
    <div className={cn('p-6', dark ? 'bg-[#111111]' : 'bg-[#F8F7F4]')}>
      <p className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-[#8A8880] mb-3">{service.number}</p>
      <h3 className={cn('font-cormorant text-xl font-light mb-3', dark ? 'text-[#F8F7F4]' : 'text-[#111111]')}>
        {service.title}
      </h3>
      <p className={cn('font-inter text-sm leading-relaxed', dark ? 'text-[#8A8880]' : 'text-[#2C2C2C]')}>
        {service.description}
      </p>
    </div>
  )
}
