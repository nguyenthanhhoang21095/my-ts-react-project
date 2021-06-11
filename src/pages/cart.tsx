import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import IUser from 'src/interfaces/user'
import Layout from 'src/components/Layout/Layout'
import styles from 'src/styles/pages/cart.module.scss'
import { formatCurrency } from "src/utils/common";
import QuantityButton from "src/components/ui-kits/Button/QuantityButton";
// import { Button } from "src/components/ui-kits/Button"
import { GetStaticProps } from 'next'
import endpoint from 'src/utils/endpoints'
import api from 'controllers/baseApi'
import { Image } from 'src/components/ui-kits/CustomImage'

interface CartProps {
  userInfo: IUser;
  cart: any;
}

const Cart: React.FC<CartProps> = ({ cart = [], userInfo = null }): JSX.Element => {
  console.log('cart',cart);
  
  const [cartData, setCartData] = useState([]);
  
  useEffect(() => {
    // const token:string = JSON.parse(localStorage.getItem("access_token")) ?? "";
    // if (userInfo && token) {
    //   api.get(`${endpoint['cart']}/${userInfo.id}`, token)
    //   .then((res) => {
    //     if (res?.cart) {
    //       setCartData(res?.cart)
    //     }
    //   })
    // }
  }, [])
  
  return (
    <>
      <Layout>
        <p className={styles.title}>Giỏ hàng</p>
        <div className={styles.container}>
          { cart.length ? (
            <div className={styles.cartContainer}>
              { cart.map((item, idx) => (
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

export const getStaticProps: GetStaticProps = async() => {
  return {
    props: {}
  }
}

const mapStateToProps = (state) => ({
  cart: state.storage.cart,
  userInfo: state.storage.userInfo,
})

export default connect(mapStateToProps, {})(Cart)