interface SectionIntroProps {
  eyebrow?: string
  heading?: string
  paragraphs?: string[]
}

function SectionIntro({ eyebrow, heading, paragraphs = [] }: SectionIntroProps) {
  if (!heading && paragraphs.length === 0) return null

  return (
    <section className="mx-auto max-w-2xl px-4 pt-16 text-center last:pb-16 sm:px-8">
      {eyebrow && (
        <p className="text-accent text-sm font-semibold tracking-wide uppercase">{eyebrow}</p>
      )}
      {heading && <h2 className="text-primary mt-2 text-2xl font-bold sm:text-3xl">{heading}</h2>}
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="text-text mt-3">
          {paragraph}
        </p>
      ))}
    </section>
  )
}

export default SectionIntro
