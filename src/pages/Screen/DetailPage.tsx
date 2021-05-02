import React from "react"
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import Layout from '../../components/Layout/Layout'
import { StyledCard } from "../../components/ui-kits/Card/Card.styled";
const DetailPage = () => {
    return (
       <>
        <Header />
        <Layout>
            <StyledCard>
                card content
            </StyledCard>
        </Layout>
        <Footer />
      </>
    )
}

export default DetailPage;