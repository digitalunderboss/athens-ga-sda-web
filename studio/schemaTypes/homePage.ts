import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  // Singleton: only one "Home Page" document should ever exist.
  fields: [
    defineField({
      name: 'heroSlides',
      title: 'Hero Carousel Slides',
      type: 'array',
      of: [{ type: 'heroSlide' }],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'worshipHeading',
      title: 'Worship Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'worshipSubheading',
      title: 'Worship Section Subheading',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'worshipOptions',
      title: 'Worship Options',
      type: 'array',
      of: [{ type: 'worshipOption' }],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Home Page' }
    },
  },
})
