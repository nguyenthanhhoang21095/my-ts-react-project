import React from 'react'
import IProduct from '../../../interfaces/product'
import api from '../../../../controllers/baseApi'
import endpoint from '../../../utils/endpoints'
import { connect } from 'react-redux'
import { Button } from '../Button'
import storageActions from '../../../../controllers/redux/actions/storageActions'
import IUser from '../../../interfaces/user'
import { StyledQuantityButtonGroup, StyledQuantityButtonValue } from './Button.styled'
import { IconButton } from '../IconButton'
import Router from "next/router"

interface QuantityButtonProps {
  userInfo: IUser;
  product: IProduct;
  getCart: (res: any) => void;
  quantity: number;
  cart: IProduct[];
}

const QuantityButton: React.FC<QuantityButtonProps> = ({
  userInfo,
  product,
  getCart,
  quantity = 0,
  cart = [],
}): JSX.Element => {
  
  const changeQuantity = (actionType = 'increase'): void => {
    const token:string = JSON.parse(localStorage.getItem("access_token")) ?? "";
    if (userInfo && token) {
      const prodData = !product.hasOwnProperty("quantity") ? {...product, quantity: 0} : {...product}
      
      api
        .put(`${endpoint['cart']}`, {
          id: userInfo.id,
          product: prodData,
          action: actionType,
        }, token)
        .then((res) => {
          if (res) {
            getCart(res.cart)
          }
        })
    } else {
      Router.push("/auth/login")
    }
  }

  return (
    <StyledQuantityButtonGroup>
      <Button width="30px" height="15px" customStyle={`padding: 0`} handleClick={() => changeQuantity('increase')}>
        +
      </Button>
      <StyledQuantityButtonValue>{quantity}</StyledQuantityButtonValue>
      <Button width="30px" height="15px" customStyle={`padding: 0`} handleClick={() => changeQuantity('decrease')}>
        -
      </Button>
      <IconButton 
        width="20px" 
        height="20px" 
        img="/images/icons/remove.png" 
        imageStyle={`padding: 0; margin-left: 20px`} 
        handleClick={() => changeQuantity('remove')} 
      />
    </StyledQuantityButtonGroup>
  )
}

const mapStateToProps = (state) => {
  return {
    cart: state.storage.cart,
    userInfo: state.storage.userInfo,
  }
}

const mapDispatchToProps = {
  showToast: storageActions.showToast,
  getUserInfo: storageActions.getUserInfo,
  getCart: storageActions.getCart,
}
export default connect(mapStateToProps, mapDispatchToProps)(QuantityButton)
