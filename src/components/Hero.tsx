import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import type { HeroSlide } from '../lib/types'
import { urlFor } from '../lib/image'

interface HeroProps {
  slides: HeroSlide[]
}

const AUTOPLAY_INTERVAL_MS = 7000

function Hero({ slides }: HeroProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) return
    const timer = setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length)
    }, AUTOPLAY_INTERVAL_MS)
    return () => clearInterval(timer)
  }, [slides.length])

  if (slides.length === 0) return null

  const slide = slides[activeIndex]
  const goTo = (index: number) => setActiveIndex((index + slides.length) % slides.length)

  return (
    <section className="relative h-[80svh] min-h-[420px] w-full overflow-hidden">
      <img
        src={urlFor(slide.image).width(1920).url()}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
      <div className="absolute inset-0 bg-black/40" />

      {slides.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => goTo(activeIndex - 1)}
            className="absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white hover:bg-white/30 sm:left-4"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => goTo(activeIndex + 1)}
            className="absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white hover:bg-white/30 sm:right-4"
          >
            ›
          </button>
        </>
      )}

      <div className="pointer-events-none relative z-10 flex h-full flex-col justify-end gap-4 px-4 pb-16 sm:px-8 sm:pb-20">
        <h1 className="max-w-2xl text-3xl font-bold text-white sm:text-5xl">{slide.heading}</h1>
        {slide.subheading && (
          <p className="max-w-xl text-base text-white/90 sm:text-lg">{slide.subheading}</p>
        )}

        <div className="pointer-events-auto mt-2 flex flex-wrap gap-3">
          {slide.primaryCtaLabel && slide.primaryCtaLink && (
            <Link
              to={slide.primaryCtaLink}
              className="bg-accent rounded-full px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
            >
              {slide.primaryCtaLabel}
            </Link>
          )}
          {slide.secondaryCtaLabel && slide.secondaryCtaLink && (
            <Link
              to={slide.secondaryCtaLink}
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-text hover:bg-white/90"
            >
              {slide.secondaryCtaLabel}
            </Link>
          )}
        </div>

        {slides.length > 1 && (
          <div className="pointer-events-auto mt-4 flex gap-2">
            {slides.map((s, index) => (
              <button
                key={s._key}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => goTo(index)}
                className={`h-2 rounded-full transition-all ${
                  index === activeIndex ? 'bg-accent w-6' : 'w-2 bg-white/60'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Hero
