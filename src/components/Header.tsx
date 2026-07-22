import { Link } from 'react-router'
import type { SiteSettings } from '../lib/types'
import { urlFor } from '../lib/image'
import Menu from './Menu'

interface HeaderProps {
  siteSettings: SiteSettings | null
}

function Header({ siteSettings }: HeaderProps) {
  const siteName = siteSettings?.siteName ?? 'Athens GA SDA Church'

  return (
    <header className="bg-background sticky top-0 z-30 flex items-center justify-between px-4 py-4 sm:px-8">
      <Link to="/" className="flex items-center gap-2">
        {siteSettings?.logo && (
          <img
            src={urlFor(siteSettings.logo).width(80).height(80).url()}
            alt={siteName}
            className="h-10 w-10 rounded-full object-cover"
          />
        )}
        <span className="text-primary text-lg font-semibold">{siteName}</span>
      </Link>

      <Menu navLinks={siteSettings?.navLinks ?? []} />
    </header>
  )
}

export default Header
