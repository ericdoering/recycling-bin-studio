// schemas/singletons/deletedDocBinDocument.ts
import { TrashIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const deletedDocBinDocument = defineType({
  name: "deletedDocs.bin",
  title: "Bin: Deleted Document Log",
  type: "document",
  icon: TrashIcon,
  liveEdit: true,
  fieldsets: [
    {
      name: "deletedDocIdLogs",
      title: "All Deleted Doc Id Logs",
      options: {
        collapsible: true,
        collapsed: true, 
      },
    },
  ],
  fields: [
    defineField({
      name: "deletedDocLogs",
      title: "Deleted Doc Logs",
      type: "array",
      readOnly: true,
      options: {
        sortable: false,
      },
      description:
        "Log of deleted documents. All items have the revision ID as the _key value and might have already been restored again.",
      of: [
        defineArrayMember({
          type: "object",
          name: "log",
          title: "Log",
          readOnly: true,
          fields: [
            defineField({
              name: "docId",
              title: "Doc Id",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "deletedAt",
              title: "Deleted At",
              type: "datetime",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "type",
              title: "Type",
              type: "string",
            }),
            defineField({
              name: "documentTitle",
              title: "Document Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'deletedBy',
              title: 'Deleted By',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "deletedDocIds",
      title: "Deleted Doc Ids",
      type: "array",
      readOnly: true,
      options: {
        sortable: false,
      },
      fieldset: "deletedDocIdLogs",
      of: [
        defineArrayMember({
          name: "deletedDocId",
          type: "string",
          readOnly: true,
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      hidden: true,
    }),
  ],
});

