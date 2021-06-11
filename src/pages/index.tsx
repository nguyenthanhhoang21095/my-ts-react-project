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
import { useRouter } from 'next/router'
import styles from '../styles/pages/home.module.scss'

export const HomeContainer = styled.div``

function Home() {
  const [products, setProducts] = useState([]);
  const Router = useRouter();
  
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
      <Layout isHomeRoute={Router.pathname == "/" || Router.pathname == "/home" ? true : false}>
        <div className={styles['home-body']}>
          <div className={styles['products-container']}>
           <ProductList products={products}/>
          </div>
        </div>
      </Layout>
      {/* Toast */}
      <Toast />
    </>
  )
}

const withApolloWrapper = withApollo({ ssr: true })(Home);
export default withApolloWrapper;