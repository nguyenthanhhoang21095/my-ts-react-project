import React, { useState, useEffect } from 'react'
import { CustomLink } from '../ui-kits/Link'
import { connect } from 'react-redux'
import Cart from './Cart/Cart'
import SearchInput from './SearchInput/SearchInput'
import styles from './Header.module.scss'
import ClothingMenu from './ClothingMenu/ClothingMenu'
import { Row, Col } from 'antd';
import { Image } from '../ui-kits/CustomImage'
import Link from 'next/link'
import endpoints from 'src/utils/endpoints'
import api from 'controllers/baseApi'

interface HeaderProps {
  cart?: any
  userInfo?: any
}

const Header: React.FC<HeaderProps> = (): JSX.Element => {
  const [isSearching, setIsSearching] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [clothingData, setClothingData] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
      const res:any = await api.get(endpoints["collection"]);
      setCategoryList(res.map(category => {
        const { id, name } = category;
        return {
          id,
          name
        }
      }));
      setClothingData(res?.[0] ?? []);
    }

    fetchData();
  }, []);

  return (
    <div className={styles["header"]}>
      <Row className={styles["header-container"]} justify="space-between">
        <Col xl={4} lg={2} md={2} sm={2} className={styles["header-container__item"]}>
          <Link href="/">
            <div className={styles["header-container__item--logo"]}>
              <Image
                src="/images/logo/logo.png"
                width="120"
                height="40"
                alt="logo"
              />
            </div>
          </Link>
        </Col>
        {!isSearching ?
          <Col xl={12} lg={16} md={16} sm={16} className={styles["header-container__item"]}>
            <Row className={styles["header-category"]} gutter={8} justify="space-between">
              <Col
                offset={4}
                xl={4} lg={4} md={4} sm={4}
                className={styles["header-category__item"]}>
                <ClothingMenu data={clothingData} />
              </Col>
              {categoryList.length && categoryList.slice(1, categoryList.length).map(item => (
                <Col
                  xl={4} lg={4} md={4} sm={4}
                  key={item.id}
                  className={styles["header-category__item"]}>
                  <CustomLink
                    href={`/category/${item.id}`}
                    text={item.name}
                  />
                </Col>
              ))}
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