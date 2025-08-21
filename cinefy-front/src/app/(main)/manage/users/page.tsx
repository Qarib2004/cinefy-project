import type { Metadata } from 'next'


import Users from './Users'
import { NO_INDEX_PAGE } from '@/constants/seo.constant'

export const metadata: Metadata = {
	title: 'Users',
	...NO_INDEX_PAGE
}

export default function UsersPage() {
	return <Users />
}