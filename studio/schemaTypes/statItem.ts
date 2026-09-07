import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'statItem',
  title: 'Stat Item',
  type: 'object',
  fields: [
    defineField({
      name: 'number',
      title: 'Number',
      description: 'e.g. 23.7M+, 186, 48,482',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      description: 'e.g. Church Members, Churches',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'number', subtitle: 'label' },
  },
})
