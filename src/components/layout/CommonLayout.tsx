import type { ReactNode } from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"
import ScrollToTop from "../modules/ScrollToTop"

interface IProps {
      children: ReactNode
};

const CommonLayout = ({ children }: IProps) => {
      return (
            <div className="min-h-screen flex flex-col">
                  <Navbar />
                  <div className="grow">{children}</div>
                  <Footer />
                  <ScrollToTop />
            </div>
      )
}

export default CommonLayout