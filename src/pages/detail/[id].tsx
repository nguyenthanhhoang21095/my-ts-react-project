import React, { useState, useEffect } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType, GetStaticProps } from 'next'
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

const DetailPage = ({ prodData }): JSX.Element => {
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

  return (
    <>
      <Header />
      <Layout>
        <StyledCard style={{ flexDirection: 'row !important' }}>
          {prodData ? (
            <>
              <CustomImage width="300px" height="300px" src={prodData.image} />
              <StyledDetailContent>
                <div>{prodData.name}</div>
                <div>{formatCurrency(prodData.finalPrice)} VND</div>
                <div>
                  <Rating ratingVal={prodData.percentStar} />
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


export async function getStaticPaths() {
  let mapId: any = []
  const res = await api.get(endpoint['product'])
  mapId = res.length && res.map((item) => ({
    params: { id: `${item.id}` },
  }))
  return {
    paths: mapId,
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const id = params.id
  const prodData = await api.get(endpoint['product'] + '/' + id)
  return {
    props: { prodData: prodData ? prodData : null },
  }
}
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const id = context.query.id;
//   const prodData = await api.get(endpoint["product"] + '/' + id);
//   return {
//     props: { prodData: prodData }
//   }
// }

export default DetailPage
