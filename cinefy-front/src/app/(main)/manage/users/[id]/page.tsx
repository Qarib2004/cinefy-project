import type { Metadata } from 'next'


import { IPageIdParam } from '@/types/page-params.types'

import UserEdit from './UserEdit'
import { NO_INDEX_PAGE } from '@/constants/seo.constant'

export const metadata: Metadata = {
	title: 'User setup',
	...NO_INDEX_PAGE
}

export default async function UserEditPage({ params }: IPageIdParam) {
	const resolvedParams = await params
	return <UserEdit userId={resolvedParams.id} />
}