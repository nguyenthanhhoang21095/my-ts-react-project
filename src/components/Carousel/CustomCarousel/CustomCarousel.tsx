import React from 'react'
import styles from './Carousel.module.scss'
import { Carousel } from 'antd'

interface CarouselProps {
  data: any[];
  renderProps: any;
}

const carouselProps = {
  dots: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

const CustomCarousel: React.FC<CarouselProps> = ({ data, renderProps }): JSX.Element => {

  return (
    <div className={styles['carousel']}>
      <Carousel effect="fade" {...carouselProps}>
        {data.length && data.map((item, idx) => (
          <>
            {renderProps(item, idx)}
          </>
        ))}
      </Carousel>
    </div>
  )
}

export default CustomCarousel;