"use client"

import { usePostStore } from "@/stores/post-store"
import dayjs from "dayjs"
import { Edit3Icon, Trash2Icon } from "lucide-react"
import { useEffect } from "react"
import { toast } from "sonner"

export default function PostsTable() {
  const fetchPosts = usePostStore((state) => state.fetchPosts)
  const deletePost = usePostStore((state) => state.deletePost)
  const posts = usePostStore((state) => state.posts)

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const handleDelete = (postId: number, postTitle: string) => {
    toast(`Você gostaria de excluir o post ${postId} - ${postTitle}?`, {
      duration: Infinity,
      action: {
        label: "Confirmar",
        onClick: async () => {
          await deletePost(postId)
          fetchPosts()
          toast.success(`Post "${postId} - ${postTitle}" excluído com sucesso.`)
        },
      },
    })
  }

  return (
    <div className="mt-6 overflow-x-auto rounded">
      <table className="w-full">
        <thead className="bg-blue-100/80">
          <tr className="**:text-main-dark-blue **:px-4 **:py-3 **:text-left **:text-sm **:font-semibold **:tracking-wide **:uppercase">
            <th>Id</th>
            <th>Título</th>
            <th>Subtítulo</th>
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
              className="hover:bg-main-dark-blue/10 transition-colors **:text-sm even:bg-gray-100/80"
            >
              <td className="px-4 py-3 font-semibold whitespace-nowrap">{post.id}</td>
              <td className="max-w-[240px] truncate px-4 py-3">{post.titulo}</td>
              <td className="max-w-[240px] truncate px-4 py-3">{post.subtitulo}</td>
              <td className="px-4 py-3 whitespace-nowrap">
                {dayjs(post.dtcriacao).format("DD/MM/YYYY HH:mm")}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                {dayjs(post.dtalteracao).format("DD/MM/YYYY HH:mm")}
              </td>
              <td className="px-4 py-3">{post.usuario.nome}</td>
              <td className="content-center space-x-4">
                <button
                  type="button"
                  className="cursor-pointer"
                  title={`Editar post ${post.id} - ${post.titulo}`}
                >
                  <Edit3Icon size={20} />
                </button>
                <button
                  type="button"
                  className="cursor-pointer"
                  title={`Excluir post ${post.id} - ${post.titulo}`}
                  onClick={() => handleDelete(post.id, post.titulo)}
                >
                  <Trash2Icon size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
