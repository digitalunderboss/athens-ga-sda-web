import type { SanityImageSource } from '@sanity/image-url'

export interface HeroSlide {
  _key: string
  image: SanityImageSource
  videoUrl?: string
  heading: string
  subheading?: string
  primaryCtaLabel?: string
  primaryCtaLink?: string
  secondaryCtaLabel?: string
  secondaryCtaLink?: string
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
  navLinks: NavLink[]
  footerTagline?: string
  contactEmail?: string
  contactPhone?: string
  address?: string
  socialLinks: SocialLink[]
}
