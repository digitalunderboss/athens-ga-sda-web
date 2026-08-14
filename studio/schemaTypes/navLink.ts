import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'navLink',
  title: 'Nav Link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'path',
      title: 'Path',
      description:
        'Internal route path (e.g. /about), or a full https:// URL to link offsite (opens in a new tab), e.g. for the Offering/giving link.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'path' },
  },
})
