import React, { useState, useEffect } from 'react'
import { Link } from '../ui-kits/Link'
import { connect } from 'react-redux'
import { IconButton } from '../ui-kits/IconButton'
import Cart from './Cart/Cart'
import SearchInput from './SearchInput/SearchInput'
import styles from './Header.module.scss'
import { Button } from '../ui-kits/Button'
import ClothingMenu from './ClothingMenu/ClothingMenu'
import { Row, Col } from 'antd';

interface HeaderProps {
  cart?: any
  userInfo?: any
}

const Header: React.FC<HeaderProps> = ({ cart = [], userInfo = null }): JSX.Element => {
  const [isSearching, setIsSearching] = useState(false);
  return (
    <div className={styles["header"]}>
      <Row className={styles["header-container"]} justify="space-between">
        <Col xl={4} lg={2} md={2} sm={2} className={styles["header-container__item"]}>
          Logo
        </Col>
        {!isSearching ?
          <Col xl={12} lg={16} md={16} sm={16} className={styles["header-container__item"]}>
            <Row className={styles["header-category"]} gutter={8} justify="space-between">
              <Col
                offset={4}
                xl={4} lg={4} md={4} sm={4}
                className={styles["header-category__item"]}>
                <ClothingMenu />
              </Col>
              <Col
                xl={3} lg={3} md={3} sm={3}
                className={styles["header-category__item"]}>
                <Link
                  href="https://www.google.com/"
                  text="Shoes"
                />
              </Col>
              <Col
                xl={6} lg={6} md={6} sm={6}
                className={styles["header-category__item"]}>
                <Link
                  href="https://www.google.com/"
                  text="Bags & Handbags"
                />
              </Col>
              <Col
                xl={4} lg={4} md={4} sm={4}
                className={styles["header-category__item"]}>
                <Link
                  href="https://www.google.com/"
                  text="Accessories"
                />
              </Col>
              <Col
                xl={3} lg={3} md={3} sm={3}
                className={styles["header-category__item"]}>
                <Link
                  href="https://www.google.com/"
                  text="Sale"
                />
              </Col>
            </Row>
          </Col>
          :
          <Col xl={12} lg={16} md={16} sm={16}
            className={styles["header-container__item"]}
          >
            <SearchInput isSearching={isSearching} />
          </Col>
        }
        <Col xl={5} lg={5} md={5} sm={6} className={styles["header-container__item"]}>
          <Cart
            isSearching={isSearching}
            setIsSearching={setIsSearching}
          />
        </Col>
      </Row>
      <div className={styles["header__tape"]}></div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    cart: state.storage.cart,
    userInfo: state.storage.userInfo,
  }
}

export default connect(mapStateToProps)(Header)