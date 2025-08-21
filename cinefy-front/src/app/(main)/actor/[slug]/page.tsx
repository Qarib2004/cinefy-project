import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import Catalog from '@/components/ui/catalog-movies/Catalog'

import { actorService } from '@/services/actor.service'
import { movieService } from '@/services/movie.service'

import { TypeParamSlug } from '@/types/page-params.types'

export const revalidate = 60

export async function generateStaticParams() {
  const actors = await actorService.getAll()

  const paths = actors.map(actor => {
    return {
      slug: actor.slug // Для Next.js 15 просто возвращаем объект, а не { params: {} }
    }
  })

  return paths
}

async function getMovies(params: TypeParamSlug) {
  try {
    const { data: actor } = await actorService.getBySlug(
      params?.slug as string
    )

    if (!actor) return redirect('/404')

    const { data: movies } = await movieService.getByActor(actor.id)

    return { actor, movies }
  } catch (error) {
    return redirect('/404')
  }
}

export async function generateMetadata({
  params
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; // await the promise
  const { actor } = await getMovies({ slug })

  return {
    title: actor.name,
    openGraph: {
      images: {
        url: actor.photoUrl
      }
    }
  }
}

export default async function ActorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { actor, movies } = await getMovies({ slug })

  return (
    <div className='px-6'>
      <Catalog title={actor.name} movies={movies} />
    </div>
  )
}