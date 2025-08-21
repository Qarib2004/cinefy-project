import type { Metadata } from 'next'


import Dashboard from './Dashboard'
import { NO_INDEX_PAGE } from '@/constants/seo.constant'

export const metadata: Metadata = {
	title: 'Personal office',
	...NO_INDEX_PAGE
}

export default function DashboardPage() {
	return <Dashboard />
}