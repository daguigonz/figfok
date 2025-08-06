import { ExportOption } from "@/types/figma.type"
import {
  FigmaCollection,
  FigmaVariable,
  TokenObject
} from "@/interfaces/figma.interface"

const getExportOptions = (): ExportOption[] => {
  return ["Css", "Tokens", "Table"]
}

// Process
const processTokens = (
  typeProcess: string,
  dataFigma: FigmaCollection[]
): string => {
  let outPut = ""

  if (typeProcess === "Css") {
    outPut = toCss(dataFigma)
  }

  return outPut
}

const rgbtohex = (r: number, g: number, b: number): string => {
  const toHex = (c: number) =>
    Math.round(c * 255)
      .toString(16)
      .padStart(2, "0")
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

const fixText = (texto: string): string => {
  // Step 1: remove accents and convert ñ to n
  const normalizedText: string = texto
    .normalize("NFD") // decompose
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/ñ/g, "n")
    .replace(/Ñ/g, "N")

  // Step 2: remove special characters except letters, numbers, spaces, and /
  const noSpecialCharacters: string = normalizedText.replace(
    /[^a-zA-Z0-9 \/]/g,
    ""
  )

  // Step 3: replace / with -
  const replacedSlashes: string = noSpecialCharacters.replace(/\//g, "-")

  // Step 4: replace spaces with -
  const replacedSpaces: string = replacedSlashes.replace(/ /g, "-")

  // Step 5: convert to lowercase
  const finalText: string = replacedSpaces.toLowerCase()

  return finalText
}

const toCss = <T extends FigmaCollection[]>(
  dataFigma: T,
  prefix: string
): string => {
  const css: string[] = [`:root {`]

  // Map over collections
  dataFigma.map(collection => {
    const newKeyCollection = fixText(collection.name)
    // generate css variables
    collection.variables.map(variable => {
      if (variable.resolvedType !== "BOOLEAN") {
        const newName = fixText(variable.name)
        const newValueVariable =
          variable.resolvedType === "COLOR"
            ? rgbtohex(variable.value.r, variable.value.g, variable.value.b)
            : variable.value
        css.push(`    --${newKeyCollection}-${newName}: ${newValueVariable};`)
      }
    })
  })
  css.push("}")
  return css.join("\n")
}

const toTokens = () => {}

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
            resolvedType: variable.resolvedType,
            value: variable.valuesByMode[Object.keys(variable.valuesByMode)[0]]
          }
        }
      })
      .filter(Boolean)

    // Create a new collection object with the desired structure
    const newCollections = {
      id: collection.id,
      name: collection.name,
      variables: newVariables
    }

    tokens.push(newCollections)
  })

  return tokens
}
export {
  getExportOptions,
  processTokens,
  toTokens,
  toCss,
  mergeCollectionsAndVariables
}
