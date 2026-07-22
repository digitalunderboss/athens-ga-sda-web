import { useEffect, useState } from 'react'
import { getHomePage } from '../lib/content'
import type { HomePage } from '../lib/types'
import Hero from '../components/Hero'
import WorshipOptions from '../components/WorshipOptions'

function Home() {
  const [homePage, setHomePage] = useState<HomePage | null>(null)

  useEffect(() => {
    getHomePage().then(setHomePage)
  }, [])

  if (!homePage) return null

  return (
    <>
      <Hero slides={homePage.heroSlides} />
      <WorshipOptions
        heading={homePage.worshipHeading}
        subheading={homePage.worshipSubheading}
        options={homePage.worshipOptions}
      />
    </>
  )
}

export default Home
