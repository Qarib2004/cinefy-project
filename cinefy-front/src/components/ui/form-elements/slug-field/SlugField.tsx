import { FC } from 'react'

import Field from '../field/Field'
import { ISlugField } from '../form.interface'

import styles from './SlugField.module.scss'

const SlugField: FC<ISlugField> = ({ error, register, generate }) => {
	return (
		<div className='relative'>
			<Field
				{...register('slug', {
					required: 'The link is required'
				})}
				placeholder='Link'
				error={error}
			/>
			<div className={styles.badge} onClick={generate}>
				сгенерировать
			</div>
		</div>
	)
}

export default SlugField