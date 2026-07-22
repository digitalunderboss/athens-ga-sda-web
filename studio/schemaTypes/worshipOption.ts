import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'worshipOption',
  title: 'Worship Option',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      description: 'e.g. Physical Worship, Online Worship',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'image',
      title: 'Image (optional)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'string',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      description: 'Internal route path, e.g. /worship/in-person',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'label', media: 'image' },
  },
})
