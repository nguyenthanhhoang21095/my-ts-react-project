import React from 'react'
import { Col, Row, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import styles from './ClothingMenu.module.scss'
import classNames from 'classnames'
import { Link } from '../../ui-kits/Link'
import { womenShop, menShop, accessories } from './CategoryItems'

interface MenuProps {
}

const menu = (
  <div className={styles["menu"]}>
   <Row className={styles["menu-row"]} justify="space-between">
      <Col xs={24} md={8} lg={8} className={styles["menu-col"]}>
        <div
          className={classNames("text-margin-0", styles["menu-col__title"])}
        >
          <Link 
            href="https://www.google.com/" 
            text="Shop Women's" 
          />
        </div>
        <div className={styles["menu-col__list"]}>
          { womenShop.map((item, idx) => {
            return (
              <div className={styles["menu-col__list--link"]} key={idx}>
                <Link 
                  href={item.link}
                  text={item.name} 
                />
              </div>
            )
          })}
        </div>
      </Col>
      <Col xs={24} md={8} lg={8} className={styles["menu-col"]}>
        <div
          className={classNames("text-margin-0", styles["menu-col__title"])}
        >
          <Link 
            href="https://www.google.com/" 
            text="Shop Men's" 
          />
        </div>
        <div className={styles["menu-col__list"]}>
          { menShop.map((item, idx) => {
            return (
              <div className={styles["menu-col__list--link"]} key={idx}>
                <Link 
                  href={item.link}
                  text={item.name} 
                />
              </div>
            )
          })}
        </div>
      </Col>
      <Col xs={24} md={8} lg={8} className={styles["menu-col"]}>
        <div
          className={classNames("text-margin-0", styles["menu-col__title"])}
        >
          <Link 
            href="https://www.google.com/" 
            text="Accessories" 
          />
        </div>
        <div className={styles["menu-col__list"]}>
          {accessories.map((item, idx) => {
            return (
              <div className={styles["menu-col__list--link"]} key={idx}>
                <Link 
                  href={item.link}
                  text={item.name} 
                />
              </div>
            )
          })}
        </div>
      </Col>
    </Row>
  </div>
);

const HeaderMenu: React.FC<MenuProps> = (): JSX.Element => {
  return (
      <Dropdown overlay={menu} 
        overlayStyle={{ position: "relative" }} 
        className={styles["menu-dropdown"]}
      >
        <div className={classNames("ant-dropdown-link", styles["menu-dropdown__title"])}>
          <Link 
            href="https://www.google.com/" 
            text="Clothing"
          />
          <DownOutlined  className={styles["menu-dropdown__icon"]} />
        </div>
      </Dropdown>
      
  );
}

export default HeaderMenu;