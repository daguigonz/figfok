import { useRef, useState, useEffect } from "react"
import { MainLayout } from "@layouts/MainLayout"
import { Loading } from "@components/Loading"
import { Button } from "@components/Button"
import { Block } from "@components/Block"

import { figTok } from "./utils/figTok"

function App() {
  const _figTok = new figTok()
  const optionsExport = _figTok.getOptionsExport()

  const [appConfig, setAppConfig] = useState({
    load: true,
    optionsExport
  })

  const [uiConfig, setUiConfig] = useState({
    tab: {
      index: "Css"
    },
    inputPrefix: {
      value: "--c"
    }
  })

  useEffect(() => {
    init()

    window.onmessage = event => {
      callBackFigma(event)
    }
  }, [uiConfig])

  const init = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: "request-figma"
        }
      },
      "*"
    )
  }

  const callBackFigma = async (event: MessageEvent) => {
    if (!event.data || !event.data.pluginMessage) {
      return
    }

    const message = event.data.pluginMessage

    if (!message.type) {
      return
    }

    const figmaCore = message.data

    switch (message.type) {
      case "collections-data":
        setAppConfig({
          ...appConfig,
          load: false
        })

        // console.log("collections-data", collections)
        break

      case "error":
        console.log("error", message.message)
        break

      default:
        console.log("message", message)
    }
  }

  const handleSelectOptionExport = (option: string) => {
    setUiConfig({
      ...uiConfig,
      tab: {
        index: option
      }
    })
  }

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

            <div>
              <label className="m-r-2">Prefijo</label>

              <input
                type="text"
                id="Name"
                name="Name"
                value={uiConfig.inputPrefix.value}
                onChange={e => handleInputPrefix(e)}
              />
            </div>
          </Block>

          <MainLayout.Hr />

          <Block className="p-t-b-3" variant="grid" col={"col_70_20"}>
            <Block.Col> col 1 </Block.Col>
            <Block.Col className="align-v">
              <Button variant="primary" className="m-b-2">
                Descarga
              </Button>
              <Button variant="outline"> Copy </Button>
            </Block.Col>
          </Block>
        </MainLayout>
      )}
    </>
  )
}

export default App
