import cn from 'clsx'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { PUBLIC_URL } from '@/config/url.config'

import styles from './Logo.module.scss'

const font = Poppins({
	subsets: ['latin'],
	weight: ['600']
})

const Logo: FC = () => {
	return (
		<Link href={PUBLIC_URL.home()} className={styles.logo}>
			<Image src='/images/logo-cinefy.jpg' alt='CinemaHub' width={50} height={50} />
			<div
				className={cn('font-semibold text-2xl text-white', font.className)}
			>
				Cine<span className='text-primary'>Fy</span>
			</div>
		</Link>
	)
}

export default Logo