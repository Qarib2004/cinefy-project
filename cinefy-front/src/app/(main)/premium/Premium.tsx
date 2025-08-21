'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import toast from 'react-hot-toast'
import { BsCheckCircle } from 'react-icons/bs'
import { LuLoader } from 'react-icons/lu'

import Button from '@/components/ui/form-elements/button/Button'
import Heading from '@/components/ui/heading/Heading'

import { DASHBOARD_URL, PUBLIC_URL } from '@/config/url.config'

import { useProfile } from '@/hooks/useProfile'

import { paymentService } from '@/services/payment.service'

import { convertPrice } from '@/utils/string/convertPrice'

import styles from './Premium.module.scss'

const Premium: FC = () => {
    const { push } = useRouter()

    const { user, isLoading } = useProfile()
    
    const { mutate, isPending } = useMutation({
        mutationKey: ['create payment'],
        mutationFn: (amount: number) => {
            console.log('Calling checkout with amount:', amount)
            return paymentService.checkout(amount)
        },
        onSuccess({ data }) {
            console.log('Payment success, response data:', data)
            push(data.url)
        },
        onError(error) {
            console.error('Creating a payment error:', error)
            toast.error('Creating a payment error')
        }
    })
    
    const handleClick = (amount: number) => {
        console.log('handleClick called with amount:', amount)
        if (user?.isHasPremium) {
            console.log('User has premium, redirecting to dashboard')
            push(DASHBOARD_URL.root())
        } else if (user) {
            console.log('User is logged in, creating payment...')
            mutate(amount)
        } else {
            console.log('User is not logged in, redirecting to auth')
            push(PUBLIC_URL.auth())
        }
    }
    

	return (
		<div className={styles.wrapper}>
			<Heading className={styles.heading}>Subscribe</Heading>
			<div className={styles.description}>
				By purchasing a premium subscription, you get access to thousands of
				hours COMPENTENTEN in high quality.
			</div>

			<div className={styles.card_wrapper}>
				<div className={styles.plan}>
					<h1 className={styles.heading}>{convertPrice(18)}</h1>

					<ul className={styles.features}>
						<li className={styles.feature}>
							<BsCheckCircle className={styles.icon} />
							Download films{' '}
						</li>
						<li className={styles.feature}>
							<BsCheckCircle className={styles.icon} />
							Lack of advertising{' '}
						</li>
						<li className={styles.feature}>
							<BsCheckCircle className={styles.icon} />
							High flow quality{' '}
						</li>
					</ul>

					<Button
						onClick={() => handleClick(18)}
						className={styles.button}
					>
						{isLoading || isPending ? (
							<LuLoader className={styles.loader} />
						) : user?.isHasPremium ? (
							'Go to the cabт'
						) : (
							`Pay ${convertPrice(18)}`
						)}
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Premium
