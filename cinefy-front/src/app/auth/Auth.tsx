'use client'

import Image from 'next/image'
import React, { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Button from '@/components/ui/form-elements/button/Button'
import Heading from '@/components/ui/heading/Heading'

import { IAuthForm } from '@/types/auth.types'

import styles from './Auth.module.scss'
import AuthFields from './AuthFields'
import { useAuthMutation } from './useAuthMutation'

const Auth: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	  } = useForm<IAuthForm>({ mode: 'onChange' })
	  
	  const [isLoginForm, setIsLoginForm] = useState(true)
	  
	
	  
	  const { mutate } = useAuthMutation(isLoginForm, reset)
	  
	  const onSubmit: SubmitHandler<IAuthForm> = data => {
		mutate(data)
	  }
	  
	  
	  

	return (
		<div className={styles.wrapper}>
			<div className={styles.left}>
				<Heading className={styles.headin}>
					{isLoginForm ? 'Enter the account' : 'Registration'}
				</Heading>
				<form onSubmit={handleSubmit(onSubmit)}>
					<AuthFields
						register={register}
						errors={errors}
						isLoginForm={isLoginForm}
					/>
						<Button className={styles.button}>
					{isLoginForm ? 'Enter' : 'Create account'}
				</Button>
				</form>
			
				<div className={styles.toggle}>
				{isLoginForm ? 'There is no account yet? ' : 'There is already an account? '}
					<button
						type='button'
						onClick={() => setIsLoginForm(isLoginForm ? false : true)}
						className='text-primary'
					>
						{isLoginForm ? 'Create account' : 'Enter the account'}
					</button>
				</div>
			</div>
			<div className={styles.right}>
				<Image
					src='/images/logo-cinefy.jpg'
					height={700}
					width={600}
					alt='authorization'
				/>
			</div>
		</div>
	)
}

export default Auth
