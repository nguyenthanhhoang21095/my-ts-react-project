import React, { useEffect, useState } from 'react'
import styles from './Carousel.module.scss'
import { Carousel } from 'antd'
import { Button } from '../ui-kits/Button'
import api from '../../../controllers/baseApi'
import { Image } from 'src/components/ui-kits/CustomImage'


interface CarouselProps {

}

const carouselProps = {
  dots: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

const CustomCarousel: React.FC<CarouselProps> = (): JSX.Element => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const res: any = await api.get('banner');
        if (res) {
          setData(res)
        }
      } catch (err) {
        console.error(err)
      }
    }

    fetchData();
  }, [])

  return (
    <div className={styles['carousel']}>
      <Carousel effect="fade" {...carouselProps}>
        {data.length && data.map((item, idx) => (
          <div key={item.id}>
            <div className={styles['carousel-container']}>
              <div className={styles['carousel-container__image']}>
                <Image
                  src={item.image}
                  width="605"
                  height="800"
                  alt={`image ${item.id}`}
                />
              </div>
              <div className={styles['carousel-container__content']}>
                <h5 className={styles['carousel-container__content--name']}>
                  {item.name}
                </h5>
                <h2 className={styles['carousel-container__content--intro']}>
                  {item.intro}
                </h2>
                <p className={styles['carousel-container__content--desc']}>
                  {item.description}
                </p>
                <Button
                  transitionWidth={idx == data.length - 1}
                  style={{
                    padding: "20px 35px",
                    fontSize: "12px",
                    fontWeight: "600",
                    height: "50px",
                    boxSizing: "border-box",
                    textTransform: "uppercase"
                  }}>
                  Shop now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default CustomCarousel;