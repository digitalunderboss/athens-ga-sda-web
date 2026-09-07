import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'
import { Link } from 'react-router'
import { getAboutPage } from '../lib/content'
import type { AboutPage as AboutPageData } from '../lib/types'
import { urlFor } from '../lib/image'
import { isExternalLink } from '../lib/links'
import ScrollSpotlightImage from '../components/ScrollSpotlightImage'

function About() {
  const [page, setPage] = useState<AboutPageData | null>(null)
  const [activeStage, setActiveStage] = useState(0)
  const localRef = useRef<HTMLDivElement>(null)
  const conferenceRef = useRef<HTMLDivElement>(null)
  const worldwideRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    getAboutPage().then(setPage)
  }, [])

  useEffect(() => {
    if (!page) return

    const sections: [RefObject<HTMLDivElement | null>, number][] = [
      [localRef, 0],
      [conferenceRef, 1],
      [worldwideRef, 2],
    ]

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const match = sections.find(([ref]) => ref.current === entry.target)
          if (match) setActiveStage(match[1])
        }
      },
      { rootMargin: '-40% 0px -40% 0px' },
    )

    sections.forEach(([ref]) => {
      if (ref.current) observer.observe(ref.current)
    })

    return () => observer.disconnect()
  }, [page])

  if (!page) return null

  const ctaClasses = 'bg-accent rounded-full px-8 py-3 text-sm font-semibold text-white hover:opacity-90'
  const outlineCtaClasses =
    'border-primary text-primary self-start rounded-full border px-6 py-3 text-sm font-semibold hover:bg-primary hover:text-white'

  return (
    <>
      <section className="mx-auto max-w-3xl px-4 pt-16 pb-8 text-center sm:px-8">
        {page.heroHeadline && (
          <h1 className="text-primary text-3xl font-bold sm:text-5xl">{page.heroHeadline}</h1>
        )}
        {page.heroSubheadline && <p className="text-text mt-4">{page.heroSubheadline}</p>}
        {page.heroTagline && (
          <p className="text-accent mt-6 text-sm font-semibold tracking-wide uppercase">
            {page.heroTagline}
          </p>
        )}
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[280px_1fr] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ScrollSpotlightImage image={page.scrollVisual} activeStage={activeStage} />
          </div>

          <div className="flex flex-col gap-20">
            <div ref={localRef} className="flex flex-col gap-10">
              {page.localIntroHeading && (
                <h2 className="text-primary text-2xl font-bold sm:text-3xl">
                  {page.localIntroHeading}
                </h2>
              )}
              {page.localIntroBody && <p className="text-text">{page.localIntroBody}</p>}

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:items-start">
                {page.pastorPhoto && (
                  <img
                    src={urlFor(page.pastorPhoto).width(800).url()}
                    alt={page.pastorName ?? ''}
                    className="w-full rounded-2xl object-cover"
                  />
                )}
                <div>
                  {page.pastorHeading && (
                    <p className="text-accent text-sm font-semibold tracking-wide uppercase">
                      {page.pastorHeading}
                    </p>
                  )}
                  {page.pastorName && (
                    <h3 className="text-primary mt-1 text-2xl font-bold">{page.pastorName}</h3>
                  )}
                  <div className="text-text mt-4 flex flex-col gap-4">
                    {page.pastorBio.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>

              {page.pullQuote && (
                <blockquote className="text-primary border-accent border-l-4 pl-6 text-xl font-semibold italic sm:text-2xl">
                  {page.pullQuote}
                </blockquote>
              )}

              {(page.localCtaHeading || page.localCtaBody) && (
                <div className="bg-secondary/30 rounded-2xl p-6 text-center sm:p-8">
                  {page.localCtaHeading && (
                    <h3 className="text-primary text-xl font-bold">{page.localCtaHeading}</h3>
                  )}
                  {page.localCtaBody && <p className="text-text mt-2">{page.localCtaBody}</p>}
                  {page.localCtaButtonLabel && page.localCtaButtonLink && (
                    <Link to={page.localCtaButtonLink} className={`${ctaClasses} mt-4 inline-block`}>
                      {page.localCtaButtonLabel}
                    </Link>
                  )}
                </div>
              )}
            </div>

            <div ref={conferenceRef} className="flex flex-col gap-8">
              {page.conferenceHeadline && (
                <h2 className="text-primary text-2xl font-bold sm:text-3xl">
                  {page.conferenceHeadline}
                </h2>
              )}
              {page.conferenceIntro && <p className="text-text">{page.conferenceIntro}</p>}

              {(page.conferenceChurchCount || page.conferenceMemberCount) && (
                <div className="border-secondary flex flex-col items-center gap-2 rounded-2xl border p-6 text-center sm:flex-row sm:justify-center sm:gap-6">
                  <span className="text-primary font-semibold">Athens, GA</span>
                  <span aria-hidden="true" className="text-accent">
                    →
                  </span>
                  <span className="text-primary font-semibold">Georgia-Cumberland Conference</span>
                  <span aria-hidden="true" className="text-accent">
                    →
                  </span>
                  <span className="text-primary font-semibold">
                    {[page.conferenceChurchCount, page.conferenceMemberCount]
                      .filter(Boolean)
                      .join(' • ')}
                  </span>
                </div>
              )}

              {page.missionHeading && (
                <h3 className="text-primary text-xl font-bold">{page.missionHeading}</h3>
              )}
              {page.missionBody && <p className="text-text">{page.missionBody}</p>}

              {page.leaders.length > 0 && (
                <div>
                  {page.leadershipHeading && (
                    <h3 className="text-primary text-lg font-semibold">
                      {page.leadershipHeading}
                    </h3>
                  )}
                  <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {page.leaders.map((leader) => (
                      <div
                        key={leader._key}
                        className="border-secondary rounded-xl border p-4 text-center"
                      >
                        <p className="text-primary font-semibold">{leader.name}</p>
                        <p className="text-text text-sm">{leader.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {page.conferenceCtaLabel &&
                page.conferenceCtaLink &&
                (isExternalLink(page.conferenceCtaLink) ? (
                  <a
                    href={page.conferenceCtaLink}
                    target="_blank"
                    rel="noreferrer"
                    className={outlineCtaClasses}
                  >
                    {page.conferenceCtaLabel}
                  </a>
                ) : (
                  <Link to={page.conferenceCtaLink} className={outlineCtaClasses}>
                    {page.conferenceCtaLabel}
                  </Link>
                ))}
            </div>

            <div ref={worldwideRef} className="flex flex-col gap-8">
              {page.worldwideTransition && (
                <p className="text-accent text-center text-sm font-semibold tracking-wide uppercase">
                  {page.worldwideTransition}
                </p>
              )}
              {page.worldwideHeadline && (
                <h2 className="text-primary text-2xl font-bold sm:text-3xl">
                  {page.worldwideHeadline}
                </h2>
              )}
              {page.worldwideIntro && <p className="text-text">{page.worldwideIntro}</p>}

              {page.angels.length > 0 && (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  {page.angels.map((angel) => (
                    <div
                      key={angel._key}
                      className="border-secondary flex flex-col gap-2 rounded-2xl border p-6"
                    >
                      <span className="text-accent text-sm font-bold">{angel.number}</span>
                      <h3 className="text-primary text-lg font-semibold">{angel.heading}</h3>
                      {angel.quote && <p className="text-text text-sm italic">{angel.quote}</p>}
                      {angel.description && <p className="text-text text-sm">{angel.description}</p>}
                    </div>
                  ))}
                </div>
              )}

              {page.connectingStatement && (
                <p className="text-primary text-xl font-semibold">{page.connectingStatement}</p>
              )}
              {page.connectingBody && <p className="text-text">{page.connectingBody}</p>}
            </div>
          </div>
        </div>
      </section>

      {page.stats.length > 0 && (
        <section className="bg-primary px-4 py-16 sm:px-8">
          {page.statsHeading && (
            <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">
              {page.statsHeading}
            </h2>
          )}
          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-8 text-center sm:grid-cols-3">
            {page.stats.map((stat) => (
              <div key={stat._key}>
                <p className="text-accent text-3xl font-bold sm:text-4xl">{stat.number}</p>
                <p className="mt-1 text-sm text-white/90">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-3xl px-4 pt-16 text-center sm:px-8">
        {page.globalFamilyHeading && (
          <h2 className="text-primary text-2xl font-bold sm:text-3xl">
            {page.globalFamilyHeading}
          </h2>
        )}
        <div className="text-text mt-6 flex flex-col gap-4">
          {page.globalFamilyParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="bg-primary mt-16 px-4 py-16 text-center text-white sm:px-8">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4">
          {page.beliefsHeading && (
            <h2 className="text-3xl font-bold sm:text-4xl">{page.beliefsHeading}</h2>
          )}
          {page.beliefsBody && <p className="text-white/90">{page.beliefsBody}</p>}
          {(page.beliefsCardHeading || page.beliefsCardBody) && (
            <div className="mt-4 rounded-2xl bg-white/10 p-6">
              {page.beliefsCardHeading && (
                <p className="text-xl font-semibold">{page.beliefsCardHeading}</p>
              )}
              {page.beliefsCardBody && <p className="mt-2 text-white/90">{page.beliefsCardBody}</p>}
            </div>
          )}
          {page.beliefsButtonLabel && page.beliefsButtonLink && (
            <a
              href={page.beliefsButtonLink}
              target="_blank"
              rel="noreferrer"
              className={`${ctaClasses} mt-4`}
            >
              {page.beliefsButtonLabel}
            </a>
          )}
        </div>
      </section>
    </>
  )
}

export default About
