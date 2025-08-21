import { useMutation } from '@tanstack/react-query'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

import { fileService } from '@/services/file.service'

type TypeUpload = (
	onChange: (...event: any[]) => void,
	folder?: string
) => {
	uploadImage: (event: ChangeEvent<HTMLInputElement>) => Promise<void>
	isLoading: boolean
}

export const useUpload: TypeUpload = (onChange, folder) => {
	const [isLoading, setIsLoading] = useState(false)

    const { mutateAsync } = useMutation({
        mutationKey: ['upload file'],
        mutationFn: (files: File[]) => fileService.uploadMultiple(files, folder),
        onSuccess(data) {
            onChange(data[0]) 
        },
        onError() {
            toast.error('File loading error')
        }
    })
    

    const uploadImage = useCallback(
        async (event: ChangeEvent<HTMLInputElement>) => {
            setIsLoading(true)
    
            try {
                const files = event.target.files
                if (files?.length) {
                    const fileArray = Array.from(files) // <-- превращаем FileList в File[]
                    await mutateAsync(fileArray)
                }
            } finally {
                setIsLoading(false)
            }
        },
        [mutateAsync]
    )
    

	return useMemo(
		() => ({
			uploadImage,
			isLoading
		}),
		[uploadImage, isLoading]
	)
}