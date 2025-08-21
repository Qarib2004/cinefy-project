'use client'

import { FC } from 'react'

import AdminList from '@/components/ui/admin/admin-table/admin-list/AdminList'
import Heading from '@/components/ui/heading/Heading'

import { useAdminGenres } from './useAdminGenres'
import AdminHeader from '@/components/ui/admin/admin-table/admin-haeder/AdminHeader'

const Genres: FC = () => {
	const {
		handleSearch,
		searchTerm,
		genres,
		isLoading,
		createAsync,
		deleteAsync
	} = useAdminGenres()

	return (
		<div className='px-6'>
			<Heading>Genres</Heading>

			<AdminHeader
				handleSearch={handleSearch}
				searchTerm={searchTerm}
				onClick={createAsync}
			/>
			<AdminList
				listItems={genres || []}
				headerItems={['Name', 'Link']}
				isLoading={isLoading}
				removeHandler={deleteAsync}
			/>
		</div>
	)
}

export default Genres