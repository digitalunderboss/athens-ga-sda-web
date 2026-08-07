import { sanityClient } from './sanity'
import type { HomePage, SiteSettings } from './types'

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

export function getHomePage() {
  return sanityClient.fetch<HomePage>(homePageQuery)
}

export function getSiteSettings() {
  return sanityClient.fetch<SiteSettings>(siteSettingsQuery)
}
