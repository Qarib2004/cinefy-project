import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { IListItem } from '@/components/ui/admin/admin-table/admin-list/admin-list.interface'

import { paymentService } from '@/services/payment.service'

import { PaymentStatus } from '@/types/payment.types'

import { convertPrice } from '@/utils/string/convertPrice'
import { formatDate } from '@/utils/date/formatDate'

export const useAdminPayments = () => {
	const queryClient = useQueryClient()

	const { data: payments, isLoading } = useQuery({
		queryKey: ['get payments for admin dashboard'],
		queryFn: () => paymentService.getAll(),
		select: data =>
			data.map(
				(payment): IListItem => ({
					id: payment.id,
					items: [
						payment.status === PaymentStatus.PENDING
							? 'In anticipation'
							: 'Paid',
						formatDate(payment.createdAt),
						convertPrice(payment.amount)
					]
				})
			)
	})

	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete payment'],
		mutationFn: (paymentId: string) => paymentService.delete(paymentId),
		onSuccess() {
			toast.success('The payment is deleted')
			queryClient.invalidateQueries({
				queryKey: ['get payments for admin dashboard']
			})
		},
		onError() {
			toast.error('Error when removing')
		}
	})

	return useMemo(
		() => ({
			payments,
			isLoading,
			deleteAsync
		}),
		[payments, isLoading, deleteAsync]
	)
}