import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { IGalleryItem } from '@/components/ui/gallery/gallery.interface'

import { PUBLIC_URL } from '@/config/url.config'

import { movieService } from '@/services/movie.service'

import { TypeParamSlug } from '@/types/page-params.types'

import Movie from './Movie'

export const revalidate = 60

export async function generateStaticParams() {
  const movies = await movieService.getAll()

  const paths = movies.map(movie => {
    return {
      slug: movie.slug // Изменилось: просто slug вместо { params: { slug } }
    }
  })

  return paths
}

async function getMovie(params: TypeParamSlug) {
  try {
    const movie = await movieService.getBySlug(params?.slug as string)

    if (!movie) return redirect('/404')

    const dataSimilarMovies = await movieService.getByGenres(
      movie.genres.map(genre => genre.id)
    )

    const similarMovies: IGalleryItem[] = dataSimilarMovies.data
      .filter(m => m.id !== movie.id)
      .slice(0, 6)
      .map(m => ({
        name: m.title,
        poster: m.poster,
        link: PUBLIC_URL.movie(m.slug)
      }))

    return { movie, similarMovies }
  } catch (error) {
    return redirect('/404')
  }
}

export async function generateMetadata({
  params
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; // await the promise
  const { movie } = await getMovie({ slug })

  return {
    title: movie.title,
    openGraph: {
      images: {
        url: movie.bigPoster
      }
    }
  }
}

export default async function MoviePage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const { movie, similarMovies } = await getMovie({ slug })

  return (
    <Movie
      initialMovie={movie}
      similarMovies={similarMovies}
      slug={slug} // Передаем slug как строку, а не из params
    />
  )
}