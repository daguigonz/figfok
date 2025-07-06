import { ExportOption, CssType } from "@/types/figma.type"
import { TokenObject } from "@/interfaces/figma.interface"

export class figTok {
  private _collections = []
  public figmaCore = []
  private _variables = []
  private tokens: TokenObject = {}
  private prefixCss: string = "--c"
  private typeCss: CssType = "scss"
  private optionsExport: ExportOption[]

  constructor() {
    this.optionsExport = ["Css", "Json", "Tokens", "Table"]
  }

  public getOptionsExport(): ExportOption[] {
    return this.optionsExport
  }

  public setFigmaCore(figmaCore: any) {
    this.figmaCore = figmaCore
  }

  public async import_collections_and_variables() {
    //   try {
    //     // Obtener colecciones de variables de Figma
    //     const collections =
    //       await this.figmaCore.variables.getLocalVariableCollectionsAsync()
    //
    //     // // Mapear los datos que necesitas
    //     const collectionsData = collections.map(collection => ({
    //       id: collection.id,
    //       name: collection.name,
    //       variableCount: collection.variableIds.length,
    //       modes: collection.modes.map(mode => ({
    //         id: mode.modeId,
    //         name: mode.name
    //       })),
    //       isRemote: collection.remote
    //     }))
    //
    //     // Enviar datos a React - ESTRUCTURA CORRECTA
    //     this.figmaCore.ui.postMessage({
    //       type: "collections-data",
    //       data: collectionsData
    //     })
    //   } catch (error) {
    //     // Enviar error a React - ESTRUCTURA CORRECTA
    //     this.figmaCore.ui.postMessage({
    //       type: "error",
    //       message:
    //         "Error al obtener colecciones: " +
    //         (error instanceof Error ? error.message : "Error desconocido")
    //     })
    //   }
    // }
  }
}
