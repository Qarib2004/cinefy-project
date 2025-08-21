import type { Metadata } from 'next'


import Movies from './Movies'
import { NO_INDEX_PAGE } from '@/constants/seo.constant'

export const metadata: Metadata = {
	title: 'Movies',
	...NO_INDEX_PAGE
}

export default function MoviesPage() {
	return <Movies />
}