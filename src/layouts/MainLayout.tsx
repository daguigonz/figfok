import React from "react";
import "../App.css";
import Banner from "../components/Banner";
import bannerFigTok from "../img/banner.jpg";
import {Button} "@components/Button";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header>
        <Banner
          altImg="Figma"
          image={bannerFigTok}
          copyRightText="Made by Daguigonz"
        />
      </header>

      <main className="container">
        <section>{children}</section>
        <Button variant="primary">Primary de prueba</Button>
      </main>

      <footer>
        <nav className="container">
          <a className="d-btn link" href="#link">
            Desarrollado para programadores
          </a>
          <a className="d-btn outline" href="#donar">
            Dona y apollanos
          </a>
        </nav>
      </footer>
    </>
  );
};

export default MainLayout;
