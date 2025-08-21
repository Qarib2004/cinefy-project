import cn from 'clsx'
import { FC } from 'react'
import * as Icons from 'react-icons/lu'

export type TypeIconName = keyof typeof Icons

interface IIcon {
	name: TypeIconName
	className?: string
}

export const Icon: FC<IIcon> = ({ name, className }) => {
	const IconComponent = Icons[name]

	if (!IconComponent) {
		console.warn(`Icon "${name}" does not exist`)
		return null
	}

	return <IconComponent className={cn('size-4', className)} />
}
