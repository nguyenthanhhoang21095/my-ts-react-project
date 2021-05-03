import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../components/Layout/Layout'
import styled from 'styled-components'
import Button from '../components/ui-kits/Button/Button'
import withApollo from '../utils/withApollo'
import { useQuery } from '@apollo/react-hooks'
import { GET_PRODUCTS } from '../graphql/product/product.query'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import Card  from '../components/ui-kits/Card/Card'
import CardContent from '../components/ui-kits/Card/CardContent'
import api from "../../controllers/baseApi";
import { CCart } from "../interfaces/cart";
import Router from "next/router";
export const HomeContainer = styled.div``

export const StyledHomeBody = styled.div`
  display: grid;
  justify-content: center;
  position: relative;
  grid-template-columns: auto auto auto auto;
  grid-gap: 50px;
`

function Home() {
  const [cartValue, setCartValue] = useState(0);
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

  // const products = data?.getAllProduct?.data
  // if (!products || !products.length) {
  //   return <p>Not found</p>
  // }

  useEffect(() => {
    api.get('https://min-shop.herokuapp.com/rest/product')
    .then((res) => {
      const resData:any = res.data.data;
      const mapData:any = resData.map((item) => {
        return {
          name: item.name,
          img: item.imgUrl,
          id: item.productId,
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

  const handleAddToCart = (data:Record<string, any>):void => {
    const { name , id,  final_price, inStock } = data;
    const cartProd = new CCart();
    const cartVal = cartProd.addToCart({
      id, 
      final_price, 
      name,
      inStock,
    })
    setCartValue(cartVal + cartValue);
  }

  const handleViewProduct = (product_data) => {
    Router.push(`/detail/${product_data.id}`);
    localStorage.setItem("product_data", JSON.stringify(product_data));
  }

  return (
    <>
      <Head>
        <title>STRANGS Template</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header cartNum={cartValue} />
      <Layout>
        <StyledHomeBody>
          {products.map((data) => (
            <Card
              key={data.id}
              imageURL={data.img}
              buttonGroups={
                <>
                  <Button width="fit-content" handleClick={() => handleAddToCart(data)}>Add to Cart</Button>
                  <Button width="fit-content" handleClick={() => {
                    handleViewProduct(data)
                  }}>View</Button>
                </>
              }
            >
              <CardContent {...data}/>
            </Card>
          ))}
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