import { Link } from 'react-router'
import type { WorshipOption } from '../lib/types'
import { urlFor } from '../lib/image'

interface OptionCardsProps {
  heading?: string
  subheading?: string
  options: WorshipOption[]
  columns?: 2 | 4
}

function OptionCards({ heading, subheading, options, columns = 2 }: OptionCardsProps) {
  if (options.length === 0) return null

  const gridClasses =
    columns === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2'

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-8">
      {heading && <h2 className="text-primary text-2xl font-bold sm:text-3xl">{heading}</h2>}
      {subheading && <p className="text-text mx-auto mt-3 max-w-xl">{subheading}</p>}

      <div className={`mt-10 grid grid-cols-1 gap-6 ${gridClasses}`}>
        {options.map((option) => (
          <div
            key={option._key}
            className="border-secondary flex flex-col overflow-hidden rounded-2xl border text-left"
          >
            {option.image && (
              <img
                src={urlFor(option.image).width(800).url()}
                alt=""
                className="h-48 w-full object-cover"
              />
            )}
            <div className="flex flex-1 flex-col gap-3 p-6">
              <h3 className="text-primary text-xl font-semibold">{option.label}</h3>
              {option.description && <p className="text-text text-sm">{option.description}</p>}
              {option.ctaLabel && option.ctaLink && (
                <Link
                  to={option.ctaLink}
                  className="border-primary text-primary mt-auto inline-block w-fit rounded-full border px-5 py-2 text-sm font-semibold hover:bg-primary hover:text-white"
                >
                  {option.ctaLabel}
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default OptionCards
