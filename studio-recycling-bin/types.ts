import { ObjectItem } from "sanity"

export interface LogItem extends ObjectItem {
  docId: string
  deletedAt: string
  type: string
  documentTitle: string | 'Unknown 🥲'
  deletedBy?: string
}