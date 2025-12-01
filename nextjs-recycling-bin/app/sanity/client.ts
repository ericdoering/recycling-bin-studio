import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "2b4lm0ii",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});