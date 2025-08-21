import type { Metadata } from 'next'


import Actors from './Actors'
import { NO_INDEX_PAGE } from '@/constants/seo.constant'

export const metadata: Metadata = {
	title: 'Actors',
	...NO_INDEX_PAGE
}

export default function ActorsPage() {
	return <Actors />
}