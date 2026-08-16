interface SaturdayScheduleProps {
  eyebrow?: string
  bibleStudyHeading?: string
  bibleStudyBody?: string
  worshipHeading?: string
  worshipIntro?: string
  worshipBullets?: string[]
  sermonSeriesLabel?: string
  sermonSeriesText?: string
  worshipOutro?: string
}

function SaturdaySchedule({
  eyebrow,
  bibleStudyHeading,
  bibleStudyBody,
  worshipHeading,
  worshipIntro,
  worshipBullets = [],
  sermonSeriesLabel,
  sermonSeriesText,
  worshipOutro,
}: SaturdayScheduleProps) {
  return (
    <section id="saturday-schedule" className="mx-auto max-w-5xl px-4 pt-16 last:pb-16 sm:px-8">
      {eyebrow && (
        <p className="text-accent text-center text-sm font-semibold tracking-wide uppercase">
          {eyebrow}
        </p>
      )}

      <div className="mt-6 grid grid-cols-1 gap-10 sm:grid-cols-2">
        <div>
          {bibleStudyHeading && (
            <h3 className="text-primary text-xl font-semibold">{bibleStudyHeading}</h3>
          )}
          {bibleStudyBody && <p className="text-text mt-3">{bibleStudyBody}</p>}
        </div>

        <div>
          {worshipHeading && (
            <h3 className="text-primary text-xl font-semibold">{worshipHeading}</h3>
          )}
          {worshipIntro && <p className="text-text mt-3">{worshipIntro}</p>}
          {worshipBullets.length > 0 && (
            <ul className="text-text mt-2 list-inside list-disc space-y-1">
              {worshipBullets.map((bullet, index) => (
                <li key={index}>{bullet}</li>
              ))}
            </ul>
          )}

          {sermonSeriesText && (
            <div className="mt-4">
              {sermonSeriesLabel && (
                <p className="text-primary font-semibold">{sermonSeriesLabel}</p>
              )}
              <p className="text-text mt-1">{sermonSeriesText}</p>
            </div>
          )}

          {worshipOutro && <p className="text-text mt-4">{worshipOutro}</p>}
        </div>
      </div>
    </section>
  )
}

export default SaturdaySchedule
