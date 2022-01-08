import React, { useState, useEffect } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Layout from 'src/components/Layout/Layout'
import { getDimensionImageFromUrl, replaceDimensionImageFromUrl } from 'src/utils/common'
import api from 'controllers/baseApi'
import endpoint from 'src/utils/endpoints'
import storageActions from "controllers/redux/actions/storageActions";
import IProduct from 'src/interfaces/product'
import IUser from 'src/interfaces/user'
import styles from 'src/styles/pages/detail.module.scss'
import classNames from 'classnames'
import { connect } from "react-redux"
import { Breadcrumb, Row, Col } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import { Image } from 'src/components/ui-kits/CustomImage'
import { VerticalCarousel, MultiCarousel, SingleCarousel } from 'src/components/Carousel'
import { GlassMagnifier } from "react-image-magnifiers";
import { ProductInfo } from 'src/components/Product'
import { DescriptionTab, SpecificationTab, ReviewTab } from 'src/components/DetailTab'
import { ProductCard } from 'src/components/Product';
import { useMediaQuery } from 'react-responsive';

interface DetailPageProps {
  cart: IProduct[];
  userInfo: IUser;
  prodData: IProduct;
  getCart: any;
  showToast: any;
  paramId: number;
}

const DetailPage: React.FC<DetailPageProps> = ({ prodData, paramId }): JSX.Element => {
  const [activeImage, setActiveImage] = useState(() => {
    return prodData.images.length ? prodData.images[0] : ""
  })

  const changeCarousel = useMediaQuery({ query: '(max-width: 1200px)' })

  const [activeTab, setActiveTab] = useState(0);

  const [relatedData, setRelatedData] = useState([]);

  const [navList] = useState(() => {
    return [
      {
        id: 0,
        title: 'description',
      },
      {
        id: 1,
        title: 'specification',
      },
      {
        id: 2,
        title: 'reviews',
      }
    ]
  })

  useEffect(() => {
    async function fetchRelatedData() {
      try {
        const res: any = await api.get(`product/related/${paramId}`);
        if (res) {
          setRelatedData(res?.[0]?.related_products ?? [])
        }
      } catch (err) {
        console.error(err)
      }
    }

    fetchRelatedData();
  }, [])

  useEffect(() => {
    prodData.images.length && setActiveImage(prodData.images[0]);
  }, [paramId])

  const getDimensionImgAfterResize = (url: string): { width: string; height: string } => {
    const resizeUrl: string = replaceDimensionImageFromUrl(url, 800, 800);
    return getDimensionImageFromUrl(resizeUrl)
  }

  return (
    <Layout>
      <div className={styles['detail']}>
        <div className={styles['detail-container']}>
          <div className={styles['detail-container__breadcrumb']}>
            <Breadcrumb separator=">">
              <Breadcrumb.Item href="/">
                <HomeOutlined />
              </Breadcrumb.Item>
              <Breadcrumb.Item>{prodData.name}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className={styles['detail-container__media']}>
            <Row className={styles['detail-content']} gutter={32}>
              {!changeCarousel ?
                <>
                  <Col
                    className={styles['detail-content__images']}
                    xl={3} lg={0}
                  >
                    <VerticalCarousel
                      data={prodData.images}
                      handleClick={setActiveImage}
                      activeItem={activeImage}
                      renderProps={(item) => (
                        <Image
                          src={item}
                          width={getDimensionImageFromUrl(item).width}
                          height={getDimensionImageFromUrl(item).height}
                          alt="item image"
                        />
                      )}
                    />
                  </Col>
                  <Col
                    className={styles['detail-content__cover']}
                    xl={10} lg={0}
                  >
                    <div className={styles['detail-content__cover--main']}>
                      <GlassMagnifier
                        imageSrc={replaceDimensionImageFromUrl(activeImage, 800, 800)}
                        imageAlt="image cover"
                        magnifierBorderSize={1}
                        magnifierSize="25%"
                      />
                    </div>
                  </Col>
                </>
                :
                <Col
                  className={styles['detail-content__carousel']}
                  xl={11} lg={12} md={12} sm={24} xs={24}
                >
                  <SingleCarousel>
                    {prodData.images.length && prodData.images.map((item, idx) => (
                      <Image
                        key={idx}
                        src={replaceDimensionImageFromUrl(item, 800, 800)}
                        width={getDimensionImgAfterResize(item).width}
                        height={getDimensionImgAfterResize(item).height}
                        alt="item image"
                      />
                    ))}
                  </SingleCarousel>
                </Col>
              }

              <Col
                className={styles['detail-content__info']}
                xl={11} lg={12} md={12} sm={24} xs={24}
              >
                <ProductInfo
                  name={prodData.name}
                  brand={prodData.brand}
                  productCode={prodData.product_code}
                  availability={prodData.availability}
                  price={prodData.price}
                  sizes={prodData.sizes}
                  colors={prodData.colors}
                  reviewsNumber={prodData.reviews.length}
                  rateStar={prodData.rateStar}
                />
              </Col>
            </Row>
          </div>
          <div className={styles['detail-container__tabs']}>
            <Row gutter={16} className={styles['detail-container__row']}>
              <Col xl={8} lg={6} md={24} sm={24} xs={24}>
                <ul className={styles['detail-container__nav-tab']}>
                  {navList.map((nav) => (
                    <li key={nav.id}
                      className={classNames(
                        styles['detail-container__nav-tab--item'],
                        { [styles['detail-container__nav-tab--active']]: nav.id === activeTab }
                      )}
                      onClick={() => setActiveTab(nav.id)}
                    >
                      {nav.title}
                    </li>
                  ))}
                </ul>
              </Col>
              <Col xl={16} lg={18} md={24} sm={24} xs={24}>
                <div className={styles['detail-container__tab-content']}>
                  {activeTab == 0 ?
                    <DescriptionTab desc={prodData.description} />
                    : activeTab == 1 ?
                      <SpecificationTab
                        featuredBrand={prodData.featured_brand}
                        material={prodData.material}
                      />
                      :
                      <ReviewTab
                        reviews={prodData.reviews}
                      />
                  }
                </div>
              </Col>
            </Row>
          </div>

          {/* ====== Related Products ====== */}
          <div className={styles['detail-container__related-products']}>
            <h3 className={styles['detail-container__related-products--title']}>
              RELATED PRODUCTS
            </h3>
            <MultiCarousel
              data={relatedData}
              renderProps={item => (
                <div className={styles["multi-carousel-item"]}>
                  <ProductCard
                    id={item.id}
                    centerMode
                    imageCover={item.image_cover}
                    rate={item.rateStar}
                    productName={item.name}
                    price={item.price}
                    isThumb={false}
                  />
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}


export const getStaticPaths: GetStaticPaths = async () => {
  let mapId: any = []
  const res = await api.get(endpoint['product'])
  mapId = res.length && res.map((item) => ({
    params: { id: `${item.id}` },
  }))
  return {
    paths: mapId,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params.id
  const prodData: any = await api.get(endpoint['product'] + '/' + id)
  return {
    props: {
      prodData: prodData ? prodData : null,
      paramId: id
    },
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage)
