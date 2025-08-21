'use client'

import { FC } from 'react'

import Heading from '@/components/ui/heading/Heading'

import { useAdminUsers } from './useAdminUsers'
import AdminHeader from '@/components/ui/admin/admin-table/admin-haeder/AdminHeader'
import AdminList from '@/components/ui/admin/admin-table/admin-list/AdminList'

const Users: FC = () => {
	const { handleSearch, searchTerm, users, isLoading, deleteAsync } =
		useAdminUsers()

	return (
		<div className='px-6'>
			<Heading>Users</Heading>

			<AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} />
			<AdminList
				listItems={users || []}
				headerItems={['Name', 'Post office', 'Role']}
				isLoading={isLoading}
				removeHandler={deleteAsync}
			/>
		</div>
	)
}

export default Users