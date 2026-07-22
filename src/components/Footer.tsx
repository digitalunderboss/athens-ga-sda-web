import { Link } from 'react-router'
import type { SiteSettings } from '../lib/types'

interface FooterProps {
  siteSettings: SiteSettings | null
}

function Footer({ siteSettings }: FooterProps) {
  const siteName = siteSettings?.siteName ?? 'Athens GA SDA Church'
  const year = new Date().getFullYear()

  return (
    <footer className="bg-primary mt-auto px-4 py-10 text-white sm:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 sm:flex-row sm:justify-between">
        <div className="max-w-sm">
          <p className="text-lg font-semibold">{siteName}</p>
          {siteSettings?.footerTagline && (
            <p className="mt-2 text-sm text-white/80">{siteSettings.footerTagline}</p>
          )}
        </div>

        {siteSettings?.navLinks && siteSettings.navLinks.length > 0 && (
          <nav className="flex flex-col gap-2 text-sm">
            {siteSettings.navLinks.map((link) => (
              <Link key={link._key} to={link.path} className="text-white/80 hover:text-accent">
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        <div className="flex flex-col gap-2 text-sm text-white/80">
          {siteSettings?.address && <p>{siteSettings.address}</p>}
          {siteSettings?.contactEmail && (
            <a href={`mailto:${siteSettings.contactEmail}`} className="hover:text-accent">
              {siteSettings.contactEmail}
            </a>
          )}
          {siteSettings?.contactPhone && (
            <a href={`tel:${siteSettings.contactPhone}`} className="hover:text-accent">
              {siteSettings.contactPhone}
            </a>
          )}
          {siteSettings?.socialLinks?.map((social) => (
            <a
              key={social._key}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent"
            >
              {social.platform}
            </a>
          ))}
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-5xl text-xs text-white/60">
        © {year} {siteName}. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
