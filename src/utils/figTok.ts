import { ExportOption } from "@/types/figma.type"
import {
  FigmaCollection,
  FigmaVariable,
  TokenObject
} from "@/interfaces/figma.interface"

const getExportOptions = (): ExportOption[] => {
  return ["Css", "Json", "Tokens", "Table"]
}

const demoArray = <T extends FigmaCollection, U extends FigmaVariable>(
  collection: T,
  variable: U
) => {
  return { collection, variable }
}

const mergeCollectionsAndVariables = <
  T extends FigmaCollection[],
  U extends FigmaVariable[]
>(
  collections: T,
  variables: U
) => {
  const tokens: TokenObject[] = []

  // Map over collections
  collections.map(collection => {
    // Map over variables
    const newVariables = collection.variableIds
      .map(variableId => {
        const variable = variables.find(v => v.id === variableId)
        if (variable) {
          return {
            id: variable.id,
            key: variable.key,
            name: variable.name,
            resolvedType: variable.resolvedType
          }
        }
      })
      .filter(Boolean)

    // Create a new collection object with the
    // desired structure
    const newCollections = {
      id: collection.id,
      name: collection.name,
      variables: newVariables
    }

    tokens.push(newCollections)
  })

  return tokens
}
export { getExportOptions, mergeCollectionsAndVariables, demoArray }
