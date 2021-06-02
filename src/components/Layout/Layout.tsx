import React from 'react'
import { StyledLayout } from './Layout.styled'
import { Header } from 'src/components/Header'
import { Footer } from 'src/components/Footer'

interface LayoutProps {
  children: React.ReactNode
}

const OptimizeHeader = React.memo((props) => (
  <Header />
))

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <>
      <OptimizeHeader />
      <StyledLayout>{props.children}</StyledLayout>
      <Footer />
    </>
  )
}

export default Layout
