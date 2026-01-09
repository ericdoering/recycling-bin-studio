import { defineType, defineField } from "sanity";

export const testDoc = defineType({
    name: "testDoc",
    title: "Test Doc",
    type: "document",
    initialValue: {
      title: [
        {
          _key: "no",
          _type: "internationalizedArrayStringValue",
          value: "Relaterte artikler",
        },
        {
          _key: "en",
          _type: "internationalizedArrayStringValue",
          value: "Related Articles",
        },
      ],
    },
    fields: [
      defineField({
        name: "title",
        type: "internationalizedArrayStringValue",
      }),
    ],
  })
  