export interface TokenObject {
  id: string
  name: string
  resolvedType: "COLOR" | "FLOAT" | "STRING" | "BOOLEAN"
}

export interface FigmaCollection {
  id: string
  name: string
  variableIds: string[]
  variables: FigmaVariable[]
}

export interface ToCssParams {
  prefix: string
  includeCollections: true | false
}

export interface FigmaVariable {
  id: string
  key: string
  name: string
  variableCollectionId: string
  valuesByMode: { [key: string]: any }
  value: any
  resolvedType: "COLOR" | "FLOAT" | "STRING" | "BOOLEAN"
}
