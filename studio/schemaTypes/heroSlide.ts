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
    defineField({
      name: 'youtubeVideoUrl',
      title: 'YouTube Video URL (optional)',
      description:
        'If set, this overrides the Primary/Secondary CTA Link fields above: the Secondary CTA links straight to this video, and the Primary CTA links to this video starting at the timestamp below (if provided).',
      type: 'url',
    }),
    defineField({
      name: 'youtubeTimestamp',
      title: 'Sermon Start Timestamp (optional)',
      description:
        'Where the sermon begins in the video above, as MM:SS or H:MM:SS (e.g. 54:50 or 1:26:04). Used to build the Primary CTA link. Only used when YouTube Video URL is set.',
      type: 'string',
      validation: (Rule) =>
        Rule.regex(/^\d{1,2}(:\d{2}){1,2}$/, {
          name: 'timestamp',
          invert: false,
        }).warning('Use MM:SS or H:MM:SS, e.g. 54:50 or 1:26:04'),
    }),
  ],
  preview: {
    select: { title: 'heading', media: 'image' },
  },
})
