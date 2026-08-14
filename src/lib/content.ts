import { sanityClient } from './sanity'
import type { HomePage, SiteSettings, ImNewPage } from './types'

const homePageQuery = /* groq */ `*[_id == "homePage"][0]{
  heroSlides,
  worshipHeading,
  worshipSubheading,
  worshipOptions,
  ministryHeading,
  ministrySubheading,
  ministryOptions,
}`

const siteSettingsQuery = /* groq */ `*[_id == "siteSettings"][0]{
  siteName,
  logo,
  logoDark,
  navLinks,
  footerTagline,
  contactEmail,
  contactPhone,
  address,
  socialLinks,
}`

const imNewPageQuery = /* groq */ `*[_id == "imNewPage"][0]{
  heroSlides,
  expectStatement,
  expectParagraphs,
  saturdayEyebrow,
  bibleStudyHeading,
  bibleStudyBody,
  worshipHeading,
  worshipIntro,
  worshipBullets,
  sermonSeriesLabel,
  sermonSeriesText,
  worshipOutro,
  nextStepEyebrow,
  nextStepHeading,
  nextStepParagraphs,
  pathwayHeading,
  pathwayCards,
  faqHeading,
  faqItems,
  finalCtaHeading,
  finalCtaBody,
  churchName,
  address,
  bibleStudyTime,
  worshipServiceTime,
  finalCtaButtonLabel,
  finalCtaButtonLink,
}`

export function getHomePage() {
  return sanityClient.fetch<HomePage>(homePageQuery)
}

export function getSiteSettings() {
  return sanityClient.fetch<SiteSettings>(siteSettingsQuery)
}

export function getImNewPage() {
  return sanityClient.fetch<ImNewPage>(imNewPageQuery)
}
