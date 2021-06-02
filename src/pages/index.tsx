import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../components/Layout/Layout'
import styled from 'styled-components'
import withApollo from '../utils/withApollo'
import { useQuery } from '@apollo/react-hooks'
import { GET_PRODUCTS } from '../graphql/product/product.query'
import api from "../../controllers/baseApi";
import endpoint from "../utils/endpoints";
import ProductList from "../components/Product/ProductList";
import Toast from "../components/ui-kits/Toast/Toast"

export const HomeContainer = styled.div``

export const StyledHomeBody = styled.div`
  display: grid;
  justify-content: center;
  position: relative;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: 80px;
`

function Home() {
  const [products, setProducts] = useState([]);
 
  
  // if (error) return <h1>Error</h1>
  useEffect(() => {
    api.get(endpoint["product"])
    .then((res) => {
      const resData:any = res;
      const mapData:any = resData.map((item) => {
        return {
          name: item.name,
          image: item.image,
          id: item.id,
          finalPrice: item.finalPrice,
          price: item.price,
          rating: item.percentStar,
          inStock: true,
        }
      })
      setProducts(mapData);
    })
    .catch((err) => {
      throw Error(err);
    })
  }, [])

  return (
    <>
      <Head>
        <title>Demo Shop365</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <StyledHomeBody>
          <ProductList products={products}/>
        </StyledHomeBody>
      </Layout>
      {/* Toast */}
      <Toast />
    </>
  )
}

const withApolloWrapper = withApollo({ ssr: true })(Home);
export default withApolloWrapper;