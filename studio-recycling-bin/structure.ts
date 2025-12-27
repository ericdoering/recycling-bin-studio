import { StructureBuilder } from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Bin: Deleted Document Log')
        .id('deletedDocs.bin')
        .child(
          S.document()
            .schemaType('deletedDocs.bin')
        ),
      ...S.documentTypeListItems().filter(
        (listItem) => listItem.getId() !== 'deletedDocs.bin'
      ),
    ])

