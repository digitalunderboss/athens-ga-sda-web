import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'leaderCard',
  title: 'Leader Card',
  type: 'object',
  fields: [
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      description: 'e.g. President, Secretary',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'title', media: 'photo' },
  },
})
