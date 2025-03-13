"use client"

import { usePostStore } from "@/stores/post-store"
import { useAuthStore } from "@/stores/auth" // Importe o store de autenticação
import dayjs from "dayjs"
import { Edit3Icon, Trash2Icon } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import { toast } from "sonner"

export default function PostsTable() {
  const fetchPosts = usePostStore((state) => state.fetchPosts)
  const deletePost = usePostStore((state) => state.deletePost)
  const posts = usePostStore((state) => state.posts)
  const userId = useAuthStore((state) => state.userId) // Obtenha o userId do usuário logado

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const handleDelete = (postId: number, postTitle: string) => {
    toast(`Você gostaria de excluir: "${postId} - ${postTitle}?"`, {
      duration: Infinity,
      action: (
        <div className="flex flex-row gap-4 **:cursor-pointer **:text-nowrap">
          <button
            className="rounded bg-red-200 px-1 py-2 font-semibold"
            onClick={() => toast.dismiss()}
          >
            Cancelar
          </button>

          <button
            className="rounded bg-green-200 px-1 py-2 font-semibold"
            onClick={async () => {
              await deletePost(postId)
              fetchPosts()
              toast.dismiss()
              toast.success(`Post "${postId} - ${postTitle}" excluído com sucesso.`)
            }}
          >
            Confirmar
          </button>
        </div>
      ),
    })
  }

  return (
    <div className="mt-6 overflow-x-auto rounded">
      <table className="w-full">
        <thead className="bg-blue-100/80">
          <tr className="**:text-main-dark-blue **:px-4 **:py-3 **:text-left **:text-sm **:font-semibold **:tracking-wide **:uppercase">
            <th>Id</th>
            <th>Título</th>
            <th className="hidden md:block">Subtítulo</th>
            <th>Data de criação</th>
            <th>Última alteração</th>
            <th>Proprietário</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 bg-white">
          {posts.map((post) => (
            <tr
              key={post.id}
              className="transition-colors **:text-sm even:bg-gray-100/80 hover:bg-zinc-300"
            >
              <td className="px-4 py-3 font-semibold whitespace-nowrap">{post.id}</td>
              <td className="max-w-[240px] truncate px-4 py-3">{post.titulo}</td>
              <td className="hidden max-w-[240px] truncate px-4 py-3 md:block">{post.subtitulo}</td>
              <td className="px-4 py-3 whitespace-nowrap">
                {dayjs(post.dtcriacao).format("DD/MM/YYYY HH:mm")}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                {dayjs(post.dtalteracao).format("DD/MM/YYYY HH:mm")}
              </td>
              <td className="px-4 py-3">{post.usuario.nome}</td>
              <td className="flex content-center items-center gap-6 **:mt-2">
                {Number(userId) === post.usuario.id && ( // Verifique se o userId logado é o proprietário do post
                  <>
                    <Link
                      href={`/posts/editar/${post.id}`}
                      className="block cursor-pointer"
                      title={`Editar post: "${post.id} - ${post.titulo}"`}
                    >
                      <Edit3Icon size={20} />
                    </Link>
                    <button
                      type="button"
                      className="cursor-pointer"
                      title={`Excluir post: "${post.id} - ${post.titulo}"`}
                      onClick={() => handleDelete(post.id, post.titulo)}
                    >
                      <Trash2Icon size={20} />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
