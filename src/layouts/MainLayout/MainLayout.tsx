import React from "react"
import "@/App.css"
import "@/css/reset.css"
import "@/css/utils.css"
import styles from "./MainLayout.module.css"

import { clsx } from "clsx"
import Banner from "@components/Banner"
import bannerFigTok from "../../img/banner.jpg"

import { Button } from "@components/Button"

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
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
        <section className={styles.wrapper}>{children}</section>
      </main>

      <footer>
        <nav className="container">
          <a className="d-btn link" href="#link">
            Ver còdigo fuente y contribuir
          </a>

          <Button variant="outline">Colabora para la gaseosa</Button>
        </nav>
      </footer>
    </>
  )
}

const Tabs = ({ children, className, ...props }: any) => {
  return (
    <div className={clsx(styles.tabs, className)} {...props}>
      {children}
    </div>
  )
}

const Hr = ({ ...props }: {}) => {
  return <hr className={styles.hr} {...props} />
}

MainLayout.displayName = "MainLayout"
MainLayout.Tabs = Tabs
MainLayout.Hr = Hr

export default MainLayout
