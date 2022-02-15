import React, { useState, useMemo, useEffect } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Layout from 'src/components/Layout/Layout'
import api from 'controllers/baseApi'
import endpoint from 'src/utils/endpoints'
import styles from 'src/styles/pages/category.module.scss'
import classNames from 'classnames'
import { Breadcrumb, Row, Col, Select, Tooltip } from 'antd'
import { useMediaQuery } from 'react-responsive';
import { HomeOutlined } from '@ant-design/icons'
import parse from 'html-react-parser';
import { ProductCard } from 'src/components/Product';

const { Option } = Select;

interface CategoryPageProps {
  data: any;
  paramId: number;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ data }): JSX.Element => {
  const [viewType, setViewType] = useState("grid");
  const [viewAmount, setViewAmount] = useState(6);
  const numOfRow = Math.ceil(data.productArr.length / 4);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    data.productArr.length && setProductList(data.productArr);
  }, [])
  
  const filterProductData = (type) => {
    const sortedList = (type) => ({
      "default": [...productList].sort((a, b) => a.name.localeCompare(b.name)),
      "incName": [...productList].sort((a, b) => a.name.localeCompare(b.name)),
      "descName": [...productList].sort((a, b) => b.name.localeCompare(a.name)),
      "incPrice": [...productList].sort((a, b) => a.price - b.price),
      "descPrice": [...productList].sort((a, b) => b.price - a.price),
    })[type]
    setProductList(sortedList(type));
  }
  
  return (
    <Layout>
      <div className={styles['category']}>
        <div className={styles['category-content']}>
          <div className={styles['category-content__breadcrumb']}>
            <Breadcrumb separator=">">
              <Breadcrumb.Item href="/">
                <HomeOutlined />
              </Breadcrumb.Item>
              <Breadcrumb.Item className={styles['category-content__breadcrumb--item']}>{data.name}</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <Row>
            <Col xl={20} lg={20} md={20} sm={24} xs={24}>
              <div className={styles['category-content__description']}>
                <h2 className={classNames(styles['category-content__description--title'], "font-h2")}>
                  {data.name}
                </h2>
                {data.description.length ? parse(data.description) : 'No description'}
              </div>
            </Col>
            <Col xl={4} lg={4} md={4} sm={0} xs={0}></Col>
          </Row>

          <hr className={styles['category-content__divider']}></hr>

          <Row className={styles['category-content__filter']}>
            <Tooltip title="Grid" color={"#4d708e"}>
              <Col span={1} className={styles['category-content__filter-item']}>
                <div
                  className={styles['category-content__filter-item--icon']}
                  onClick={() => setViewType("grid")}
                >
                  <i className="fas fa-grip-horizontal" aria-hidden></i>
                </div>
              </Col>
            </Tooltip>
            
            <Tooltip title="List" color={"#4d708e"}>
              <Col span={1} className={styles['category-content__filter-item']}>
                <div
                  className={styles['category-content__filter-item--icon']}
                  onClick={() => setViewType("list")}
                >
                  <i className="fas fa-th-list" aria-hidden></i>
                </div>
              </Col>
            </Tooltip>

            <Col span={8} className={styles['category-content__filter-item']}>
              <Select
                defaultValue="default"
                onChange={filterProductData}
                style={{ width: "100%", textAlign: "left" }}
                bordered={false}
                dropdownStyle={{ textAlign: "left" }}
              >
                <Option value="default">Default</Option>
                <Option value="incName">Name (A - Z)</Option>
                <Option value="descName">Name (Z - A)</Option>
                <Option value="incPrice">Price (Low &gt; High)</Option>
                <Option value="descPrice">Price (Low &gt; High)</Option>
              </Select>
            </Col>

            <Tooltip title="Compare" color={"#4d708e"}>
              <Col span={1} className={styles['category-content__filter-item']}>
                <div 
                  className={styles['category-content__filter-item--icon']}
                  onClick={() => console.log('compare')}
                >
                  <i className="fas fa-exchange-alt" aria-hidden></i>
                </div>
              </Col>
            </Tooltip>
            
            <Col span={11} className={styles['category-content__filter-item']}>
              Show
            </Col>
            <Col span={2} className={styles['category-content__filter-item']}>
              <Select
                defaultValue={6}
                style={{ width: "100%", textAlign: "left" }}
                bordered={false}
                dropdownStyle={{ textAlign: "left" }}
                onChange={(value) => setViewAmount(value)}
              >
                <Option value={6}>6</Option>
                <Option value={25}>25</Option>
              </Select>
            </Col>
          </Row>

          {viewType === "list" ? 
            productList.length && productList.map((product, idx) => (
              <Row key={`${product.id}_${idx}`} gutter={48}>
                <Col span={24}>
                  <ProductCard
                    id={product.id}
                    imageCover={product.image_cover}
                    rate={product.rateStar}
                    productName={product.name}
                    price={product.price}
                    isThumb={false}
                    description={product.description}
                    showMode="horizontal"
                  />
                </Col>
              </Row>
            ))
            :
            <div>
              {Array.from(Array(numOfRow), Math.random).map((row, rowIdx) => (
                <Row key={rowIdx} gutter={48}>
                  {productList.length && productList.slice(0, 4).map((product) => (
                    <Col span={6} key={product._id}>
                      <ProductCard
                        id={product.id}
                        imageCover={product.image_cover}
                        style={{
                          textAlign: "left",
                          paddingBottom: "45%"
                        }}
                        rate={product.rateStar}
                        productName={product.name}
                        price={product.price}
                        isThumb={false}
                      />
                    </Col>
                  ))}
                </Row>
              ))}
            </div>
          }
        </div>
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res: any = await api.get(endpoint['collection'])
  const mapId: any[] = res.length && res.map((item) => ({
    params: { id: `${item.id}` },
  }))
  return {
    paths: mapId,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params.id;
  const data: any = await api.get(endpoint['collection'] + '/' + id)
  return {
    props: {
      data: data?.[0] ?? null,
      paramId: id
    },
  }
}

export default CategoryPage;