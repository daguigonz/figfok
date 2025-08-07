import { useState, useEffect } from "react"
import { MainLayout } from "@layouts/MainLayout"
import { Loading } from "@components/Loading"
import { Button } from "@components/Button"
import { Block } from "@components/Block"

import { getExportOptions, toCss, toTokens, toHTMLTable } from "./utils/figTok"

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
    inputPrefix: {
      value: "--c"
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
      console.log("efect")
    }
  }, [])

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
      const figmaData = message.data
      const initialCode = toCss(figmaData, uiConfig.inputPrefix.value)

      setAppConfig({
        ...appConfig,
        load: false
      })

      setDataFigma(figmaData)

      setUiConfig(prevUiConfig => ({
        ...prevUiConfig,
        panelCode: initialCode
      }))
    } else if (message.type === "error") {
      console.log("error", message.message)
    } else {
      // Catch-all for unknown or unsupported message types
      console.log("message", message)
    }
  }

  const handleSelectOptionExport = (option: string) => {
    let process = processExport(option)
    console.log("click:", option)
    setUiConfig({
      ...uiConfig,
      tab: {
        index: option
      },
      panelCode: process
    })
  }

  const processExport = (optionExport: string): string => {
    let result = " "

    if (optionExport === "Css") {
      result = toCss(dataFigma, uiConfig.inputPrefix.value)
    } else if (optionExport === "Tokens") {
      result = toTokens(dataFigma)
    } else if (optionExport === "Table") {
      result = toHTMLTable(dataFigma)
    }

    return result
  }
  /**
   * Handles the input of the prefix value.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event triggered by the input.
   */
  const handleInputPrefix = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUiConfig({
      ...uiConfig,
      inputPrefix: {
        value: e.target.value
      }
    })
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
            FigTok es un plugin gratuito que convierte design tokens de Figma en
            CSS, JSON y más. Perfecto para diseñadores y developers que buscan
            consistencia visual y entrega rápida. Personaliza prefijos, exporta
            al instante y copia con un clic. Simple, veloz y productivo.
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
            <Block.Col>
              <Block.RenderView> {uiConfig.panelCode} </Block.RenderView>
            </Block.Col>
            <Block.Col className="align-v">
              <div className="m-b-2">
                <label className="m-r-2">Prefijo</label>

                <input
                  type="text"
                  id="Name"
                  name="Name"
                  value={uiConfig.inputPrefix.value}
                  onChange={e => handleInputPrefix(e)}
                />
              </div>

              <Button
                variant="outline"
                size="large"
                fullWidth
                className="m-b-2"
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
