import type { Metadata } from 'next'
import Link from 'next/link'

import Heading from '@/components/ui/heading/Heading'

import { PUBLIC_URL } from '@/config/url.config'


import styles from './NotFound.module.scss'
import { NO_INDEX_PAGE } from '@/constants/seo.constant'

export const metadata: Metadata = {
	title: 'The page does not exist!',
	...NO_INDEX_PAGE
}

export default function NotFoundPage() {
	return (
		<div className={styles.wrapper}>
			<div className={styles.area}>
				<Heading>404. Page was not found</Heading>
				<p>Hmm, it seems, this page does not exist.</p>
				<Link href={PUBLIC_URL.home()} className={styles.link}>
Go to the main one				</Link>
			</div>
		</div>
	)
}