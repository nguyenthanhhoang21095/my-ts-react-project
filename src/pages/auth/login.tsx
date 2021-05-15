import React, { useState, useEffect } from 'react'
import { InferGetStaticPropsType, GetStaticProps, GetStaticPaths } from 'next'
import api from '../../../controllers/baseApi'
import endpoint from '../../utils/endpoints'
import styles from '../../styles/auth.module.css'
import Router from 'next/router'
import Toast from '../../components/ui-kits/Toast/Toast'
import storageActions from '../../../controllers/redux/actions/storageActions'
import { connect } from 'react-redux'
import Link from 'next/link'

const Login = ({
  showToast,
  getUserInfo,
  getCart,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  const [account, setAccount] = useState('')
  const [pass, setPass] = useState('')

  const handleAction = () => {
    if (!account.length || !pass.length) {
      showToast('Bạn chưa điền đủ thông tin')
      return;
    }

    api.get(`${endpoint['user']}`).then((res) => {
      const idxUser = res.findIndex((item) => item.account === account)
      if (idxUser == -1) {
        showToast('Người dùng không tồn tại')
        return;
      }
    })

    api
      .post(`${endpoint['user']}/auth`, {
        account,
        password: pass,
      })
      .then((res) => {
        if (res) {
          Router.back()
          getUserInfo(res)
          setTimeout(() => { 
            showToast('Đăng nhập thành công')
            const userId = res.id
            // api.get(`${endpoint['cart']}/${userId}`)
            // .then(otherRes => {
            //   getCart(otherRes)
            // })
          }, 500)
        } else {
          showToast('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin')
        }
      })
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.signUp}>
        <h1 className={styles.signUpTitle}>Login Form</h1>
        <input
          onChange={(event) => setAccount(event.target.value)}
          type="text"
          className={styles.signUpInput}
          value={account}
          placeholder="What's your username?"
        />
        <input
          onChange={(event) => setPass(event.target.value)}
          type="password"
          className={styles.signUpInput}
          value={pass}
          placeholder="Type your password"
        />
        <button onClick={handleAction} value="Sign me up!" className={styles.signUpSubmit}>
          Sign me up!
        </button>

        <div className={styles.link}></div>
        <Link href="/auth/signup">
          <a>I don't have an account</a>
        </Link>
      </div>

      <Toast />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { status: false },
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  showToast: storageActions.showToast,
  getUserInfo: storageActions.getUserInfo,
  getCart: storageActions.getCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
