import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import storageActions from 'controllers/redux/actions/storageActions'
import styles from "./ProductCard.module.scss"
import { Image } from 'src/components/ui-kits/CustomImage'
import { Rate } from 'antd'
import { Button } from 'src/components/ui-kits/Button'
import classNames from 'classnames'
import { getDimensionImageFromUrl } from '../../utils/common'
import api from 'controllers/baseApi'
import endpoint from 'src/utils/endpoints'
import Router from 'next/router';
import parse from 'html-react-parser';
import { Row, Col } from "antd";

interface ProductListProps {
  id: number;
  productName: string;
  price: number;
  imageCover: string;
  rate: number;
  style?: any;
  isThumb?: boolean;
  centerMode?: boolean;
  description?: string;
  showMode?: string;
}
const ProductList: React.FC<ProductListProps> = ({
  id,
  style = {},
  isThumb = false,
  imageCover = "",
  rate = 0,
  productName = "",
  price,
  centerMode = false,
  description = "",
  showMode = "vertical"
}): JSX.Element => {

  const [isHover, setIsHover] = useState(false);
  const { width, height } = getDimensionImageFromUrl(imageCover);

  const handleChangeLink = (): void => {
    Router.push(`/product-detail/${id}`);
  }

  if (showMode === "vertical") {
    return (
      <div
        className={classNames(
          styles["card-container"], 
        )}
        style={{ 
          flexDirection: !isThumb ? "column" : "row-reverse",
          justifyContent: !isThumb ? "center" : "end",
          paddingBottom: !isThumb ? "25%" : "0",
          ...style
        }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className={classNames(
          { "scale-in-center": !isHover && !isThumb },
          { "scale-out-center": isHover && !isThumb },
          styles["card-link"],
        )}
          onClick={handleChangeLink}
        >
          <Image
            src={imageCover}
            width={width}
            height={height}
            alt="collection image"
          />
        </div>
        <div
          className={classNames(
            { [styles["card-slide-up"]]: isHover },
            { [styles["card-slide-down"]]: !isHover },
            styles["card-layout"])}
        >
          <div className={classNames(
              styles["card-content"], 
              { [styles["card-center-content"]]: centerMode }
            )}
          >
            <div className={styles["card-content__rate"]}>
              <Rate disabled defaultValue={rate} style={{ fontSize: "12px" }} />
            </div>
            <div className={classNames(
              "font-14",
              styles["card-content__name"],
              styles["card-link"]
            )}
              onClick={handleChangeLink}
            >
              {productName}
            </div>
            <div className={classNames("font-16", styles["card-content__price"])}>
              ${price}
            </div>
          </div>
          <div
            className={classNames(
              styles["card-action"],
              { [styles["card-center-content"]]: centerMode }
            )}
          >
            <Button
              style={{
                textTransform: "uppercase",
                padding: "12px 25px",
                fontWeight: 600,
              }}
            >
              add to cart
            </Button>
          </div>
        </div>
      </div >
    )
  } else {
    return (
      <div className={styles["card-horizontal"]}>
        <div className={styles["card-horizontal-content"]}>
          <div
            className={classNames(
              styles["card-horizontal-content__image"],
            )}
          >
            <Image
              src={imageCover}
              width={width}
              height={height}
              alt="collection image"
            />
          </div>
          <div
            className={classNames(
              styles["card-horizontal-content__info"])}
          >
            <div className={styles["card-horizontal-content__info--text"]}>
              <div className={styles["card-content__rate"]}>
                <Rate disabled defaultValue={rate} style={{ fontSize: "12px" }} />
              </div>
              <div className={classNames(
                "font-14",
                styles["card-content__name"],
                styles["card-link"]
              )}
                onClick={handleChangeLink}
              >
                {productName}
              </div>
              <div className={styles["card-desc"]}>
                {parse(description)}
              </div>
              <div className={classNames("font-16", styles["card-content__price"])}>
                ${price}
              </div>
            </div>
            <div
              className={classNames(
                styles["card-action"],
                { [styles["card-center-content"]]: centerMode }
              )}
            >
              <Button
                style={{
                  textTransform: "uppercase",
                  padding: "12px 25px",
                  fontWeight: 600,
                }}
              >
                add to cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
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
