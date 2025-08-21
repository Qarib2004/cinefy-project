'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

import Button from '../form-elements/button/Button'
import Heading from '../heading/Heading'

import styles from './Slider.module.scss'
import { ISlide } from './slider.interface'

interface ISlideItem {
  slide: ISlide
}

const SlideItem: FC<ISlideItem> = ({ slide }) => {
  const { push } = useRouter()

  return (
    <div className={styles.slide}>
      {slide.bigPoster && (
        <Image
          className={styles.image}
          src={slide.bigPoster}
          alt={slide.title}
          fill
          style={{ objectFit: 'contain' }} // важно!
          priority
          quality={100} // максимальное качество
        />
      )}

      <div className={styles.content}>
        <Heading className={styles.title}>{slide.title}</Heading>
        <div className={styles.sub_title}>{slide.subTitle}</div>
        <Button className={styles.button} onClick={() => push(slide.link)}>
          Watch
        </Button>
      </div>
    </div>
  )
}

export default SlideItem
