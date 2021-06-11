import React from 'react'
import { Slider } from 'src/components/ui-kits/Slider'
import styles from './Banner.module.scss'

interface BannerProps {

}
const Banner: React.FC<BannerProps> = () => {
    const bannerData = [
        "/images/banner/banner-0.jpg",
        "/images/banner/banner-1.jpg",
        "/images/banner/banner-2.jpg",
      ]
    return (
        <div className={styles['banner']}>
          <div className={styles['slider-container']}>
            <Slider imagesArr={bannerData} />
          </div>
          <div className={styles['voucher-container']}>
            <img className={styles['voucher-container__image']} src="/images/banner/discount-voucher.jpg" width="100%" height="100%" />
          </div>
        </div>
    )
}

export default Banner;