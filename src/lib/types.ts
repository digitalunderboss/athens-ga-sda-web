import type { SanityImageSource } from '@sanity/image-url'

export interface HeroSlide {
  _key: string
  image: SanityImageSource
  mobileImage?: SanityImageSource
  videoUrl?: string
  heading: string
  subheading?: string
  primaryCtaLabel?: string
  primaryCtaLink?: string
  secondaryCtaLabel?: string
  secondaryCtaLink?: string
  youtubeVideoUrl?: string
  youtubeTimestamp?: string
}

export interface WorshipOption {
  _key: string
  label: string
  description?: string
  image?: SanityImageSource
  ctaLabel?: string
  ctaLink?: string
}

export interface HomePage {
  heroSlides: HeroSlide[]
  worshipHeading?: string
  worshipSubheading?: string
  worshipOptions: WorshipOption[]
  ministryHeading?: string
  ministrySubheading?: string
  ministryOptions: WorshipOption[]
}

export interface NavLink {
  _key: string
  label: string
  path: string
}

export interface SocialLink {
  _key: string
  platform: string
  url: string
}

export interface SiteSettings {
  siteName: string
  logo?: SanityImageSource
  logoDark?: SanityImageSource
  navLinks: NavLink[]
  footerTagline?: string
  contactEmail?: string
  contactPhone?: string
  address?: string
  socialLinks: SocialLink[]
}

export interface FaqItem {
  _key: string
  question: string
  answer: string
}

export interface ImNewPage {
  heroSlides: HeroSlide[]
  expectStatement?: string
  expectParagraphs: string[]
  saturdayEyebrow?: string
  bibleStudyHeading?: string
  bibleStudyBody?: string
  worshipHeading?: string
  worshipIntro?: string
  worshipBullets: string[]
  sermonSeriesLabel?: string
  sermonSeriesText?: string
  worshipOutro?: string
  nextStepEyebrow?: string
  nextStepHeading?: string
  nextStepParagraphs: string[]
  pathwayHeading?: string
  pathwayCards: WorshipOption[]
  faqHeading?: string
  faqItems: FaqItem[]
  finalCtaHeading?: string
  finalCtaBody?: string
  churchName?: string
  address?: string
  bibleStudyTime?: string
  worshipServiceTime?: string
  finalCtaButtonLabel?: string
  finalCtaButtonLink?: string
}

export interface StatItem {
  _key: string
  number: string
  label: string
}

export interface LeaderCard {
  _key: string
  name: string
  title: string
}

export interface AngelCard {
  _key: string
  number: string
  heading: string
  quote?: string
  description?: string
}

export interface AboutPage {
  heroHeadline?: string
  heroSubheadline?: string
  heroTagline?: string
  scrollVisual?: SanityImageSource

  localIntroHeading?: string
  localIntroBody?: string
  pastorHeading?: string
  pastorName?: string
  pastorPhoto?: SanityImageSource
  pastorBio: string[]
  pullQuote?: string
  localCtaHeading?: string
  localCtaBody?: string
  localCtaButtonLabel?: string
  localCtaButtonLink?: string

  conferenceHeadline?: string
  conferenceIntro?: string
  conferenceChurchCount?: string
  conferenceMemberCount?: string
  missionHeading?: string
  missionBody?: string
  leadershipHeading?: string
  leaders: LeaderCard[]
  conferenceCtaLabel?: string
  conferenceCtaLink?: string

  worldwideTransition?: string
  worldwideHeadline?: string
  worldwideIntro?: string
  angels: AngelCard[]
  connectingStatement?: string
  connectingBody?: string

  statsHeading?: string
  stats: StatItem[]

  globalFamilyHeading?: string
  globalFamilyParagraphs: string[]

  beliefsHeading?: string
  beliefsBody?: string
  beliefsCardHeading?: string
  beliefsCardBody?: string
  beliefsButtonLabel?: string
  beliefsButtonLink?: string
}
