/**
 * Lark Bitable field type constants.
 * @see https://open.larksuite.com/document/server-docs/docs/bitable-v1/app-table-field/guide
 */
export const FieldType = {
  Text: 1,
  Number: 2,
  SingleSelect: 3,
  MultiSelect: 4,
  DateTime: 5,
  Checkbox: 7,
  User: 11,
  Phone: 13,
  Url: 15,
  Attachment: 17,
  Link: 18,
  Formula: 20,
  AutoNumber: 1005,
  Currency: 1022,
  Location: 22,
  // Lookup (via link) is configured as part of formula/link fields
} as const;

export type FieldTypeValue = (typeof FieldType)[keyof typeof FieldType];
