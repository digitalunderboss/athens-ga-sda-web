import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { getImNewPage } from '../lib/content'
import type { ImNewPage as ImNewPageData } from '../lib/types'
import { isExternalLink } from '../lib/links'
import Hero from '../components/Hero'
import TextBanner from '../components/TextBanner'
import SaturdaySchedule from '../components/SaturdaySchedule'
import SectionIntro from '../components/SectionIntro'
import OptionCards from '../components/OptionCards'
import Faq from '../components/Faq'
import PlanVisitCta from '../components/PlanVisitCta'

const CTA_BUTTON_CLASSES =
  'bg-accent rounded-full px-8 py-3 text-sm font-semibold text-white hover:opacity-90'

function ImNew() {
  const [page, setPage] = useState<ImNewPageData | null>(null)
  const { hash } = useLocation()

  useEffect(() => {
    getImNewPage().then(setPage)
  }, [])

  useEffect(() => {
    if (!page || !hash) return
    const target = document.getElementById(hash.slice(1))
    if (!target) return
    const headerHeight = document.querySelector('header')?.getBoundingClientRect().height ?? 0
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16
    window.scrollTo({ top, behavior: 'smooth' })
  }, [page, hash])

  if (!page) return null

  return (
    <>
      <Hero slides={page.heroSlides} />

      <TextBanner statement={page.expectStatement} paragraphs={page.expectParagraphs} />

      <SaturdaySchedule
        eyebrow={page.saturdayEyebrow}
        bibleStudyHeading={page.bibleStudyHeading}
        bibleStudyBody={page.bibleStudyBody}
        worshipHeading={page.worshipHeading}
        worshipIntro={page.worshipIntro}
        worshipBullets={page.worshipBullets}
        sermonSeriesLabel={page.sermonSeriesLabel}
        sermonSeriesText={page.sermonSeriesText}
        worshipOutro={page.worshipOutro}
      />

      {page.finalCtaButtonLabel && page.finalCtaButtonLink && (
        <div className="flex justify-center px-4 pt-16 sm:px-8">
          {isExternalLink(page.finalCtaButtonLink) ? (
            <a
              href={page.finalCtaButtonLink}
              target="_blank"
              rel="noreferrer"
              className={CTA_BUTTON_CLASSES}
            >
              {page.finalCtaButtonLabel}
            </a>
          ) : (
            <Link to={page.finalCtaButtonLink} className={CTA_BUTTON_CLASSES}>
              {page.finalCtaButtonLabel}
            </Link>
          )}
        </div>
      )}

      <SectionIntro
        eyebrow={page.nextStepEyebrow}
        heading={page.nextStepHeading}
        paragraphs={page.nextStepParagraphs}
      />

      <OptionCards heading={page.pathwayHeading} options={page.pathwayCards} columns={3} />

      <Faq heading={page.faqHeading} items={page.faqItems} />

      <PlanVisitCta
        heading={page.finalCtaHeading}
        body={page.finalCtaBody}
        churchName={page.churchName}
        address={page.address}
        bibleStudyTime={page.bibleStudyTime}
        worshipServiceTime={page.worshipServiceTime}
        buttonLabel={page.finalCtaButtonLabel}
        buttonLink={page.finalCtaButtonLink}
      />
    </>
  )
}

export default ImNew
