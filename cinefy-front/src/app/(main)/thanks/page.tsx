import type { Metadata } from 'next'
import Link from 'next/link'

import Button from '@/components/ui/form-elements/button/Button'
import Heading from '@/components/ui/heading/Heading'

import { DASHBOARD_URL } from '@/config/url.config'


import styles from './Thanks.module.scss'
import { NO_INDEX_PAGE } from '@/constants/seo.constant'

export const metadata: Metadata = {
	title: 'Successful purchase',
	...NO_INDEX_PAGE
}

export default function ThanksPage() {
	return (
		<div className={styles.wrapper}>
			<div className={styles.area}>
				<Heading>Successful purchase</Heading>
				<p>СThank you for purchasing on our website.</p>
				<Link href={DASHBOARD_URL.root()}>
					<Button>Go to personal account</Button>
				</Link>
			</div>
		</div>
	)
}