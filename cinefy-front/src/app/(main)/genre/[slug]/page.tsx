import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Catalog from '@/components/ui/catalog-movies/Catalog'
import { genreService } from '@/services/genre.service'
import { movieService } from '@/services/movie.service'

type TypeParamSlug = {
  slug: string
}

export const revalidate = 60

export async function generateStaticParams() {
  const genres = await genreService.getAll()
  return genres.map(genre => ({ slug: genre.slug }))
}

async function getMovies(slug: string) {
  try {
    const { data: genre } = await genreService.getBySlug(slug)
    if (!genre) return redirect('/404')

    const { data: movies } = await movieService.getByGenres([genre.id])
    return { genre, movies: movies || [] }
  } catch {
    return redirect('/404')
  }
}

export async function generateMetadata({
  params
}: { params: TypeParamSlug }): Promise<Metadata> {
  const { genre, movies } = await getMovies(params.slug)
  return {
    title: genre.name,
    description: genre.description,
    openGraph: {
      images: movies[0] ? [{ url: movies[0].poster }] : [],
      description: genre.description
    }
  }
}

export default async function GenrePage({
  params
}: { params: TypeParamSlug }) {
  const { genre, movies } = await getMovies(params.slug)

  if (!movies || movies.length === 0) {
    return (
      <div className="px-6 py-10 text-center text-xl text-neutral-400">
        There are no films in this genre yet.
      </div>
    )
  }

  return (
    <div className="px-6">
      <Catalog
        title={genre.name}
        description={genre.description}
        movies={movies}
      />
    </div>
  )
}
