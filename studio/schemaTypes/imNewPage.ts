import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'imNewPage',
  title: "I'm New Page",
  type: 'document',
  // Singleton: only one "I'm New Page" document should ever exist.
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'expect', title: 'What To Expect' },
    { name: 'saturday', title: 'Saturday Morning' },
    { name: 'nextStep', title: 'Your Next Step' },
    { name: 'pathway', title: 'Discipleship Pathway' },
    { name: 'faq', title: 'FAQ' },
    { name: 'finalCta', title: 'Final CTA' },
  ],
  fields: [
    defineField({
      name: 'heroSlides',
      title: 'Hero Slides',
      description: 'Single-slide hero banner for this page — same slide type as the homepage carousel, but only one item is expected here.',
      type: 'array',
      of: [{ type: 'heroSlide' }],
      validation: (Rule) => Rule.min(1).max(1),
      group: 'hero',
    }),

    defineField({
      name: 'expectStatement',
      title: 'Bold Statement',
      type: 'text',
      rows: 2,
      group: 'expect',
    }),
    defineField({
      name: 'expectParagraphs',
      title: 'Paragraphs',
      type: 'array',
      of: [{ type: 'text', rows: 3 }],
      group: 'expect',
    }),

    defineField({
      name: 'saturdayEyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'saturday',
    }),
    defineField({
      name: 'bibleStudyHeading',
      title: 'Bible Study Heading',
      description: 'e.g. "10:00 AM — Bible Study"',
      type: 'string',
      group: 'saturday',
    }),
    defineField({
      name: 'bibleStudyBody',
      title: 'Bible Study Body',
      type: 'text',
      rows: 3,
      group: 'saturday',
    }),
    defineField({
      name: 'worshipHeading',
      title: 'Worship Service Heading',
      description: 'e.g. "11:00 AM — Worship Service"',
      type: 'string',
      group: 'saturday',
    }),
    defineField({
      name: 'worshipIntro',
      title: 'Worship Intro Line',
      description: 'e.g. "Our worship service includes:"',
      type: 'string',
      group: 'saturday',
    }),
    defineField({
      name: 'worshipBullets',
      title: 'Worship Bullets',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'saturday',
    }),
    defineField({
      name: 'sermonSeriesLabel',
      title: 'Sermon Series Label',
      description: 'e.g. "Current Sermon Series"',
      type: 'string',
      group: 'saturday',
    }),
    defineField({
      name: 'sermonSeriesText',
      title: 'Sermon Series Text',
      description: 'Leave blank until the pastor has a current series to name — the section is hidden when empty.',
      type: 'string',
      group: 'saturday',
    }),
    defineField({
      name: 'worshipOutro',
      title: 'Worship Outro',
      type: 'text',
      rows: 3,
      group: 'saturday',
    }),

    defineField({
      name: 'nextStepEyebrow',
      title: 'Eyebrow',
      description: 'e.g. "Your Next Step"',
      type: 'string',
      group: 'nextStep',
    }),
    defineField({
      name: 'nextStepHeading',
      title: 'Heading',
      description: 'e.g. "Don\'t Stop at Saturday"',
      type: 'string',
      group: 'nextStep',
    }),
    defineField({
      name: 'nextStepParagraphs',
      title: 'Paragraphs',
      type: 'array',
      of: [{ type: 'text', rows: 3 }],
      group: 'nextStep',
    }),

    defineField({
      name: 'pathwayHeading',
      title: 'Heading',
      description: 'e.g. "Experience Christ\'s Rest Throughout the Week"',
      type: 'string',
      group: 'pathway',
    }),
    defineField({
      name: 'pathwayCards',
      title: 'Cards',
      description: 'Learn, Grow, Belong, Live the Mission, Connect with Us',
      type: 'array',
      of: [{ type: 'worshipOption' }],
      group: 'pathway',
    }),

    defineField({
      name: 'faqHeading',
      title: 'Heading',
      type: 'string',
      group: 'faq',
    }),
    defineField({
      name: 'faqItems',
      title: 'Questions',
      type: 'array',
      of: [{ type: 'faqItem' }],
      group: 'faq',
    }),

    defineField({
      name: 'finalCtaHeading',
      title: 'Heading',
      description: 'e.g. "We\'d Love to Meet You"',
      type: 'string',
      group: 'finalCta',
    }),
    defineField({
      name: 'finalCtaBody',
      title: 'Body',
      type: 'text',
      rows: 3,
      group: 'finalCta',
    }),
    defineField({
      name: 'churchName',
      title: 'Church Name',
      type: 'string',
      group: 'finalCta',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 2,
      group: 'finalCta',
    }),
    defineField({
      name: 'bibleStudyTime',
      title: 'Bible Study Time',
      description: 'e.g. "Saturday at 10:00 AM"',
      type: 'string',
      group: 'finalCta',
    }),
    defineField({
      name: 'worshipServiceTime',
      title: 'Worship Service Time',
      description: 'e.g. "Saturday at 11:00 AM"',
      type: 'string',
      group: 'finalCta',
    }),
    defineField({
      name: 'finalCtaButtonLabel',
      title: 'Button Label',
      description: 'e.g. "Plan Your Visit"',
      type: 'string',
      group: 'finalCta',
    }),
    defineField({
      name: 'finalCtaButtonLink',
      title: 'Button Link',
      type: 'string',
      group: 'finalCta',
    }),
  ],
  preview: {
    prepare() {
      return { title: "I'm New Page" }
    },
  },
})
