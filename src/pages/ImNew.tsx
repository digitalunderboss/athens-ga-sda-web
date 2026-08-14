import { useEffect, useState } from 'react'
import { getImNewPage } from '../lib/content'
import type { ImNewPage as ImNewPageData } from '../lib/types'
import Hero from '../components/Hero'
import TextBanner from '../components/TextBanner'
import SaturdaySchedule from '../components/SaturdaySchedule'
import SectionIntro from '../components/SectionIntro'
import OptionCards from '../components/OptionCards'
import Faq from '../components/Faq'
import PlanVisitCta from '../components/PlanVisitCta'

function ImNew() {
  const [page, setPage] = useState<ImNewPageData | null>(null)

  useEffect(() => {
    getImNewPage().then(setPage)
  }, [])

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
