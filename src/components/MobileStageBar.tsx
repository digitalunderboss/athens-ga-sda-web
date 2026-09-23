import { useEffect, useState } from 'react'

const STAGES = [
  { eyebrow: 'Local', label: 'Athens, Georgia' },
  { eyebrow: 'Conference', label: 'Georgia-Cumberland Conference' },
  { eyebrow: 'Worldwide Church', label: 'A Global Movement' },
]

interface MobileStageBarProps {
  activeStage: number
}

function Dot({ reached }: { reached: boolean }) {
  return (
    <span
      className={`h-2.5 w-2.5 shrink-0 rounded-full transition-colors duration-500 ${
        reached ? 'bg-accent' : 'bg-secondary'
      }`}
    />
  )
}

function Connector({ filled }: { filled: boolean }) {
  return (
    <span
      className={`h-0.5 flex-1 transition-colors duration-500 ${
        filled ? 'bg-accent' : 'bg-secondary'
      }`}
    />
  )
}

function MobileStageBar({ activeStage }: MobileStageBarProps) {
  const [headerHeight, setHeaderHeight] = useState(0)

  useEffect(() => {
    const updateHeight = () => {
      const header = document.querySelector('header')
      setHeaderHeight(header?.getBoundingClientRect().height ?? 0)
    }
    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [])

  const stage = STAGES[activeStage]

  return (
    <div
      className="bg-background border-secondary sticky z-20 -mx-4 border-b px-4 py-3 sm:-mx-8 sm:px-8 lg:hidden"
      style={{ top: headerHeight }}
    >
      <div className="mx-auto flex max-w-xs flex-col items-center gap-2">
        <div className="flex w-full items-center">
          <Dot reached={activeStage >= 0} />
          <Connector filled={activeStage >= 1} />
          <Dot reached={activeStage >= 1} />
          <Connector filled={activeStage >= 2} />
          <Dot reached={activeStage >= 2} />
        </div>
        <div className="text-center">
          <p className="text-accent text-xs font-semibold tracking-wide uppercase">
            {stage.eyebrow}
          </p>
          <p className="text-primary text-sm font-bold">{stage.label}</p>
        </div>
      </div>
    </div>
  )
}

export default MobileStageBar
