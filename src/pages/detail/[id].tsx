import React, { useState, useEffect } from 'react'
import {  InferGetStaticPropsType, GetStaticProps, GetStaticPaths } from 'next'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import Layout from '../../components/Layout/Layout'
import CustomImage from '../../components/ui-kits/CustomImage/CustomImage'
import { StyledCard } from '../../components/ui-kits/Card/Card.styled'
import styled from 'styled-components'
import { formatCurrency } from '../../utils/common'
import Rating from '../../components/ui-kits/Rating/Rating'
import api from '../../../controllers/baseApi'
import { useRouter } from 'next/router'
import endpoint from '../../utils/endpoints'
import Button from "../../components/ui-kits/Button/Button"
import { connect } from "react-redux";
import storageActions from "../../../controllers/redux/actions/storageActions";

const DetailPage = ({ prodData, addToCart }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  // styles page
  const StyledDetailContent = styled.div`
    width: 100%;
    padding: 1.5rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    jusify-content: flex-start;
    font-size: 1.5rem;
  `
  const StyledDetailItem = styled.div`
    padding: 10px 0;
    display: flex;
    align-items: center;
    ${props => props.customStyle};
  `

  const handleAddToCart = (data: Record<string, any>): void => {
    addToCart(data);
  }

  return (
    <>
      <Header />
      <Layout>
        <StyledCard style={{ flexDirection: 'row !important' }}>
          {prodData ? (
            <>
              <CustomImage width="400px" height="300px" src={prodData.image} isHasOverlay={true}  />
              <StyledDetailContent>
                <StyledDetailItem customStyle="padding-top: 0">
                  {prodData.name}
                </StyledDetailItem>
                <StyledDetailItem customStyle="font-weight: bold; color: #ffaf40; font-size: 2rem">
                  {formatCurrency(prodData.finalPrice)} VND
                </StyledDetailItem>
                <StyledDetailItem>
                    Status: {prodData.inStock ? "still in stock" : "out of stock"}
                </StyledDetailItem>
                <StyledDetailItem>
                  <Rating ratingVal={prodData.percentStar} />
                </StyledDetailItem>
                <StyledDetailItem customStyle="padding-bottom: 0">
                  <Button width="200px" height="50px" fontSize="1.5rem" handleClick={() => handleAddToCart(prodData)}>Add to Cart</Button>
                </StyledDetailItem>
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


export const getStaticPaths:GetStaticPaths = async () => {
  let mapId: any = []
  const res = await api.get(endpoint['product'])
  mapId = res.length && res.map((item) => ({
    params: { id: `${item.id}` },
  }))
  return {
    paths: mapId,
    fallback: false,
  }
}

export  const getStaticProps:GetStaticProps = async ({ params }) => {
  const id = params.id
  const prodData:any = await api.get(endpoint['product'] + '/' + id)
  return {
    props: { prodData: prodData ? prodData : null },
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.storage.cart
  }
}

const mapDispatchToProps = {
  addToCart: storageActions.addToCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage)
