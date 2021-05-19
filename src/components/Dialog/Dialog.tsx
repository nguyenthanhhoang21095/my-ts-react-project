
import React from 'react'
import {
    StyledDialog,
    StyledDialogContent,
    StyledDialogItem,
    StyledDialogRow,
    StyledDialogText,
    StyledDialogItemInfo,
    StyledDialogItemText,
} from "./Dialog.styled";
import { formatCurrency } from "../../utils/common";
import IProduct from "../../interfaces/product";
import QuantityButton from "../ui-kits/Button/QuantityButton";

interface DialogProps {
  isHoverDialog?: boolean;
  cart: IProduct[];
  handleHoverIn?: (e?: React.MouseEvent<HTMLElement>) => void;
  handleHoverOut?: (e?: React.MouseEvent<HTMLElement>) => void;

}

const Dialog:React.FC<DialogProps> = ({ cart = [], handleHoverIn = () => {}, handleHoverOut = () => {} }):JSX.Element => {
    const sumPrice = (cart) => {
      return cart.length && cart.map(item => item.finalPrice*item.quantity).reduce((acc, cur) => {
        return acc + cur;
      }, 0)
    }
  
    const inlineNameStyle = `
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      `
    return (
      <StyledDialog 
        paddingRight={cart.length ? 0 : "0.5rem"} 
        onMouseEnter={(e) => handleHoverIn(e)} 
        onMouseLeave={(e) => handleHoverOut(e)}
      >
        { cart.length ? 
          <StyledDialogContent>
            {cart.map((item, idx) => (
              <StyledDialogRow key={idx}>
                <StyledDialogItem>
                  {
                    <>
                      <img src={item.image} alt="" width="70rem" height="70rem" />
                      <StyledDialogItemInfo>
                        <StyledDialogItemText customStyle={inlineNameStyle} fontSize="1rem" >{item.name}</StyledDialogItemText>
                        <StyledDialogItemText customStyle={`color: #ffaf40`} fontSize="1rem">{formatCurrency(item.finalPrice*item.quantity)} VND</StyledDialogItemText>
                        <QuantityButton product={item} quantity={item.quantity}/>
                      </StyledDialogItemInfo>
                    </>
                  }
                </StyledDialogItem>
              </StyledDialogRow>
            ))}
              <StyledDialogRow>
                Total: {formatCurrency(sumPrice(cart))} VND
              </StyledDialogRow>
          </StyledDialogContent>
          : 
          <StyledDialogText >Bạn chưa có sản phẩm nào trong giỏ hàng</StyledDialogText>
        }
      </StyledDialog>
    )
  }

  export default Dialog;