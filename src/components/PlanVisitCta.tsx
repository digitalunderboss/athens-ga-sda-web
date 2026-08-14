import { Link } from 'react-router'

interface PlanVisitCtaProps {
  heading?: string
  body?: string
  churchName?: string
  address?: string
  bibleStudyTime?: string
  worshipServiceTime?: string
  buttonLabel?: string
  buttonLink?: string
}

function PlanVisitCta({
  heading,
  body,
  churchName,
  address,
  bibleStudyTime,
  worshipServiceTime,
  buttonLabel,
  buttonLink,
}: PlanVisitCtaProps) {
  return (
    <section className="bg-primary px-4 py-16 text-center text-white sm:px-8">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4">
        {heading && <h2 className="text-2xl font-bold sm:text-3xl">{heading}</h2>}
        {body && <p className="text-white/90">{body}</p>}

        <div className="mt-2 text-white/90">
          {churchName && <p className="font-semibold">{churchName}</p>}
          {address && <p className="whitespace-pre-line">{address}</p>}
        </div>

        {(bibleStudyTime || worshipServiceTime) && (
          <div className="text-white/90">
            {bibleStudyTime && <p>Bible Study: {bibleStudyTime}</p>}
            {worshipServiceTime && <p>Worship Service: {worshipServiceTime}</p>}
          </div>
        )}

        {buttonLabel && buttonLink && (
          <Link
            to={buttonLink}
            className="bg-accent mt-4 rounded-full px-8 py-3 text-sm font-semibold text-white hover:opacity-90"
          >
            {buttonLabel}
          </Link>
        )}
      </div>
    </section>
  )
}

export default PlanVisitCta
