import { Link } from 'react-router'
import type { SiteSettings } from '../lib/types'
import { urlFor } from '../lib/image'
import Menu from './Menu'
import MobileQuickNav from './MobileQuickNav'

interface HeaderProps {
  siteSettings: SiteSettings | null
}

function Header({ siteSettings }: HeaderProps) {
  const siteName = siteSettings?.siteName ?? 'Athens SDA Church'
  const navLinks = siteSettings?.navLinks ?? []

  return (
    <header className="bg-background sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 py-4 sm:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-4">
          {siteSettings?.logo && (
            <img
              src={urlFor(siteSettings.logo).width(320).url()}
              alt="Seventh-day Adventist Church"
              className="h-8 w-auto shrink-0 sm:h-10"
            />
          )}
          <span className="text-primary truncate text-lg font-semibold">{siteName}</span>
        </Link>

        <Menu navLinks={navLinks} />
      </div>

      <MobileQuickNav navLinks={navLinks} />
    </header>
  )
}

export default Header
