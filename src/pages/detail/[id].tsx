import React, { useEffect, useState } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Layout from 'src/components/Layout/Layout'
import CustomImage from 'src/components/ui-kits/CustomImage/CustomImage'
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
import styles from 'src/styles/detail.module.css'
import classNames from 'classnames'
import Card from 'src/components/ui-kits/Card/Card'
import IconButton from 'src/components/ui-kits/IconButton/IconButton'
import CardContent from 'src/components/ui-kits/Card/CardContent'

interface DetailPageProps{
  cart: IProduct[];
  userInfo: IUser;
  addToCart: (IProduct) => void;
  prodData: IProduct;
}

const DetailPage: React.FC<DetailPageProps> = ({ prodData, addToCart, userInfo = null, cart = [] }): JSX.Element => {
  const [relatedProducts, setRelatedProducts] = useState([])
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
    if (!userInfo) { 
      Router.push("/auth/login");
      return;
    }
    addToCart(data);
  }

  const detailData = cart.find(item => item.id === prodData.id);
  
  return (
    <>
      <Layout>
        <div className={classNames(styles.detailMain, styles.marginBottom2Rem)}>
          {prodData ? (
            <>
              <CustomImage width="400px" height="300px" src={prodData.image} isHasOverlay={true}  />
              <div className={styles.detailContent}>
                <div className={classNames(styles.detailItem,styles.paddingTop0)}>
                  {prodData.name}
                </div>
                <div className={classNames(styles.detailItem, styles.priceFont)}>
                  {formatCurrency(prodData.finalPrice)} VND
                </div>
                <div className={styles.detailItem}>
                    Status: {prodData.inStock ? "still in stock" : "out of stock"}
                </div>
                <div className={styles.detailItem}>
                  <Rating ratingVal={prodData.percentStar} />
                </div>
                <div className={styles.detailItem}>
                  Quantity: &nbsp; <QuantityButton product={detailData ?? prodData} quantity={detailData?.quantity ?? 0} />
                </div>
                <div className={classNames(styles.detailItem, styles.paddingBottom0)}>
                  <Button width="200px" height="50px" fontSize="1.5rem" handleClick={() => handleAddToCart(prodData)}>Add to Cart</Button>
                </div>
              </div>
            </>
          ) : (
            <div>Không tìm thấy thông tin sản phẩm</div>
          )}
        </div>
        
        {/* Related products */}
        <div className={styles.relatedContain}>
          <p className={styles.relatedTitle}>Các sản phẩm liên quan</p>
          <div className={styles.relatedList}>
            {relatedProducts.length && relatedProducts.map((data) => (
              <Card key={data.id} imageURL={data.image} productName={data.name}>
                <CardContent
                  {...data}
                  buttonGroups={
                    <>
                      <Button width="fit-content" handleClick={() => handleAddToCart(data)}>
                        Add to cart
                      </Button>
                      <IconButton
                        img="/images/icons/view.png"
                        width="25px"
                        height="25px"
                        handleClick={() => Router.push(`/detail/${data.id}`)}
                      />
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
  addToCart: storageActions.addToCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage)
