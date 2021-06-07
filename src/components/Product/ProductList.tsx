import React from 'react'
import Card from '../ui-kits/Card/Card'
import CardContent from '../ui-kits/Card/CardContent'
import Button from '../ui-kits/Button/Button'
import IconButton from '../ui-kits/IconButton/IconButton'
import Router from 'next/router';
import { connect } from 'react-redux';
import storageActions from 'controllers/redux/actions/storageActions';
import api from 'controllers/baseApi'
import endpoint from 'src/utils/endpoints'

const ProductList = ({products=[], addToCart, showToast, userInfo = null}):JSX.Element => {
  const handleAddToCart = (data: Record<string, any>): void => {
    if (!userInfo) { 
      Router.push("/auth/login");
      return;
    }
    
    if (userInfo && data) {
      api.put(`${endpoint['cart']}`, {
        id: userInfo.id,
        product: data,
      }, true).then(res => {
        showToast("Đã thêm vào giỏ hàng");
        addToCart(data);
      })
    }
  }

  return (
    <>
      {products.length &&
        products.map((data) => (
          <Card key={data.id} imageURL={data.image} productName={data.name}>
            <CardContent
              {...data}
              buttonGroups={
                <>
                  <Button width="fit-content" handleClick={() => handleAddToCart(data)}>
                    Add to cart
                  </Button>
                  <IconButton
                    img="/images/icons/view.png"
                    width="25px"
                    height="25px"
                    handleClick={() => Router.push(`/detail/${data.id}`)}
                  />
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
  addToCart: storageActions.addToCart,
  showToast: storageActions.showToast,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
