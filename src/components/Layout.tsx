import { useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import { getSiteSettings } from '../lib/content'
import type { SiteSettings } from '../lib/types'
import Header from './Header'
import Footer from './Footer'

function Layout() {
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null)

  useEffect(() => {
    getSiteSettings().then(setSiteSettings)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Header siteSettings={siteSettings} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer siteSettings={siteSettings} />
    </div>
  )
}

export default Layout
