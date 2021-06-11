import React, { useEffect, useState } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Layout from 'src/components/Layout/Layout'
import { Image } from 'src/components/ui-kits/CustomImage'
import { formatCurrency } from 'src/utils/common'
import Rating from 'src/components/ui-kits/Rating/Rating'
import api from 'controllers/baseApi'
import Router from 'next/router';
import endpoint from 'src/utils/endpoints'
import Button from "src/components/ui-kits/Button/Button"
import QuantityButton from "src/components/ui-kits/Button/QuantityButton"
import { connect } from "react-redux";
import storageActions from "controllers/redux/actions/storageActions";
import IProduct from 'src/interfaces/product'
import IUser from 'src/interfaces/user'
import styles from 'src/styles/pages/detail.module.scss'
import classNames from 'classnames'
import Card from 'src/components/ui-kits/Card/Card'
import CardContent from 'src/components/ui-kits/Card/CardContent'

interface DetailPageProps{
  cart: IProduct[];
  userInfo: IUser;
  prodData: IProduct;
  getCart: any;
  showToast: any;
}

const DetailPage: React.FC<DetailPageProps> = ({ prodData, getCart, userInfo = null, cart = [], showToast }): JSX.Element => {
  const [relatedProducts, setRelatedProducts] = useState([])
  const detailData = cart.find(item => item.id === prodData.id);

  useEffect(() => {
    api.get(endpoint["product"])
    .then((res) => {
      const resData:any = res;
      const mapData:any = resData.slice(0, 5).map((item) => {
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
      setRelatedProducts(mapData);
    })
  }, [])

  const handleAddToCart = (data: Record<string, any>): void => {
    const token:string = JSON.parse(localStorage.getItem("access_token")) ?? "";
    if (!userInfo) { 
      Router.push("/auth/login");
      return;
    }
    
    if (userInfo && data && token) {
      api.put(`${endpoint['cart']}`, {
        id: userInfo.id,
        product: data,
        action: "increase"
      }, token).then(res => {
        if (res) {
          console.log('cart', res);
          getCart(res.cart)
          showToast("Đã thêm vào giỏ hàng");
        }
      })
    }
  }
  // const handleGetCart = (data: Record<string, any>): void => {
  //   if (!userInfo) { 
  //     Router.push("/auth/login");
  //     return;
  //   }
  //   getCart(data);
  // }
  
  return (
    <>
      <Layout>
        <div className={classNames(styles['detail-main'], styles['margin-bot-2Rem'])}>
          {prodData ? (
            <>
              <Image width="400px" height="300px" src={prodData.image} isHasOverlay={true}  />
              <div className={styles['detail-main__content']}>
                <div className={classNames(styles['detail-main__content--item'], styles['padding-top-0'])}>
                  {prodData.name}
                </div>
                <div className={classNames(styles['detail-main__content--item'], styles['price-font'])}>
                  {formatCurrency(prodData.finalPrice)} VND
                </div>
                <div className={styles['detail-main__content--item']}>
                    Status: {prodData.inStock ? "still in stock" : "out of stock"}
                </div>
                <div className={styles['detail-main__content--item']}>
                  <Rating ratingVal={prodData.percentStar} />
                </div>
                <div className={styles['detail-main__content--item']}>
                  Quantity: &nbsp; <QuantityButton product={detailData ?? prodData} quantity={detailData?.quantity ?? 0} />
                </div>
                <div className={classNames(styles['detail-main__content--item'], styles['padding-bot-0'])}>
                  <Button width="200px" height="50px" fontSize="1.5rem" handleClick={() => handleAddToCart(prodData)}>Add to Cart</Button>
                </div>
              </div>
            </>
          ) : (
            <div>Không tìm thấy thông tin sản phẩm</div>
          )}
        </div>
        
        {/* Related products */}
        <div className={styles['related-container']}>
          <p className={styles['related-container__title']}>Các sản phẩm liên quan</p>
          <div className={styles['related-container__list']}>
            {relatedProducts.length && relatedProducts.map((data) => (
              <Card key={data.id} imageURL={data.image} productName={data.name}>
                <CardContent
                  {...data}
                  buttonGroups={
                    <>
                      <Button width="fit-content" handleClick={() => handleAddToCart(data)}>
                        Add to cart
                      </Button>
                      <Button
                        width="fit-content"
                        outLine="none"
                        handleClick={() => Router.push(`/detail/${data.id}`)}
                      >
                        View
                      </Button>
                    </>
                  }
                />
              </Card>
            ))}
          </div>
        </div>
      </Layout>
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
    fallback: true,
  }
}

export  const getStaticProps:GetStaticProps = async ({ params }) => {
  const id = params.id
  const prodData:any = await api.get(endpoint['product'] + '/' + id)
  return {
    props: { 
      prodData: prodData ? prodData : null,
    },
  }
}

const mapStateToProps = (state) => {  
  return {
    cart: state.storage.cart,
    userInfo: state.storage.userInfo,
  }
}

const mapDispatchToProps = {
  getCart: storageActions.getCart,
  showToast: storageActions.showToast,
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage)
