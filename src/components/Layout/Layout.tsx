import React from 'react'
import { StyledLayout, StyledLayoutContain } from './Layout.styled'
import { Header } from 'src/components/Header'
import { Footer } from 'src/components/Footer'
import { Banner } from 'src/components/Banner'
interface LayoutProps {
  children: React.ReactNode;
  customStyle?: string;
  isHomeRoute?: boolean;
}

const OptimizeHeader = React.memo((props) => (
  <Header />
))

const Layout: React.FC<LayoutProps> = ({children, customStyle="", isHomeRoute=false}):JSX.Element => {
  return (
    <>
      <OptimizeHeader />
        { isHomeRoute &&
          <StyledLayoutContain>
            <Banner />
          </StyledLayoutContain>
        }
      <StyledLayout customStyle={customStyle}>{children}</StyledLayout>
      <Footer />
    </>
  )
}

export default Layout
