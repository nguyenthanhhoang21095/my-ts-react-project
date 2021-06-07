import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import { 
  StyledSliderContainer,
  StyledImageOverlay, 
  StyledSliderImage,
  StyledQuoteContainer,
  StyledQuoteContent,
  StyledQuoteSymbol,
  StyledQuoteAuthor,
  StyledQuoteBlockQuote,
  StyledQuoteDivider,
} from './Slider.styled'

interface CarouselProps {
    imagesArr: string[];
    sliderWidth: string;
    sliderHeight: string;
}

const Slider:React.FC<CarouselProps> = ({imagesArr, sliderWidth="", sliderHeight=""}):JSX.Element => {
    return (
        <StyledSliderContainer sliderWidth={sliderWidth} sliderHeight={sliderHeight}>
            <StyledImageOverlay />
            <StyledQuoteContainer>
              <StyledQuoteContent>
              <StyledQuoteSymbol> ❛❛ </StyledQuoteSymbol> 
              <StyledQuoteDivider dividerStyle="top: 50px; width: 80%; left: 75px;" />
              <StyledQuoteAuthor>Lewis Hamilton</StyledQuoteAuthor>
              <StyledQuoteBlockQuote>The way I drive, the way I handle a car, is an expression of my inner feelings.</StyledQuoteBlockQuote>
              <StyledQuoteDivider dividerStyle="top: 150px; width: 90%; left: 20px;" />
              </StyledQuoteContent>
            </StyledQuoteContainer>
            <Carousel>
                {imagesArr.length && imagesArr.map((img, idx) => (
                  <StyledSliderImage key={idx} src={img} alt=""  width="100%" height={sliderHeight} />
                ))}
            </Carousel>
        </StyledSliderContainer>
    )
}

export default Slider;