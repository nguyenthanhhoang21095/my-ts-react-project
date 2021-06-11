import React, { useState } from 'react'
import styles from './Header.module.scss'
import classNames from 'classnames'
import { IconButton } from 'src/components/ui-kits/IconButton'
import { Link } from 'src/components/ui-kits/Link'
import IUser from 'src/interfaces/user'
import { Button } from '../ui-kits/Button'
import {
    StyledDialogContent,
    StyledDialogItem,
    StyledDialogRow,
    StyledDialogText,
    StyledDialogItemInfo,
    StyledDialogItemText,
} from "./CartModal.styled";
import Router from 'next/router'
import { formatCurrency } from 'src/utils/common'
import { clearLocalStorage } from 'src/utils/common'

interface NavHeaderProps {
    isShow: boolean;
    userInfo: IUser;
    cartData: any;
}
const NavHeader: React.FC<NavHeaderProps> = ({ isShow = false, userInfo = null, cartData =[] }):JSX.Element => {
    const [showUserLinks, setShowUserLinks] = useState(false);
    const [showCartLinks, setShowCartLinks] = useState(false);

    const handleOpenUserLinks = (toggleOpen) => {
        setShowCartLinks(false);
        setShowUserLinks(!toggleOpen);
    }

    const handleOpenCartLinks = (toggleOpen) => {
        setShowUserLinks(false);
        setShowCartLinks(!toggleOpen);
    }

    const handleClearUser = () => {
      clearLocalStorage()
      Router.push('/auth/login');
    }

    return (
        <div 
          className={
            classNames(
              styles['header-sub-nav'], 
              styles[`${isShow ? 'anim-slide-in' : 'anim-slide-out'}`]
            )}
        >
          <IconButton
            img="/images/icons/user.png"
            width="22px"
            height="22px"
            handleClick={() => handleOpenUserLinks(showUserLinks)}
            imageStyle={`filter : ${showUserLinks ?
                'invert(72%) sepia(18%) saturate(1702%) hue-rotate(343deg) brightness(103%) contrast(101%)'
                : ''}`}
          />
          { showUserLinks && userInfo &&
            <>
              <div className={styles.paddingTopBot10}>
                <Link 
                    url={`/account/${userInfo.id}`}
                    text="My Info" 
                    customStyle="font-family: Lobster, cursive; color: #000; margin-bottom: 5px"
                />
              </div>
              <div className={styles.paddingTopBot10}>
                <Button 
                    handleClick={() => handleClearUser()}
                    outLine="none"
                >   
                  Sign out
                </Button>  
                {/* <Link 
                    url={`/auth/login`}
                    text="Sign out" 
                    customStyle="font-family: Lobster, cursive; color: #000"
                /> */}
              </div>
            </>
          }
          <IconButton
            img="/images/icons/shopping-bag.png"
            width="22px"
            height="22px"
            handleClick={() => handleOpenCartLinks(showCartLinks)}
            imageStyle={`filter : ${showCartLinks ?
                'invert(72%) sepia(18%) saturate(1702%) hue-rotate(343deg) brightness(103%) contrast(101%)'
            : ''}`}
          />
          { showCartLinks && 
            <>
              { cartData.length ? 
                <>
                  <StyledDialogContent>
                    { cartData.map((item, idx) => (
                      <StyledDialogRow key={idx}>
                        <StyledDialogItem>
                          {
                            <>
                              <img src={item.image} alt="" width="50px" height="50px" />
                              <StyledDialogItemInfo>
                                <StyledDialogItemText fontSize="1rem" >{item.name}</StyledDialogItemText>
                                <StyledDialogItemText fontSize=".8rem">{formatCurrency(item.finalPrice*item.quantity)}</StyledDialogItemText>
                              </StyledDialogItemInfo>
                            </>
                          }
                        </StyledDialogItem>
                      </StyledDialogRow>
                    ))}
                  </StyledDialogContent>
                  <Button 
                    handleClick={() => Router.push(`/cart`)}
                    customStyle="margin-top: 15px"
                  >
                    View Cart
                  </Button>
                </>
              : 
                <StyledDialogText >Your cart is empty</StyledDialogText>
              }
            </>
          }
        </div>
    )
}

export default NavHeader;