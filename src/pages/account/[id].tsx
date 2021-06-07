import React, { useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import IUser from 'src/interfaces/user'
import Layout from 'src/components/Layout/Layout'
import styles from '../../styles/account.module.css'
import { connect } from 'react-redux'
import Input from 'src/components/ui-kits/Input/Input'
import { Button } from 'src/components/ui-kits/Button'
import Router from 'next/router';
import api from 'controllers/baseApi'
import endpoint from 'src/utils/endpoints'
import storageActions from 'controllers/redux/actions/storageActions'
import IconButton from 'src/components/ui-kits/IconButton/IconButton'
import { Icon } from 'src/components/ui-kits/Icon'

interface AccountProps {
  userInfo: IUser;
  getUserInfo: (info: IUser) => void;
  showToast: (mess:string) => void;
}

const Account: React.FC<AccountProps> = ({  userInfo = null, getUserInfo, showToast }): JSX.Element => {
  const [account, setAccount] = useState(userInfo?.account ?? "")
  const [password, setPassword] = useState(userInfo?.password ?? "")
  const [fullName, setFullName] = useState(userInfo?.fullName ?? "")
  const [phone, setPhone] = useState(userInfo?.phone ?? "")
  const [address, setAddress] = useState(userInfo?.address ?? "")
  const [showExpandal, setShowExpandal] = useState(false)
  const [oldPassword, setOldPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  
  const handleUpdateInfo = () => {
    const updatedInfo = {
      id: userInfo.id,
      account,
      password,
      fullName,
      phone,
      address,
      isActive: userInfo.isActive
    }

    api.put(endpoint['user'], {
      ...updatedInfo
    }, true)
    getUserInfo(updatedInfo);
    Router.back();
  }

  const handleCancelUpdate = () => {
    Router.back();
  }

  const openExpandal = (showExpandal) => {
    setShowExpandal(!showExpandal)
  }

  const confirmNewPassword = () => {
    if (newPassword) {
      api.put(`${endpoint['user']}`, {
        id: userInfo.id,
        account,
        password: newPassword,
        fullName,
        phone,
        address,
        isActive: userInfo.isActive
      }, true).then((res) => {
        setShowExpandal(false);
        showToast("Update password success");
        setNewPassword("")
      })
    }
  }

  const cancelNewPassword = () => {
    setShowExpandal(false);
    setNewPassword("")
  }
  return (
    <>
      <Layout>
        <div className={styles.container}>
          <p className={styles.title}>User Info</p>
          <Input type="text" labelName="Account" value={account} handleChange={(e) => setAccount(e.target.value)} />
          <div className={styles.changePass}>
            <Input type="password" labelName="Password" value={password} handleChange={(e) => setPassword(e.target.value)} />
            <IconButton 
              img={`/images/icons/caret-arrow-${showExpandal ? 'up' : 'down'}.png`} 
              height="15px"
              width="15px" 
              handleClick={() => openExpandal(showExpandal)} />
          </div>

          { showExpandal && 
            <div className={styles.updatePassword}>
              {/* <Input 
                type="password" 
                labelName="Old Password" 
                value={oldPassword} 
                handleChange={(e) => setOldPassword(e.target.value)} 
                customStyle="padding: 0.2rem; font-size: 0.8rem"
              />
              <Input 
                type="password" 
                labelName="Confirm Password" 
                value={confirmPassword} 
                handleChange={(e) => setConfirmPassword(e.target.value)}
                customStyle="padding: 0.2rem; font-size: 0.8rem"
              />
              <Icon img="/images/icons/checked.png" width="10px" height="10px" /> */}
              <Input 
                type="password" 
                labelName="New Password" 
                value={newPassword} 
                handleChange={(e) => setNewPassword(e.target.value)}
                customStyle="padding: 0.2rem; font-size: 0.8rem"
              />
               <div className={styles.updatePasswordBtns}>
                <Button height="4rem" width="fit-content" customStyle="margin-top: 1rem" handleClick={() => confirmNewPassword()}>
                    Confirm new password
                </Button>
                <Button height="4rem" width="fit-content" customStyle="margin-top: 1rem" handleClick={() => cancelNewPassword()}>
                    Cancel
                </Button>
               </div>
            </div>
          }

          <Input type="text" labelName="Full Name" value={fullName} handleChange={(e) => setFullName(e.target.value)} />
          <Input type="text" labelName="Phone Number" value={phone} handleChange={(e) => setPhone(e.target.value)} />
          <Input type="text" labelName="Address" value={address} handleChange={(e) => setAddress(e.target.value)} />
        </div>

        <div className={styles.buttons}>
          <Button height="4rem" width="8rem" handleClick={() => handleUpdateInfo()}>
            Update
          </Button>
          <Button height="4rem" width="8rem" handleClick={() => handleCancelUpdate()}>
            Cancel
          </Button>
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

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.storage.userInfo,
})

const mapDispatchToProps = {
  getUserInfo: storageActions.getUserInfo,
  showToast: storageActions.showToast,
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);