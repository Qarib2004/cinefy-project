import type { Metadata } from 'next'


import Payments from './Payments'
import { NO_INDEX_PAGE } from '@/constants/seo.constant'

export const metadata: Metadata = {
	title: 'Payments',
	...NO_INDEX_PAGE
}

export default function PaymentsPage() {
	return <Payments />
}