import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'angelCard',
  title: "Angel's Message Card",
  type: 'object',
  fields: [
    defineField({
      name: 'number',
      title: 'Number',
      description: 'e.g. 01, 02, 03',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      description: 'e.g. The Everlasting Gospel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      description: 'e.g. "Fear God and give Him glory..."',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: { title: 'heading', subtitle: 'number' },
  },
})
