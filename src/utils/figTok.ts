import { ExportOption } from "@/types/figma.type"
import {
  FigmaCollection,
  FigmaVariable,
  ToCssParams
} from "@/interfaces/figma.interface"

const getExportOptions = (): ExportOption[] => {
  return ["Css", "Tokens", "Color"]
}

/**
 * Converts normalized RGB values to a hexadecimal color string.
 *
 * Each RGB component (r, g, b) is expected to be a number between 0 and 1.
 * The function multiplies each component by 255, rounds it to the nearest
 * integer, converts it to a two-character hexadecimal string, and concatenates
 * the result into a valid hex color.
 *
 * Example:
 * ```ts
 * rgbtohex(1, 0.5, 0); // returns "#ff8000"
 * ```
 *
 * @param {number} r - Red component (range: 0 to 1)
 * @param {number} g - Green component (range: 0 to 1)
 * @param {number} b - Blue component (range: 0 to 1)
 * @returns {string} Hexadecimal color string (e.g. "#ffcc00")
 */
const rgbtohex = (r: number, g: number, b: number): string => {
  const toHex = (c: number) =>
    Math.round(c * 255)
      .toString(16)
      .padStart(2, "0")
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

/**
 * Cleans and formats a given string for use in URLs or file names.
 *
 * This function performs the following transformations:
 * 1. Removes accents and replaces "ñ" with "n".
 * 2. Removes all special characters except letters, numbers, spaces, and slashes (/).
 * 3. Replaces slashes (/) with hyphens (-).
 * 4. Replaces spaces with hyphens (-).
 * 5. Converts the final string to lowercase.
 *
 * Example:
 * ```ts
 * fixText("Señal / Número 100%") // returns "senal-numero-100"
 * ```
 *
 * @param {string} texto - The input text to be cleaned and formatted.
 * @returns {string} A lowercase, hyphenated, special-character-free string.
 */
const fixText = (texto: string): string => {
  if (!texto) {
    return ""
  }
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

/*
 * Filters the Figma data to only include the "Colors" collection.
 *
 * @param {FigmaCollection[]} dataFigma - The array of Figma collections to filter.
 * @returns {FigmaCollection[]} An array of Figma collections that match the "Colors" name.
 */
const filterColors = (dataFigma: FigmaCollection[]): FigmaCollection[] => {
  return dataFigma.filter(collection => collection.name === "Colors")
}

/**
 * Transforms a list of Figma variable collections into a CSS `:root` block
 * containing custom property declarations (CSS variables).
 *
 * @template T - A list of Figma variable collections.
 * @param {T} dataFigma - The array of Figma collections to transform.
 * @param {ToCssParams} params - Parameters for CSS conversion, including an optional prefix and a flag to include collection names.
 * @returns {string} A formatted CSS string containing all variables under a `:root` block.
 *
 * @example
 * const css = toCss(figmaCollections, { prefix: "--theme", includeCollections: true });
 * console.log(css);
 * // :root {
 * //   --theme-colors-primary: #ff0000;
 * //   --theme-spacing-md: 16px;
 * // }
 */
const toCss = <T extends FigmaCollection[]>(
  dataFigma: T,
  params: ToCssParams
): string => {
  console.log("dataFigma", dataFigma)
  const cssVariables = dataFigma.flatMap(collection => {
    const collectionName = params.includeCollections
      ? fixText(collection.name)
      : ""
    const newPrefix = params.prefix ? `${params.prefix}` : "--"
    return collection.variables
      .filter(variable => variable.resolvedType !== "BOOLEAN")
      .map(variable => {
        const variableName = fixText(variable.name)
        const value =
          variable.resolvedType === "COLOR"
            ? rgbtohex(variable.value.r, variable.value.g, variable.value.b)
            : String(variable.value)

        const parts = [newPrefix, collectionName, variableName].filter(Boolean)

        return `  ${parts.join("-")}: ${value};`
      })
  })

  return [":root {", ...cssVariables, "}"].join("\n")
}

/**
 * Converts Figma variable collections into a structured JSON Design Tokens format.
 *
 * Each variable is normalized with a `$value` and `$type` property. Colors are converted to hexadecimal,
 * and type names are adapted to common token conventions (e.g. "FLOAT" becomes "number").
 *
 * @template T - A list of Figma variable collections.
 * @param {T} dataFigma - The array of Figma collections to convert.
 * @returns {string} A JSON string representing the design tokens.
 *
 * @example
 * const json = toTokens(figmaCollections);
 * console.log(json);
 * // {
 * //   "colors": {
 * //     "primary": {
 * //       "$value": "#ff0000",
 * //       "$type": "color"
 * //     }
 * //   }
 * // }
 */
const toTokens = <T extends FigmaCollection[]>(dataFigma: T): string => {
  const tokenObject = dataFigma.reduce(
    (tokenBuilder, collection) => {
      const collectionName = fixText(collection.name)

      tokenBuilder[collectionName] = collection.variables.reduce(
        (vars, variable) => {
          const variableName = fixText(variable.name)

          const value =
            variable.resolvedType === "COLOR"
              ? rgbtohex(variable.value.r, variable.value.g, variable.value.b)
              : variable.value

          let type = variable.resolvedType.toLowerCase()
          if (type === "float") type = "number"

          vars[variableName] = {
            value: value,
            type: type
          }

          return vars
        },
        {} as Record<string, any>
      )

      return tokenBuilder
    },
    {} as Record<string, any>
  )

  const jsonString = JSON.stringify(tokenObject, null, 2)
  return jsonString.replace(/"([^"]+)":/g, "$1:")
}

/**
 * Converts Figma variable collections into an HTML table.
 *
 * @template T - A list of Figma variable collections.
 * @param {T} dataFigma - The array of Figma collections to convert.
 * @returns {string} An HTML table as a string.
 * @todo This function is not yet implemented.
 */
const toHTMLTable = <T extends FigmaCollection[]>(dataFigma: T): string => {
  return ""
}

/**
 * Merges Figma collections and variables into a single array of objects.
 *
 * @template T - A list of Figma collections.
 * @template U - A list of Figma variables.
 * @param {T} collections - The array of Figma collections to merge.
 * @param {U} variables - The array of Figma variables to merge.
 * @returns {FigmaCollection[]} An array of merged Figma collections and variables.
 */
const mergeCollectionsAndVariables = <
  T extends FigmaCollection[],
  U extends FigmaVariable[]
>(
  collections: T,
  variables: U
): FigmaCollection[] => {
  const tokens: FigmaCollection[] = []

  // Map over collections
  collections.map(collection => {
    // Map over variables
    const newVariables: FigmaVariable[] = collection.variableIds
      .map(variableId => {
        const variable = variables.find(v => v.id === variableId)
        if (variable) {
          return Object.assign({}, variable, {
            name: variable.name,
            value: variable.valuesByMode[Object.keys(variable.valuesByMode)[0]],
            resolvedType: variable.resolvedType
          })
        }
        return undefined
      })
      .filter((variable): variable is FigmaVariable => variable !== undefined)

    // Create a new collection object with the desired structure
    const newCollection: FigmaCollection = {
      id: collection.id,
      name: collection.name,
      variables: newVariables,
      variableIds: collection.variableIds
    }

    tokens.push(newCollection)
  })

  return tokens
}

export {
  getExportOptions,
  filterColors,
  toTokens,
  toCss,
  toHTMLTable,
  mergeCollectionsAndVariables
}
