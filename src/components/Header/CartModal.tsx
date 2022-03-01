
import React from 'react'
import {
    StyledDialogContainer,
    StyledDialog,
    StyledDialogContent,
    StyledDialogItem,
    StyledDialogRow,
    StyledDialogText,
    StyledDialogItemInfo,
    StyledDialogItemText,
} from "./CartModal.styled";
import { formatCurrency, sumPrice } from "src/utils/common";
import IProduct from "src/interfaces/product";
import { Button } from 'src/components/ui-kits/Button'
import Router from 'next/router';
import { connect } from 'react-redux';

interface CartModalProps {
  isHoverDialog?: boolean;
  cart: IProduct[];
  handleHoverIn?: (e?: React.MouseEvent<HTMLElement>) => void;
  handleHoverOut?: (e?: React.MouseEvent<HTMLElement>) => void;
}

const CartModal:React.FC<CartModalProps> = ({ cart = [], handleHoverIn = () => {}, handleHoverOut = () => {} }):JSX.Element => {
  const inlineNameStyle = `
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 150px;
  `
  
  return (
    <StyledDialogContainer
      onMouseEnter={(e) => handleHoverIn(e)} 
      onMouseLeave={(e) => handleHoverOut(e)}
    >
      <StyledDialog 
        // padding={cart.length ? 0 : "0.5rem"} 
      >
        { cart.length ? 
          <>
            <StyledDialogContent>
              {cart.map((item, idx) => (
                <StyledDialogRow key={idx}>
                  <StyledDialogItem>
                    {
                      <>
                        <img src={item.image_cover} alt="" width="50px" height="50px" />
                        <StyledDialogItemInfo>
                          <StyledDialogItemText customStyle={inlineNameStyle} fontSize="1rem" >{item.name}</StyledDialogItemText>
                          <StyledDialogItemText fontSize=".8rem">{formatCurrency(item.price*item.quantity)}</StyledDialogItemText>
                        </StyledDialogItemInfo>
                      </>
                    }
                  </StyledDialogItem>
                </StyledDialogRow>
              ))}
            </StyledDialogContent>
            <Button 
              handleClick={() => Router.push(`/cart`)}
            >
              View Cart
            </Button>
          </>
          : 
          <StyledDialogText >Your cart is empty</StyledDialogText>
        }
      </StyledDialog>
    </StyledDialogContainer>
  )
}

const mapStateToProps = (state) => {
  return {
    cart: state.storage.cart,
    userInfo: state.storage.userInfo,
  }
}

export default connect(mapStateToProps)(CartModal);