import React from 'react'
import { 
    StyledBanner,
    SliderContain,
    StyledVoucher,
    StyledVoucherImg,
} from './Banner.styled'
import { Slider } from 'src/components/ui-kits/Slider'

interface BannerProps {

}
const Banner: React.FC<BannerProps> = () => {
    const bannerData = [
        "/images/banner/banner-0.jpg",
        "/images/banner/banner-1.jpg",
        "/images/banner/banner-2.jpg",
      ]
    return (
        <StyledBanner>
          <SliderContain>
            <Slider imagesArr={bannerData} sliderWidth="100%" sliderHeight="500px" />
          </SliderContain>
          <StyledVoucher>
            <StyledVoucherImg src="/images/banner/discount-voucher.jpg" width="100%" height="100%" />
          </StyledVoucher>
        </StyledBanner>
    )
}

export default Banner;