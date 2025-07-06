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

function handle_figma() {
  try {
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

  // figma.ui.postMessage({
  //   type: "collections-data",
  //   data: coreFigma
  // })
}

// Nueva función para obtener colecciones
async function handle_collections_and_variables() {
  try {
    // Obtener colecciones de variables de Figma
    const collections = await figma.variables.getLocalVariableCollectionsAsync()

    // Mapear los datos que necesitas
    const collectionsData = collections.map(collection => ({
      id: collection.id,
      name: collection.name,
      variableCount: collection.variableIds.length,
      modes: collection.modes.map(mode => ({
        id: mode.modeId,
        name: mode.name
      })),
      isRemote: collection.remote
    }))

    // Enviar datos a React - ESTRUCTURA CORRECTA
    figma.ui.postMessage({
      type: "collections-data",
      data: collectionsData
    })
  } catch (error) {
    // Enviar error a React - ESTRUCTURA CORRECTA
    figma.ui.postMessage({
      type: "error",
      message:
        "Error al obtener colecciones: " +
        (error instanceof Error ? error.message : "Error desconocido")
    })
  }
}
