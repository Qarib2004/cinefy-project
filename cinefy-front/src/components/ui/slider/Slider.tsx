"use client"

import { FC } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

import { ISlide } from "./slider.interface"
import SlideItem from "./SlideItem"
import styles from "./Slider.module.scss"

interface ISlider {
  slides: ISlide[]
}

const Slider: FC<ISlider> = ({ slides }) => {
  return (
    <div className={styles.sliderWrapper}>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        className={styles.slider}
      >
        {slides.map(slide => (
          <SwiperSlide key={slide.id}>
            <SlideItem slide={slide} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Slider
