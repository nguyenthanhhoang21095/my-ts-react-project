import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../components/Layout/Layout'
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
import { Image } from 'src/components/ui-kits/CustomImage'
import { Button } from '../components/ui-kits/Button'


// dynamic import
const Carousel = dynamic(() => import("../components/Carousel/CustomCarousel/CustomCarousel"))
const HighLightCollection = dynamic(() => import("../components/Collection/HighLightCollection/HighLightCollection"))
const FeaturedProduct = dynamic(() => import("../components/FeaturedProduct/FeaturedProduct"))
const NewCollection = dynamic(() => import("../components/Collection/NewCollection/NewCollection"))

const Home = () => {
  // const [products, setProducts] = useState([]);
  const [carouselData, setCarouselData] = useState([]);
  const Router = useRouter();

  // useEffect(() => {
  //   api.get(endpoint["product"])
  //     .then((res) => {
  //       const resData: any = res;
  //       const mapData: any = resData.map((item) => {
  //         return {
  //           name: item.name,
  //           image: item.image,
  //           id: item.id,
  //           finalPrice: item.finalPrice,
  //           price: item.price,
  //           rating: item.percentStar,
  //           inStock: true,
  //         }
  //       })
  //       setProducts(mapData);
  //     })
  //     .catch((err) => {
  //       throw Error(err);
  //     })
  // }, [])

  useEffect(() => {
    async function fetchData() {
      try {
        const res: any = await api.get('banner');
        if (res) {
          setCarouselData(res);
        }
      } catch (err) {
        console.error(err)
      }
    }

    fetchData();
  }, [])

  return (
    <>
      <Head>
        <title>Demo Shop365</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout isHomeRoute={Router.pathname == "/" || Router.pathname == "/home" ? true : false}>
        <div className={styles['home-body']}>
          <Carousel
            data={carouselData}
            renderProps={(item, idx) => (
              <div key={item.id}>
                <div className={styles['carousel-container']}>
                  <div className={styles['carousel-container__image']}>
                    <Image
                      src={item.image}
                      width="605"
                      height="800"
                      alt={`image ${item.id}`}
                    />
                  </div>
                  <div className={styles['carousel-container__content']}>
                    <h5 className={styles['carousel-container__content--name']}>
                      {item.name}
                    </h5>
                    <h2 className={styles['carousel-container__content--intro']}>
                      {item.intro}
                    </h2>
                    <p className={styles['carousel-container__content--desc']}>
                      {item.description}
                    </p>
                    <Button
                      transitionWidth={idx == carouselData.length - 1}
                      style={{
                        padding: "20px 35px",
                        fontSize: "12px",
                        fontWeight: "600",
                        height: "50px",
                        boxSizing: "border-box",
                        textTransform: "uppercase"
                      }}>
                      Shop now
                    </Button>
                  </div>
                </div>
              </div>
            )}
          >
          </Carousel>
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