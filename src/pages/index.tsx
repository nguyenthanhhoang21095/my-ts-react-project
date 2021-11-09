import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../components/Layout/Layout'
import styled from 'styled-components'
import withApollo from '../utils/withApollo'
import { useQuery } from '@apollo/react-hooks'
import { GET_PRODUCTS } from '../graphql/product/product.query'
import api from "../../controllers/baseApi";
import endpoint from "../utils/endpoints";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { Toast } from "../components/ui-kits/Toast"
import { useRouter } from 'next/router'
import styles from '../styles/pages/home.module.scss'
import dynamic from 'next/dynamic'

// dynamic import
const Carousel = dynamic(() => import("../components/Carousel/CustomCarousel"))
const HighLightCollection = dynamic(() => import("../components/Collection/HighLightCollection/HighLightCollection"))
const FeaturedProduct = dynamic(() => import("../components/FeaturedProduct/FeaturedProduct"))
const NewCollection = dynamic(() => import("../components/Collection/NewCollection/NewCollection"))

const Home = () => {
  const [products, setProducts] = useState([]);
  const Router = useRouter();

  useEffect(() => {
    api.get(endpoint["product"])
      .then((res) => {
        const resData: any = res;
        const mapData: any = resData.map((item) => {
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
          <Carousel />
          <div className={styles['home-body__product']}>
            <HighLightCollection />
            <FeaturedProduct />
            <NewCollection />
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