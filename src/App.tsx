import { useRef, useState, useEffect } from "react";
import { MainLayout } from "@layouts/MainLayout";
import { Loading } from "@components/Loading";
import { Button } from "@components/Button";
import { Block } from "@components/Block";

function App() {
  const [appConfig, setAppConfig] = useState({
    load: true,
  });

  const [tab, setTab] = useState("Css");

  useEffect(() => {
    setAppConfig({ load: false });
  }, [tab, appConfig]);

  return (
    <>
      {appConfig.load ? (
        <div className="container load">
          <Loading.Title>Procesando Figma</Loading.Title>
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

          <MainLayout.Tabs>
            <Button variant="primary"> Css </Button>
            <Button variant="primary"> Json </Button>
            <Button variant="primary"> Tokens </Button>
          </MainLayout.Tabs>

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
  );
}

export default App;
