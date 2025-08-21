import type { Metadata } from 'next'


import { IPageIdParam } from '@/types/page-params.types'

import MovieEdit from './MovieEdit'
import { NO_INDEX_PAGE } from '@/constants/seo.constant'

export const metadata: Metadata = {
	title: 'Film setting',
	...NO_INDEX_PAGE
}

export default function MovieEditPage({ params }: IPageIdParam) {
	return <MovieEdit movieId={params.id} />
}