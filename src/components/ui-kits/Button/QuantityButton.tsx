import React from 'react'
import IProduct from '../../../interfaces/product'
import api from '../../../../controllers/baseApi'
import endpoint from '../../../utils/endpoints'
import { connect } from 'react-redux'
import { Button } from '../Button'
import storageActions from '../../../../controllers/redux/actions/storageActions'
import IUser from '../../../interfaces/user'
import { StyledQuantityButtonGroup, StyledQuantityButtonValue } from './Button.styled'
import IconButton from '../IconButton/IconButton'
import Router from "next/router"

interface QuantityButtonProps {
  userInfo: IUser;
  product: IProduct;
  getCart: (res: any) => void;
  quantity: number;
  addToCart: any;
  cart: IProduct[];
}

const QuantityButton: React.FC<QuantityButtonProps> = ({
  userInfo,
  product,
  getCart,
  quantity = 0,
  addToCart = () => {},
  cart = [],
}): JSX.Element => {
  
  const changeQuantity = (actionType = ''): void => {
    if (userInfo) {
        const prodData = !product.hasOwnProperty("quantity") ? {...product, quantity: 0} : {...product}
        console.log(actionType, product);
      api
        .put(`${endpoint['cart']}`, {
          id: userInfo.id,
          product: prodData,
          action: actionType,
        })
        .then((res) => {
          updateCartFromDB(userInfo.id)
        })
    } else {
      Router.push("/auth/login")
    }
  }

  const updateCartFromDB = (id: number) => {
    api.get(`${endpoint['cart']}/${id}`).then((res: any) => {
      if (res) {
        getCart(res.cart)
      }
    })
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
  addToCart: storageActions.addToCart,
}
export default connect(mapStateToProps, mapDispatchToProps)(QuantityButton)
