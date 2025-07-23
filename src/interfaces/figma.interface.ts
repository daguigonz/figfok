export interface TokenObject {
  // [key: string]: string | TokenObject
  id: string
  name: string
}

export interface FigmaCollection {
  id: string
  name: string
  variableIds: string[]
}

export interface FigmaVariable {
  id: string
  key: string
  name: string
  variableCollectionId: string
  valuesByMode: { [key: string]: any }
  resolvedType: "COLOR" | "FLOAT" | "STRING" | "BOOLEAN"
}
