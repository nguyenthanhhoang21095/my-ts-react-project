import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../components/Layout/Layout'
import styled from 'styled-components'
import withApollo from '../utils/withApollo'
import { useQuery } from '@apollo/react-hooks'
import { GET_PRODUCTS } from '../graphql/product/product.query'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import api from "../../controllers/baseApi";
import endpoint from "../utils/endpoints";
import ProductList from "../components/Product/ProductList";

export const HomeContainer = styled.div``

export const StyledHomeBody = styled.div`
  display: grid;
  justify-content: center;
  position: relative;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: 80px;
`

function Home() {
  const [products, setProducts] = useState([])
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {
      input: {
        page: 1,
        keyword: 'Samsung',
      },
    },
  })
  if (error) return <h1>Error</h1>
  if (loading) return <h1>Loading...</h1>

  useEffect(() => {
    api.get(endpoint["product"])
    .then((res) => {
      const resData:any = res;
      const mapData:any = resData.map((item) => {
        return {
          name: item.name,
          img: item.image,
          id: item.id,
          final_price: item.finalPrice,
          price: item.price,
          rating: item.percentStar,
          inStock: true,
        }
      })
      setProducts(mapData);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <>
      <Head>
        <title>STRANGS Template</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Layout>
        <StyledHomeBody>
          <ProductList products={products}/>
        </StyledHomeBody>
      </Layout>
      <Footer />
    </>
  )
}

export default withApollo({ ssr: true })(Home)
// Mang 3 interface bài 1 vào bài 2 để vào folder Interface
// Sửa trang home & productCard
// Tạo thư mục controller: tạo 1 interface class cho api
// gọi và hiển thị api product
// làm function add to card cho thay đổi state cart => hiển thị cart