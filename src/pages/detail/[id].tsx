import React, { useState, useEffect } from 'react'
import {  InferGetStaticPropsType, GetStaticProps, GetStaticPaths } from 'next'
import Layout from '../../components/Layout/Layout'
import CustomImage from '../../components/ui-kits/CustomImage/CustomImage'
import { StyledCard } from '../../components/ui-kits/Card/Card.styled'
import { formatCurrency } from '../../utils/common'
import Rating from '../../components/ui-kits/Rating/Rating'
import api from '../../../controllers/baseApi'
import Router from 'next/router';
import endpoint from '../../utils/endpoints'
import Button from "../../components/ui-kits/Button/Button"
import QuantityButton from "../../components/ui-kits/Button/QuantityButton"
import { connect } from "react-redux";
import storageActions from "../../../controllers/redux/actions/storageActions";
import IProduct from '../../interfaces/product'
import IUser from '../../interfaces/user'
import styles from '../../styles/detail.module.css'
import classNames from 'classnames'

interface DetailPageProps{
  cart: IProduct[];
  userInfo: IUser;
  addToCart: (IProduct) => void;
  prodData: IProduct;
}

const DetailPage: React.FC<DetailPageProps> = ({ prodData, addToCart, userInfo = null, cart = [] }): JSX.Element => {
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
        <div className={styles.detailMain}>
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
                <div className={classNames(styles.detailItem, styles.paddingBottom0)}>
                  <QuantityButton product={detailData ?? prodData} quantity={detailData?.quantity ?? 0} />
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
    fallback: false,
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
