interface TextBannerProps {
  statement?: string
  paragraphs?: string[]
}

function TextBanner({ statement, paragraphs = [] }: TextBannerProps) {
  if (!statement && paragraphs.length === 0) return null

  return (
    <section className="bg-primary px-4 py-16 text-white sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 text-center">
        {statement && <p className="text-xl font-semibold sm:text-2xl">{statement}</p>}
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-white/90">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  )
}

export default TextBanner
