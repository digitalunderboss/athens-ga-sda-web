import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'heroSlide',
  title: 'Hero Slide',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Background Video URL (optional)',
      description:
        'YouTube link for worship video / recent sermon. If set, this takes priority over the image on playback-capable devices.',
      type: 'url',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'primaryCtaLabel',
      title: 'Primary CTA Label',
      type: 'string',
    }),
    defineField({
      name: 'primaryCtaLink',
      title: 'Primary CTA Link',
      description: 'Internal route path, e.g. /connect',
      type: 'string',
    }),
    defineField({
      name: 'secondaryCtaLabel',
      title: 'Secondary CTA Label',
      type: 'string',
    }),
    defineField({
      name: 'secondaryCtaLink',
      title: 'Secondary CTA Link',
      description: 'Internal route path, e.g. /about',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'heading', media: 'image' },
  },
})
