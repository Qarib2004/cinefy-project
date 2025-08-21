import Link from 'next/link'
import { FC } from 'react'

import Button from '@/components/ui/form-elements/button/Button'

import { PUBLIC_URL } from '@/config/url.config'

import styles from './PremiumPlaceholder.module.scss'

const PremiumPlaceHolder: FC = () => {
	return (
		<div className={styles.placeholder}>
			<div>
				<div>
					To watch films, you need to arrange a premium subscription.{' '}
				</div>
				<Link href={PUBLIC_URL.premium()}>
					<Button className={styles.btn} size='sm'>
						Buy premium
					</Button>
				</Link>
			</div>
		</div>
	)
}

export default PremiumPlaceHolder
