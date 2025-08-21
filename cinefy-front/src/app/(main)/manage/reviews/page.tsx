import { NO_INDEX_PAGE } from '@/constants/seo.constant'
import type { Metadata } from 'next'
import Reviews from './Review'



export const metadata: Metadata = {
	title: 'Reviews',
	...NO_INDEX_PAGE
}

export default function ReviewsPage() {
	return <Reviews />
}