import { IListItem } from "@/components/ui/admin/admin-table/admin-list/admin-list.interface"
import { ADMIN_URL, PUBLIC_URL } from "@/config/url.config"
import { useDebounce } from "@/hooks/useDebounce"
import { genreService } from "@/services/genre.service"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { ChangeEvent, useMemo, useState } from "react"
import toast from "react-hot-toast"









export const useAdminGenres = () => {
    const [searchTerm,setSearchTerm] = useState('')
    const debounsedSearch = useDebounce(searchTerm,500)

    const queryQlient = useQueryClient()

    const {data:genres,isLoading} = useQuery({
        queryKey:['get genres for admin dashboard',debounsedSearch],
        queryFn:() => genreService.getAll(debounsedSearch),
        select:data => 
            data.map(
                (genre):IListItem => ({
                    id:genre.id,
                    viewUrl:PUBLIC_URL.genre(genre.slug),
                    editUrl:ADMIN_URL.genreEdit(genre.id),
                    items:[genre.name,genre.slug]
                })
            )
    })


    const handleSearch = (event:ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }

    const {push} = useRouter()

    const {mutateAsync:createAsync} = useMutation({
        mutationKey:['create genre'],
        mutationFn:() => genreService.create(),
        onSuccess({data:id}) {
            toast.success('Genre created')
            push(ADMIN_URL.genreEdit(id))
            queryQlient.invalidateQueries({
                queryKey:['get genres for admin dahboard']
            })
        },
        onError(){
            toast.error('Error for creating')
        }
    })

    const{mutateAsync:deleteAsync} = useMutation({
        mutationKey:['delete genre'],
        mutationFn: (genreId:string) => genreService.delete(genreId),
        onSuccess(){
            toast.success('Genre deleted')
            queryQlient.invalidateQueries({
                queryKey:['get genres for admin dashboard']
            })
        },
		onError() {
			toast.error('Error when removing')
		}
	})

	return useMemo(
		() => ({
			handleSearch,
			searchTerm,
			genres,
			isLoading,
			createAsync,
			deleteAsync
		}),
		[handleSearch, searchTerm, genres, isLoading, createAsync, deleteAsync]
	)
}