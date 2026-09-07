import type { SanityImageSource } from '@sanity/image-url'
import { urlFor } from '../lib/image'

interface ScrollSpotlightImageProps {
  image?: SanityImageSource
  activeStage: number
}

const STAGE_POSITIONS = [
  { top: '30%', left: '26.5%' }, // local church pin
  { top: '49%', left: '26.5%' }, // conference icon
  { top: '73.5%', left: '26.5%' }, // worldwide globe
]

function ScrollSpotlightImage({ image, activeStage }: ScrollSpotlightImageProps) {
  if (!image) return null

  const position = STAGE_POSITIONS[activeStage]

  return (
    <div className="relative mx-auto w-full max-w-[280px]">
      <img
        src={urlFor(image).width(600).url()}
        alt="Athens SDA Church, part of the Georgia-Cumberland Conference and the worldwide Seventh-day Adventist Church"
        className="w-full rounded-2xl"
      />
      <span
        aria-hidden="true"
        className="border-accent animate-pulse absolute h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 shadow-[0_0_0_8px_rgba(217,164,65,0.35)] transition-all duration-700 ease-out"
        style={{ top: position.top, left: position.left }}
      />
    </div>
  )
}

export default ScrollSpotlightImage
