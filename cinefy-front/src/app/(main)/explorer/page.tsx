import type { Metadata } from 'next'

import Catalog from '@/components/ui/catalog-movies/Catalog'

import { movieService } from '@/services/movie.service'

export const metadata: Metadata = {
	title: 'New films'
}

export const revalidate = 60

async function getMovies() {
	const data = await movieService.getAll()
	return data
}

export default async function ExplorerPage() {
	const data = await getMovies()

	return (
		<div className='px-6'>
			<Catalog
				title='New films'
				description='New films and TV shows in excellent quality: legal, safe, without advertising.'
				movies={data}
			/>
		</div>
	)
}