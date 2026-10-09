import { Link } from 'react-router'
import { isExternalLink } from '../lib/links'

const BUTTON_CLASSES =
  'bg-accent mt-4 rounded-full px-8 py-3 text-sm font-semibold text-white hover:opacity-90'

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
    <section className="px-4 pt-16 pb-16 text-center sm:px-8">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4">
        {heading && <h2 className="text-primary text-2xl font-bold sm:text-3xl">{heading}</h2>}
        {body && <p className="text-text">{body}</p>}

        <div className="mt-2 text-text">
          {churchName && <p className="font-semibold">{churchName}</p>}
          {address && <p className="whitespace-pre-line">{address}</p>}
        </div>

        {(bibleStudyTime || worshipServiceTime) && (
          <div className="text-text">
            {bibleStudyTime && <p>Bible Study: {bibleStudyTime}</p>}
            {worshipServiceTime && <p>Worship Service: {worshipServiceTime}</p>}
          </div>
        )}

        {buttonLabel &&
          buttonLink &&
          (isExternalLink(buttonLink) ? (
            <a
              href={buttonLink}
              target="_blank"
              rel="noreferrer"
              className={BUTTON_CLASSES}
            >
              {buttonLabel}
            </a>
          ) : (
            <Link to={buttonLink} className={BUTTON_CLASSES}>
              {buttonLabel}
            </Link>
          ))}
      </div>
    </section>
  )
}

export default PlanVisitCta
