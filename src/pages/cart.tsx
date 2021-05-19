import React from 'react'
import { connect } from 'react-redux'
import IProduct from '../interfaces/product'
import IUser from '../interfaces/user'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import Layout from '../components/Layout/Layout'
import styles from '../styles/cart.module.css'
import { formatCurrency } from "../utils/common";
import QuantityButton from "../components/ui-kits/Button/QuantityButton";
import { Button } from "../components/ui-kits/Button"
import Router from "next/router";

interface CartProps {
  cart: IProduct[];
  userInfo: IUser;
}

const Cart: React.FC<CartProps> = ({ cart = [], userInfo }): JSX.Element => {
  
  return (
    <>
      <Header />
      <Layout>
        <div className={styles.container}>
          {cart.length ? (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles['table-head']}>ID</th>
                  <th className={styles['table-head']}>Name</th>
                  <th className={styles['table-head']}>Image</th>
                  <th className={styles['table-head']}>Value</th>
                  <th className={styles['table-head']}>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, idx) => (
                  <tr key={idx+item.id}>
                    <td className={styles['table-data']}>{item.id}</td>
                    <td className={styles['table-data']}>{item.name}</td>
                    <td className={styles['table-data']}>{item.name}</td>
                    <td className={styles['table-data']}>{formatCurrency(item.quantity * item.finalPrice)} VND</td>
                    <td className={styles['table-data']}>
                      <QuantityButton product={item} quantity={item.quantity}/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>Giỏ hàng hiện tại đang trống</div>
          )}
        </div>
      </Layout>
      <Footer />
    </>
  )
}

export const getServerSideProps = () => {
  return {
    props: {
      
    }
  }
}

const mapStateToProps = (state) => ({
  cart: state.storage.cart,
  userInfo: state.storage.userInfo,
})

export default connect(mapStateToProps)(Cart)
