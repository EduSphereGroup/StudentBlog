"use client"

import { FormField } from "@/app/components/CustomForm/components/FormField/FormField"
import FormButton from "@/app/components/CustomForm/components/FormButton/FormButton"
import { CustomForm } from "@/app/components/CustomForm/CustomForm"
import { usePostStore } from "@/stores/post-store"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { use, useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"
import { Post } from "@/@interfaces/post"

export default function EditarPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const postId = Number(id)
  const form = useForm<Post>()
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle")
  const [foundPost, setFoundPost] = useState<Post | undefined>(undefined)

  const getPostById = usePostStore((state) => state.getPostById)
  const updatePost = usePostStore((state) => state.updatePost)

  useEffect(() => {
    if (postId) {
      const post = getPostById(postId)
      setFoundPost(post)
      if (post) {
        form.reset(post) // Reset form with post data when loaded
      }
    }
  }, [postId, getPostById, form])

  const hasChangedFields = (postData: Partial<Post>) => {
    if (!foundPost) return false

    const editableFields: (keyof Post)[] = ["titulo", "subtitulo", "conteudo", "urlimagem"]
    return editableFields.some((field) => postData[field] !== foundPost[field])
  }

  const onSubmit: SubmitHandler<Post> = async (data: Post) => {
    if (hasChangedFields(data)) {
      setStatus("pending")

      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { tituloslug, ...dataWithoutSlug } = data
        const updatedPost = await updatePost(postId, dataWithoutSlug)

        // Atualiza o estado local e reseta o formulário
        setFoundPost(updatedPost)
        form.reset(updatedPost)

        setStatus("success")
        toast.success(`"${dataWithoutSlug.titulo}" alterado com sucesso`)
      } catch (error) {
        setStatus("error")
        toast.error(error instanceof Error ? error.message : "Erro desconhecido")
      }
    } else {
      toast.warning("Nenhum campo foi alterado, realize alguma alteração e tente novamente.", {
        closeButton: true,
      })
    }
  }

  return (
    <main className="mx-auto max-w-2xl p-4">
      <Link
        className="hover:text-main-dark-blue mb-6 flex w-fit items-center gap-0.5 text-sm text-zinc-500 transition-colors"
        href={"/gerenciamento"}
        title="Voltar para a página anterior"
      >
        <ArrowLeft size={16} />
        Voltar
      </Link>
      {foundPost ? (
        <CustomForm
          form={form}
          onSubmit={onSubmit}
        >
          <h1 className="text-main-dark-blue mb-6 text-2xl font-semibold">
            Editar post &quot;{foundPost.id}&quot;
          </h1>
          <FormField
            id="titulo"
            label="Título"
            defaultValue={foundPost.titulo}
            validation={{ required: "Título é obrigatório" }}
            placeholder="Insira o título"
          />
          <FormField
            id="subtitulo"
            label="Subtítulo"
            isTextArea
            rows={2}
            defaultValue={foundPost.subtitulo}
            validation={{ required: "Subtítulo é obrigatório" }}
            placeholder="Insira o subtítulo"
          />
          <FormField
            id="conteudo"
            label="Conteúdo"
            isTextArea
            rows={8}
            defaultValue={foundPost.conteudo}
            validation={{
              required: "Conteúdo é obrigatório",
              minLength: { value: 100, message: "Mínimo de 100 caracteres" },
            }}
            placeholder="Insira o conteúdo completo"
          />
          <FormField
            id="urlimagem"
            label="Imagem"
            type="file"
            accept="image/*"
            className="mb-6"
          />
          <FormButton
            type="submit"
            title="Salvar alterações"
          >
            {status === "pending" ? "Enviando..." : "Salvar alterações"}
          </FormButton>
        </CustomForm>
      ) : (
        <p>Post não encontrado...</p>
      )}
    </main>
  )
}
