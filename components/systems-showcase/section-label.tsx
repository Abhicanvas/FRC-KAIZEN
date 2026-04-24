import { cn } from '@/lib/utils'

type SectionLabelProps = {
  isMobile: boolean
}

export function SectionLabel({ isMobile }: SectionLabelProps) {
  return (
    <div className={cn('z-30', isMobile ? 'relative mb-10' : 'absolute left-8 top-8')}>
      <p className="text-xs uppercase tracking-[0.3em] text-red-600">Engineering Systems</p>
      <div className="mt-2 h-px w-12 bg-red-600" />
    </div>
  )
}
