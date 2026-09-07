import { sanityClient } from './sanity'
import type { HomePage, SiteSettings, ImNewPage, AboutPage } from './types'

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

const aboutPageQuery = /* groq */ `*[_id == "aboutPage"][0]{
  heroHeadline,
  heroSubheadline,
  heroTagline,
  scrollVisual,
  localIntroHeading,
  localIntroBody,
  pastorHeading,
  pastorName,
  pastorPhoto,
  pastorBio,
  pullQuote,
  localCtaHeading,
  localCtaBody,
  localCtaButtonLabel,
  localCtaButtonLink,
  conferenceHeadline,
  conferenceIntro,
  conferenceChurchCount,
  conferenceMemberCount,
  missionHeading,
  missionBody,
  leadershipHeading,
  leaders,
  conferenceCtaLabel,
  conferenceCtaLink,
  worldwideTransition,
  worldwideHeadline,
  worldwideIntro,
  angels,
  connectingStatement,
  connectingBody,
  statsHeading,
  stats,
  globalFamilyHeading,
  globalFamilyParagraphs,
  beliefsHeading,
  beliefsBody,
  beliefsCardHeading,
  beliefsCardBody,
  beliefsButtonLabel,
  beliefsButtonLink,
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

export function getAboutPage() {
  return sanityClient.fetch<AboutPage>(aboutPageQuery)
}
