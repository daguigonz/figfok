import { useRef } from "react";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <>
      <MainLayout>
        <div className="text">
          FigTok es un plugin gratuito que convierte design tokens de Figma en
          CSS, JSON y más. Perfecto para diseñadores y developers que buscan
          consistencia visual y entrega rápida. Personaliza prefijos, exporta al
          instante y copia con un clic. Simple, veloz y productivo.
        </div>
      </MainLayout>
    </>
  );
}

export default App;
