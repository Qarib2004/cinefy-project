import type { Metadata } from 'next'


import { IPageIdParam } from '@/types/page-params.types'

import GenreEdit from './GenreEdit'
import { NO_INDEX_PAGE } from '@/constants/seo.constant'

export const metadata: Metadata = {
	title: 'Setting the genre',
	...NO_INDEX_PAGE
}

export default function GenreEditPage({ params }: IPageIdParam) {
	return <GenreEdit genreId={params.id} />
}