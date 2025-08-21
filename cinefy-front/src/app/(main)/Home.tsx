'use client'

import { FC } from 'react'

import Gallery from '@/components/ui/gallery/Gallery'
import { IGalleryItem } from '@/components/ui/gallery/gallery.interface'
import Heading from '@/components/ui/heading/Heading'
import Slider from '@/components/ui/slider/Slider'
import { ISlide } from '@/components/ui/slider/slider.interface'

interface IHome {
	slides: ISlide[]
	trendingMovies: IGalleryItem[]
	actors: IGalleryItem[]
}

const Home: FC<IHome> = ({ slides, trendingMovies, actors }) => {
	return (
		<>
			{slides.length > 0 && <Slider slides={slides} />}

			<div className='px-6 my-3'>
				<Heading className='text-xl mb-2'>In trend</Heading>
				{trendingMovies.length > 0 && <Gallery items={trendingMovies} />}
			</div>

			<div className='px-6 my-3'>
				<Heading className='text-xl mb-2'>The best actors</Heading>
				{actors.length > 0 && <Gallery items={actors} />}
			</div>
		</>
	)
}

export default Home
