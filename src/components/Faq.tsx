interface FaqItem {
  _key: string
  question: string
  answer: string
}

interface FaqProps {
  heading?: string
  items: FaqItem[]
}

function Faq({ heading, items }: FaqProps) {
  if (items.length === 0) return null

  return (
    <section className="mx-auto max-w-3xl px-4 pt-16 sm:px-8">
      {heading && (
        <h2 className="text-primary text-center text-2xl font-bold sm:text-3xl">{heading}</h2>
      )}

      <div className="mt-10 flex flex-col gap-3">
        {items.map((item) => (
          <details
            key={item._key}
            className="border-secondary group rounded-xl border px-5 py-4"
          >
            <summary className="text-primary flex cursor-pointer list-none items-center justify-between font-semibold">
              {item.question}
              <span className="ml-4 shrink-0 transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="text-text mt-3">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

export default Faq
