import React from 'react'
import Card from '../ui-kits/Card/Card'
import CardContent from '../ui-kits/Card/CardContent'
import Button from '../ui-kits/Button/Button'
import IconButton from '../ui-kits/CustomIcon/IconButton'
import { CCart } from "../../interfaces/cart";
import Router from 'next/router';
import { connect } from "react-redux";
import storageActions from "../../../controllers/redux/actions/storageActions";

const ProductList = ({products=[], addToCart}):JSX.Element => {
  const handleAddToCart = (data: Record<string, any>): void => {
    addToCart(data);
  }

  const handleViewProduct = (product_data) => {
    Router.push(`/detail/${product_data.id}`)
  }

  return (
    <>
      {products.length &&
        products.map((data) => (
          <Card key={data.id} imageURL={data.img} productName={data.name}>
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
                    handleClick={() => handleViewProduct(data)}
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
    cart: state.storage.cart
  }
}

const mapDispatchToProps = {
  addToCart: storageActions.addToCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
