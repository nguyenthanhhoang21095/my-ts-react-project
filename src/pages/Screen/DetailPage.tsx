import React, { useState, useEffect } from 'react'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import Layout from '../../components/Layout/Layout'
import CustomImage from '../../components/ui-kits/CustomImage/CustomImage'
import { StyledCard } from '../../components/ui-kits/Card/Card.styled'
import styled from 'styled-components'
import { formatCurrency } from "../../utils/common";
import Rating from '../../components/ui-kits/Rating/Rating'

const DetailPage = () => {
  const [prodData, setProdData] = useState(null)

  // styles page
  const StyledDetailContent = styled.div`
    width: 100%;
    padding: 0 2.5rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    jusify-content: flex-start;
    font-size: 2rem;
  `

  useEffect(() => {
    const parseData = JSON.parse(localStorage.getItem('product_data'))
    setProdData(parseData)
  }, [])

  return (
    <>
      <Header />
      <Layout>
        <StyledCard style={{ flexDirection: 'row !important' }}>
          {prodData ? (
            <>
              <CustomImage width="300px" height="300px" src={prodData.img} />
              <StyledDetailContent>
                <div>{prodData.name}</div>
                <div>{formatCurrency(prodData.final_price)} VND</div>
                <div>
                    <Rating ratingVal={prodData.rating} />
                </div>
              </StyledDetailContent>
            </>
          ) : (
            <div>Không tìm thấy thông tin sản phẩm</div>
          )}
        </StyledCard>
      </Layout>
      <Footer />
    </>
  )
}

export default DetailPage
