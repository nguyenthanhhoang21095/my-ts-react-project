import React from 'react'
import Card from '../ui-kits/Card/Card'
import CardContent from '../ui-kits/Card/CardContent'
import Button from '../ui-kits/Button/Button'
import Router from 'next/router';
import { connect } from 'react-redux';
import storageActions from 'controllers/redux/actions/storageActions';
import api from 'controllers/baseApi'
import endpoint from 'src/utils/endpoints'
import IProduct from 'src/interfaces/product';
import IUser from 'src/interfaces/user';

interface ProductListProps {
  products: IProduct[];
  userInfo: IUser;
  getCart: any;
  showToast: any;
}
const ProductList:React.FC<ProductListProps> = ({products=[], getCart, showToast, userInfo = null}):JSX.Element => {
  const handleAddToCart = (data: Record<string, any>): void => {
    const token:string = JSON.parse(localStorage.getItem("access_token")) ?? "";
    if (!userInfo) { 
      Router.push("/auth/login");
      return;
    }
    
    if (userInfo && data && token) {
      api.put(`${endpoint['cart']}`, {
        id: userInfo.id,
        product: data,
        action: "increase"
      }, token).then(res => {
        if (res) {
          getCart(res.cart);
          showToast("Đã thêm vào giỏ hàng");
        }
      })
    }
  }

  return (
    <>
      {products.length &&
        products.map((data, idx) => (
          <Card key={idx} imageURL={data.image} productName={data.name}>
            <CardContent
              {...data}
              buttonGroups={
                <>
                  <Button width="fit-content" handleClick={() => handleAddToCart(data)}>
                    Add to cart
                  </Button>
                  <Button
                    width="fit-content"
                    outLine="none"
                    handleClick={() => Router.push(`/detail/${data.id}`)}
                  >
                    View
                  </Button>
                </>
              }
            />
          </Card>
        ))}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    cart: state.storage.cart,
    userInfo: state.storage.userInfo,
  }
}

const mapDispatchToProps = {
  getCart: storageActions.getCart,
  showToast: storageActions.showToast,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
