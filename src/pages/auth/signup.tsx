import React, { useState, useEffect } from 'react'
import { InferGetStaticPropsType, GetStaticProps, GetStaticPaths } from 'next'
import api from '../../../controllers/baseApi'
import endpoint from '../../utils/endpoints'
import styles from '../../styles/auth.module.css'
import Router from 'next/router'
import Toast from '../../components/ui-kits/Toast/Toast'
import storageActions from '../../../controllers/redux/actions/storageActions'
import { connect } from 'react-redux'

const SignUp = ({
  showToast,
  getUserInfo,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  const [account, setAccount] = useState('')
  const [pass, setPass] = useState('')
  const [phone, setPhone] = useState('')
  const [fullName, setFullName] = useState('')
  const [address, setAddress] = useState('')

  const handleAction = () => {
    if (!account.length || !pass.length || !phone.length || !fullName.length) {
      showToast('Bạn chưa điền đủ thông tin yêu cầu')
      return
    }

    let idxUser = -1
    api.get(`${endpoint['user']}`).then((res) => {
      idxUser = res.findIndex((item) => item.account === account)
      if (idxUser != -1) {
        showToast('Tên người dùng đã được sử dụng')
        return;
      }
    })

    if (idxUser == -1) {
      api
        .post(`${endpoint['user']}`, {
          account,
          password: pass,
          fullName,
          phone,
          isActive: true,
        })
        .then((res) => {
          if (res) {
            getUserInfo(res);
            Router.push("/")
            setTimeout(() => {
              showToast('Đăng ký thành công')
            }, 500)
          }
        })
    }
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.signUp}>
        <h1 className={styles.signUpTitle}>Sign Up Form</h1>
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
        <input
          onChange={(event) => setPhone(event.target.value)}
          type="text"
          className={styles.signUpInput}
          value={phone}
          placeholder="Type your phone number"
        />
        <input
          onChange={(event) => setFullName(event.target.value)}
          type="text"
          className={styles.signUpInput}
          value={fullName}
          placeholder="Type your full name"
        />
        <input
          onChange={(event) => setAddress(event.target.value)}
          type="text"
          className={styles.signUpInput}
          value={address}
          placeholder="Type your address"
        />
        <button onClick={handleAction} value="Finish!" className={styles.signUpSubmit}>
          Finish!
        </button>
      </div>

      <Toast />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  showToast: storageActions.showToast,
  getUserInfo: storageActions.getUserInfo,
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
