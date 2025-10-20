import { useState, useEffect } from "react"
import { MainLayout } from "@layouts/MainLayout"
import { Loading } from "@components/Loading"
import { Button } from "@components/Button"
import { Switch } from "@components/Switch"
import { Block } from "@components/Block"
import { ColorPalette } from "@components/ColorPalette"

import {
  getExportOptions,
  toCss,
  toTokens,
  toColorPalette
} from "@/utils/figTok"

function App() {
  const optionsExport = getExportOptions()
  const [dataFigma, setDataFigma] = useState([])
  const [appConfig, setAppConfig] = useState({
    load: true,
    optionsExport
  })
  const [uiConfig, setUiConfig] = useState({
    tab: {
      index: "Css"
    },
    panelCode: " ",
    colorPalette: {
      value: {}
    },
    inputPrefix: {
      value: "--c"
    },
    switchAddPrefixCollection: {
      value: true,
      label: "Incluir collection"
    }
  })

  /**
   * Initializes the application by establishing a connection with the Figma plugin.
   *
   * This function sets up the necessary event listeners and calls the `connectFigma`
   * function to initiate the communication.
   */
  useEffect(() => {
    connectFigma()

    window.onmessage = event => {
      callBackFigma(event)
    }
  }, [])

  useEffect(() => {
    // Re-run the export process whenever the relevant config or data changes.
    // The check for dataFigma.length prevents this from running on the initial empty state.
    if (dataFigma.length > 0) {
      processExport(uiConfig.tab.index)
    }
  }, [
    uiConfig.inputPrefix.value,
    uiConfig.switchAddPrefixCollection.value,
    dataFigma
  ])

  /**
   * Initiates communication from the UI (iframe) to the Figma plugin.
   *
   * Sends a postMessage with a custom message type that the plugin
   * should interpret as a data request trigger.
   *
   * Note:
   * - We use "*" as the `targetOrigin` because Figma does not expose a fixed origin
   *   within its plugin environment.
   */
  const connectFigma = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: "request-figma"
        }
      },
      "*"
    )
  }

  /**
   * Listener for messages sent from the Figma plugin to the UI.
   *
   * This function acts as the central dispatcher for plugin-to-UI communication,
   * interpreting different message types and updating the app state accordingly.
   *
   * Behavior:
   * - type === "data-figma": Sets `appConfig.load` to false and updates Figma data state.
   * - type === "error": Logs the error message sent by the plugin.
   * - unknown type: Logs the entire message for debugging purposes.
   *
   * @param {MessageEvent} event - The message event received via `postMessage`.
   */
  const callBackFigma = async (event: MessageEvent) => {
    // Ignore invalid messages or unexpected structure
    if (!event.data || !event.data.pluginMessage) return

    const message = event.data.pluginMessage

    // Safeguard: pluginMessage must include a valid `type`
    if (!message.type) return

    // Handle supported message types
    if (message.type === "data-figma") {
      // Set dataFigma which will trigger the useEffect to process the code
      setDataFigma(message.data)

      setTimeout(() => {
        setAppConfig({
          ...appConfig,
          load: false
        })
      }, 2000)
    } else if (message.type === "error") {
      console.log("error", message.message)
    } else {
      // Catch-all for unknown or unsupported message types
      console.log("message", message)
    }
  }

  /**
   * Handles the selection of an export option.
   *
   * @param {string} option - The selected export option (e.g., "Css", "Tokens").
   */
  const handleSelectOptionExport = (option: string) => {
    processExport(option)
  }

  /**
   * Processes the export based on the selected option.
   *
   * This function generates the code string based on the selected format (Css, Tokens, etc.),
   * and updates the UI state to display the result.
   *
   * @param {string} optionExport - The export format to use.
   * @returns {string} The generated code string.
   */
  const processExport = (optionExport: string): string => {
    let result = " "
    let resultColorPalette: Record<string, string> = {}
    const params = {
      prefix: uiConfig.inputPrefix.value,
      includeCollections: uiConfig.switchAddPrefixCollection.value,
      filterColors: false,
      filterNumber: false
    }

    if (dataFigma.length === 0) {
      return ""
    }

    if (optionExport === "Css") {
      result = toCss(dataFigma, params)
    } else if (optionExport === "Tokens") {
      result = toTokens(dataFigma)
    } else if (optionExport === "Color") {
      resultColorPalette = toColorPalette(dataFigma, params)
    }

    setUiConfig(prevUiConfig => ({
      ...prevUiConfig,
      tab: {
        index: optionExport
      },
      panelCode: result,
      colorPalette: {
        value: resultColorPalette
      }
    }))

    return result
  }
  /**
   * Handles changes to the prefix input field.
   *
   * Updates the UI state with the new prefix value. The component's `useEffect`
   * hook will then trigger a re-export.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   */
  const handleInputPrefix = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only update the state here. The useEffect will handle the rest.
    setUiConfig(prevUiConfig => ({
      ...prevUiConfig,
      inputPrefix: {
        value: e.target.value
      }
    }))
  }

  /**
   * Handles the toggle of the 'include collections' switch.
   *
   * Updates the UI state with the new boolean value. The component's `useEffect`
   * hook will then trigger a re-export.
   *
   * @param {boolean} checked - The new value of the switch.
   */
  const handleSwitchOnchange = (checked: boolean) => {
    // Only update the state here. The useEffect will handle the rest.
    setUiConfig(prevUiConfig => ({
      ...prevUiConfig,
      switchAddPrefixCollection: {
        ...prevUiConfig.switchAddPrefixCollection,
        value: checked
      }
    }))
  }

  return (
    <>
      {appConfig.load ? (
        <div className="container load">
          <Loading.Title>Procesando proyecto</Loading.Title>
          <Loading visible="visible" variant="circle" />
          <Loading.Text> Cargando datos ...</Loading.Text>
        </div>
      ) : (
        <MainLayout>
          <div className="text">
            FigTok convierte design tokens de Figma en CSS, JSON y más. Para
            diseñadores y developers que quieren rapidez y consistencia.
            Personaliza, exporta y copia fácil.
          </div>

          <Block variant="nowrap">
            <MainLayout.Tabs className="">
              {optionsExport.map((option, index) => (
                <Button
                  variant={uiConfig.tab.index === option ? "active" : "outline"}
                  onClick={() => handleSelectOptionExport(option)}
                  key={index}
                >
                  {option}
                </Button>
              ))}
            </MainLayout.Tabs>
          </Block>

          <MainLayout.Hr />

          <Block className="p-b-2" variant="grid" col={"col_70_20"}>
            <Block.Col className="m-r-2">
              {/* Render - init */}
              {uiConfig.tab.index === "Color" && (
                <ColorPalette
                  variant="base"
                  values={uiConfig.colorPalette.value}
                />
              )}

              {["Css", "Tokens"].includes(uiConfig.tab.index) && (
                <Block.RenderView> {uiConfig.panelCode} </Block.RenderView>
              )}
              {/* Render - end */}
            </Block.Col>
            <Block.Col className="align-v">
              <div className="m-b-1">
                <h2>Opciones</h2>
                {["Css", "Color"].includes(uiConfig.tab.index) && (
                  <div className="w-full">
                    <label className="m-r-1">Prefijo</label>

                    <input
                      type="text"
                      id="Name"
                      name="Name"
                      className="m-b-1"
                      value={uiConfig.inputPrefix.value}
                      onChange={e => handleInputPrefix(e)}
                    />

                    <Switch
                      id="switch"
                      variant="primary"
                      checked={uiConfig.switchAddPrefixCollection.value}
                      onChange={e => handleSwitchOnchange(e)}
                    >
                      {uiConfig.switchAddPrefixCollection.label}
                    </Switch>
                  </div>
                )}
              </div>

              <Button
                variant="outline"
                size="medium"
                fullWidth
                className="m-b-1"
              >
                Copy
              </Button>

              <Button
                variant="primary"
                size="large"
                fullWidth
                className="m-b-2"
              >
                Descarga
              </Button>
            </Block.Col>
          </Block>
        </MainLayout>
      )}
    </>
  )
}

export default App
