import { useEffect, useState } from 'react'
import { getHomePage } from '../lib/content'
import type { HomePage } from '../lib/types'
import Hero from '../components/Hero'
import OptionCards from '../components/OptionCards'

function Home() {
  const [homePage, setHomePage] = useState<HomePage | null>(null)

  useEffect(() => {
    getHomePage().then(setHomePage)
  }, [])

  if (!homePage) return null

  return (
    <>
      <Hero slides={homePage.heroSlides} />
      <OptionCards
        heading={homePage.worshipHeading}
        subheading={homePage.worshipSubheading}
        options={homePage.worshipOptions}
        columns={2}
      />
      <OptionCards
        heading={homePage.ministryHeading}
        subheading={homePage.ministrySubheading}
        options={homePage.ministryOptions}
        columns={4}
      />
    </>
  )
}

export default Home
