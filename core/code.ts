import { mergeCollectionsAndVariables } from "../src/utils/figTok"

/*
 * Figma UI
 * https://www.figma.com/plugin-docs/api/properties/showui/
 *
 * Mostrar la UI
 */
const settingsFigmaUI = {
  themeColors: true,
  height: 600,
  width: 600
}

figma.showUI(__html__, settingsFigmaUI)

/*
 * Figma whatch`s
 * https://www.figma.com/plugin-docs/api/properties/onmessage/
 *
 * Metodo "onmessage" que retorna un objeto, mediante la variable "type"
 * se puede identificar el tipo de mensaje
 *
 */
figma.ui.onmessage = async (msg: any) => {
  try {
    switch (msg.type) {
      case "request-figma":
        // await handle_collections_and_variables() // Nuevo caso
        handle_figma()
        break

      default:
        console.error("Mensaje no manejado:", msg.type)
    }
  } catch (error) {
    // Enviar error a la UI
    figma.ui.postMessage({
      type: "error",
      message: error instanceof Error ? error.message : "Error desconocido"
    })
  }
}

/*
 * Figma whatch`s
 * https://www.figma.com/plugin-docs/api/properties/onmessage/
 *
 * Metodo "onmessage" que retorna un objeto, mediante la variable "type"
 * se puede identificar el tipo de mensaje
 *
 */
async function handle_figma() {
  try {
    const collections = await figma.variables.getLocalVariableCollectionsAsync()
    const variables = await figma.variables.getLocalVariablesAsync()
    const collectionsData = mergeCollectionsAndVariables(collections, variables)

    console.log(collectionsData)

    figma.ui.postMessage({
      type: "collections-data",
      data: collectionsData
    })
  } catch (error) {
    figma.ui.postMessage({
      type: "error",
      message:
        "Error al obtener colecciones: " +
        (error instanceof Error ? error.message : "Error desconocido")
    })
  }
}
