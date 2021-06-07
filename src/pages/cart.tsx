import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import IUser from '../interfaces/user'
import Layout from '../components/Layout/Layout'
import styles from '../styles/cart.module.css'
import { formatCurrency } from "../utils/common";
import QuantityButton from "../components/ui-kits/Button/QuantityButton";
import { Button } from "../components/ui-kits/Button"
import { GetStaticProps, GetStaticPaths } from 'next'
import endpoint from 'src/utils/endpoints'
import api from 'controllers/baseApi'
import { getDataLocal } from 'controllers/redux/lib/reducerConfig'
import Image from 'src/components/ui-kits/CustomImage/CustomImage'

interface CartProps {
  userInfo: IUser;
  cart: any;
}

const Cart: React.FC<CartProps> = ({ cart = [], userInfo = null }): JSX.Element => {
  const [cartData, setCartData] = useState([])
  useEffect(() => {
    api.get(`${endpoint['cart']}/${userInfo.id}`, true)
    .then((res) => {
      if (res?.cart) {
        setCartData(res.cart)
      }
    })
  }, [cart])
  console.log(cartData);
  
  return (
    <>
      <Layout>
        <p className={styles.title}>Giỏ hàng</p>
        <div className={styles.container}>
          {cartData.length ? (
            <div className={styles.cartContainer}>
              {cartData.map((item, idx) => (
                <div key={item.id + idx} className={styles.itemLabel}>
                  <div className={styles.itemContent}>
                    <Image src={item.image} width="80px" height="80px" />
                    <div className={styles.itemInfo}>
                      {item.name}
                    </div>
                  </div>

                  <div className={styles.itemContent}>
                      <p className={styles.itemPrice}>
                        Price:  <span className={styles.itemValue}>{formatCurrency(item.finalPrice)}</span>
                      </p>
                      <div className={styles.itemContent}>
                        <span className={styles.itemQuantity}>Quantity:</span>
                        <QuantityButton product={item} quantity={item.quantity}/>
                      </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>Giỏ hàng hiện tại đang trống</div>
          )}
        </div>
      </Layout>
    </>
  )
}

export const getStaticPaths:GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async() => {
  return {
    props: {}
  }
}

const mapStateToProps = (state) => ({
  cart: state.storage.cart,
  userInfo: state.storage.userInfo,
})

export default connect(mapStateToProps)(Cart)
