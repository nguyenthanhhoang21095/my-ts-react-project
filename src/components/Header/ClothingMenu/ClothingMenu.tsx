import React from 'react'
import { Col, Row, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import styles from './ClothingMenu.module.scss'
import classNames from 'classnames'
import { CustomLink } from '../../ui-kits/Link'
// import { womenShop, menShop, accessories } from './CategoryItems'
import { ISubCollection } from "src/interfaces/collection";

interface HeaderMenuProps {
  data: any;
}

interface SubMenuProps {
  subCollection: ISubCollection[];
}

const SubMenu:React.FC<SubMenuProps> = ({ subCollection = [] }) => {
  const womenShop = subCollection.slice(0 ,8);
  const menShop = subCollection.slice(8, 16);
  const accessories = subCollection.slice(16, subCollection.length);

  return (
    <div className={styles["menu"]}>
      <Row className={styles["menu-row"]} justify="space-between">
        <Col xs={24} md={8} lg={8} className={styles["menu-col"]}>
          <div
            className={classNames("text-margin-0", styles["menu-col__title"])}
          >
            <CustomLink 
              href="/collection/women"
              text="Shop Women's" 
            />
          </div>
          <div className={styles["menu-col__list"]}>
            { womenShop.map((item, idx) => {
              return (
                <div className={styles["menu-col__list--link"]} key={idx}>
                  <CustomLink 
                    href={`sub-category/${item.id}`}
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
            <CustomLink 
              href="/collection/men"
              text="Shop Men's" 
            />
          </div>
          <div className={styles["menu-col__list"]}>
            { menShop.map((item, idx) => {
              return (
                <div className={styles["menu-col__list--link"]} key={idx}>
                  <CustomLink 
                    href={`sub-category/${item.id}`}
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
            <CustomLink 
              href="/collection/accessories" 
              text="Accessories" 
            />
          </div>
          <div className={styles["menu-col__list"]}>
            {accessories.map((item, idx) => {
              return (
                <div className={styles["menu-col__list--link"]} key={idx}>
                  <CustomLink 
                    href={`sub-category/${item.id}`}
                    text={item.name} 
                  />
                </div>
              )
            })}
          </div>
        </Col>
      </Row>
    </div>
  )
};

const HeaderMenu: React.FC<HeaderMenuProps> = ({ data }): JSX.Element => {
  return (
      <Dropdown overlay={<SubMenu subCollection={data.subCollection} />} 
        overlayStyle={{ position: "relative" }} 
        className={styles["menu-dropdown"]}
      >
        <div className={classNames("ant-dropdown-link", styles["menu-dropdown__title"])}>
          <CustomLink 
            href={`/category/${data.id}`}
            text={data.name}
          />
          <DownOutlined  className={styles["menu-dropdown__icon"]} />
        </div>
      </Dropdown>
      
  );
}

export default HeaderMenu;