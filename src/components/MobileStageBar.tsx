import { useEffect, useState } from 'react'
import type { RefObject } from 'react'

const STAGES = [
  { eyebrow: 'Local', label: 'Athens, Georgia' },
  { eyebrow: 'Conference', label: 'Georgia-Cumberland Conference' },
  { eyebrow: 'Worldwide Church', label: 'A Global Movement' },
]

// Fraction of the way along the bar at which each stage's dot sits.
const DOT_POSITIONS = [0, 0.5, 1]

// Viewport height fraction where a section counts as reached. Matches the
// band About.tsx uses to pick the active stage, so the fill and the label agree.
const REFERENCE_LINE = 0.6

interface MobileStageBarProps {
  activeStage: number
  localRef: RefObject<HTMLDivElement | null>
  conferenceRef: RefObject<HTMLDivElement | null>
  worldwideRef: RefObject<HTMLDivElement | null>
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value))
}

function Dot({ reached }: { reached: boolean }) {
  return (
    <span
      className={`relative z-10 h-2.5 w-2.5 shrink-0 rounded-full transition-colors duration-300 ${
        reached ? 'bg-accent' : 'bg-secondary'
      }`}
    />
  )
}

function MobileStageBar({
  activeStage,
  localRef,
  conferenceRef,
  worldwideRef,
}: MobileStageBarProps) {
  const [headerHeight, setHeaderHeight] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateHeight = () => {
      const header = document.querySelector('header')
      setHeaderHeight(header?.getBoundingClientRect().height ?? 0)
    }
    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [])

  useEffect(() => {
    let frame = 0

    const updateProgress = () => {
      frame = 0
      const local = localRef.current?.getBoundingClientRect().top
      const conference = conferenceRef.current?.getBoundingClientRect().top
      const worldwide = worldwideRef.current?.getBoundingClientRect().top
      if (local === undefined || conference === undefined || worldwide === undefined) return

      const line = window.innerHeight * REFERENCE_LINE
      setProgress(
        0.5 * clamp01((line - local) / (conference - local)) +
          0.5 * clamp01((line - conference) / (worldwide - conference)),
      )
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateProgress)
    }

    updateProgress()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [localRef, conferenceRef, worldwideRef])

  const stage = STAGES[activeStage]

  return (
    <div
      className="bg-background border-secondary sticky z-20 border-b px-4 py-3 sm:px-8 lg:hidden"
      style={{ top: headerHeight }}
    >
      <div className="mx-auto flex max-w-xs flex-col items-center gap-2">
        <div className="relative flex w-full items-center justify-between">
          <span className="bg-secondary absolute inset-x-1.5 top-1/2 h-0.5 -translate-y-1/2">
            <span
              className="bg-accent absolute inset-y-0 left-0"
              style={{ width: `${progress * 100}%` }}
            />
          </span>
          {DOT_POSITIONS.map((position) => (
            <Dot key={position} reached={progress >= position - 0.001} />
          ))}
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
