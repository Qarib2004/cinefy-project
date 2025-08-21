'use client'

import { FC } from 'react'

import AdminList from '@/components/ui/admin/admin-table/admin-list/AdminList'
import Heading from '@/components/ui/heading/Heading'

import { useAdminActors } from './useAdminActors'
import AdminHeader from '@/components/ui/admin/admin-table/admin-haeder/AdminHeader'

const Actors: FC = () => {
	const {
		handleSearch,
		searchTerm,
		actors,
		isLoading,
		createAsync,
		deleteAsync
	} = useAdminActors()

	return (
		<div className='px-6'>
			<Heading>Actors</Heading>

			<AdminHeader
				handleSearch={handleSearch}
				searchTerm={searchTerm}
				onClick={createAsync}
			/>
			<AdminList
				listItems={actors || []}
				headerItems={['Name', 'The number of films']}
				isLoading={isLoading}
				removeHandler={deleteAsync}
			/>
		</div>
	)
}

export default Actors