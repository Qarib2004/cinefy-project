'use client'

import { FC } from 'react'

import AdminList from '@/components/ui/admin/admin-table/admin-list/AdminList'
import Heading from '@/components/ui/heading/Heading'

import { useAdminMovies } from './useAdminMovies'
import AdminHeader from '@/components/ui/admin/admin-table/admin-haeder/AdminHeader'

const Movies: FC = () => {
	const {
		handleSearch,
		searchTerm,
		movies,
		isLoading,
		createAsync,
		deleteAsync
	} = useAdminMovies()

	return (
		<div className='px-6'>
			<Heading>Movies</Heading>

			<AdminHeader
				handleSearch={handleSearch}
				searchTerm={searchTerm}
				onClick={createAsync}
			/>
			<AdminList
				listItems={movies || []}
				headerItems={['Name', 'Genres', 'Views']}
				isLoading={isLoading}
				removeHandler={deleteAsync}
			/>
		</div>
	)
}

export default Movies