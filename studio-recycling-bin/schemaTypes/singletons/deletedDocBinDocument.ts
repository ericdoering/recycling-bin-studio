// schemas/singletons/deletedDocBinDocument.ts
import { TrashIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { DeletedDocIdInputComponent } from "../../components/DeletedDocIdInputComponent";
import { DeletionLogItemComponent } from "../../components/DeletionLogItemComponent";

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
    // * Main log for restoring documents
    defineField({
      name: "deletedDocLogs",
      title: "Deleted Doc Logs",
      type: "array",
      readOnly: true,
      options: {
        sortable: false,
      },
      components: {
        input: (props: any) =>
          props.renderDefault({ ...props, arrayFunctions: () => null }),
      },
      description:
        "Log of deleted documents. All items have the revision ID as the _key value and might have already been restored again.",
      of: [
        defineArrayMember({
          type: "object",
          name: "log",
          title: "Log",
          readOnly: true,
          components: {
            item: DeletionLogItemComponent as any,
          },
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
      components: {
        input: (props: any) =>
          props.renderDefault({ ...props, arrayFunctions: () => null }),
      },
      of: [
        defineArrayMember({
            name: "deletedDocId",
            type: "string",
            readOnly: true,
            components: {
              input: DeletedDocIdInputComponent,
            }
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