import type { Metadata } from 'next'

import { IPageIdParam } from '@/types/page-params.types'

import ActorEdit from './ActorEdit'
import { NO_INDEX_PAGE } from '@/constants/seo.constant'

export const metadata: Metadata = {
	title: 'Setting up the actor',
	...NO_INDEX_PAGE
}

export default async function ActorEditPage({ params }: IPageIdParam) {
	const resolvedParams = await params
	return <ActorEdit actorId={resolvedParams.id} />
}