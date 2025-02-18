"use client"

import { Post } from "@/interfaces/post"
import { usePostStore } from "@/stores/post-store"
import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import dayjs from "dayjs"
import Image from "next/image"

export default function PostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params) // Correção: recebe params diretamente
  const router = useRouter()
  dayjs.locale("pt-br")
  const { getPostBySlug, fetchPosts } = usePostStore()
  const [post, setPost] = useState<Post | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      await fetchPosts()
      const postFound = await getPostBySlug(slug)

      if (!postFound) {
        // TODO: throw 404 caso o post não seja encontrado
        setLoading(false)
      }

      setPost(postFound)
      setLoading(false)
    }

    loadData()
  }, [slug, fetchPosts, getPostBySlug, router])

  if (loading) {
    return <div>Carregando...</div>
  }

  if (!post) {
    ;<p>Postagem não encontrada...</p>
  }

  const data = dayjs(post?.dtcriacao)
  const dataFormatada = data.format("DD [de] MMMM [de] YYYY")

  return (
    <main>
      <article>
        <section className="mx-auto max-w-xs space-y-6 text-center md:max-w-2xl">
          <div className="flex items-center justify-center gap-4 text-sm font-medium">
            <time
              className="rounded-full bg-blue-100 px-4 py-2 font-light"
              dateTime={post?.dtcriacao?.toString()}
            >
              {dataFormatada}
            </time>
            <p>{post?.usuario.nome}</p>
          </div>
          <div className="space-y-3">
            <h1 className="text-main-dark-blue text-3xl font-semibold tracking-wide">
              {post?.titulo}
            </h1>
            <p className="font-normal">{post?.subtitulo}</p>
          </div>
        </section>
        {post?.urlimagem && (
          <Image
            src={post.urlimagem}
            width={512}
            height={306}
            className="mx-auto h-fit object-cover pt-4"
            alt={`Imagem que representa postagem ${post?.titulo}`}
          />
        )}
        <section className="mx-auto max-w-xs pt-4 md:max-w-2xl lg:max-w-4xl lg:pt-12 2xl:max-w-5xl">
          <p className="leading-7 font-light">{post?.conteudo}</p>
        </section>
      </article>
    </main>
  )
}
