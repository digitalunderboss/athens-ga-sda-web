import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Athens GA SDA Church',

  projectId: '5q6580ql',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Home Page')
              .id('homePage')
              .child(S.document().schemaType('homePage').documentId('homePage')),
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // homePage and siteSettings are singletons — hide them from the generic
    // "create new" menu so editors always land on the one fixed document via
    // the list above.
    templates: (templates) =>
      templates.filter(
        (template) => !['homePage', 'siteSettings'].includes(template.schemaType),
      ),
  },
})
