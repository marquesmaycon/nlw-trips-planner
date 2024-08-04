import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link2, Tag, X } from "lucide-react"

import Button from "../../../components/Button"
import { queryClient } from "../../../libs/tanStackQuery"
import { Link, LinkModalProps } from "../../../validation/types"
import { linkDefaultValues, LinkSchema, linkSchema } from "../../../validation/schemas"
import { useCreateLink, useEditLink } from "../../../hooks/api/link"

const LinkModal = ({ setIsLinkModalOpen, linkId }: LinkModalProps) => {
  const { tripId } = useParams()

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<LinkSchema>({
    defaultValues: linkDefaultValues,
    resolver: zodResolver(linkSchema),
  })

  useEffect(() => {
    if (!linkId) return
    reset(currLink)
  }, [linkId])

  const currLink = queryClient.getQueryData<Link[]>(["links", tripId])?.find((link) => link.id === linkId)

  const { mutateAsync: createLink, isPending: isCreating } = useCreateLink(tripId!)
  const { mutateAsync: editLink, isPending: isEditing } = useEditLink(tripId!)

  async function onSubmit(data: LinkSchema) {
    linkId ? await editLink({ id: linkId, ...data }) : await createLink(data)
    setIsLinkModalOpen(false)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[640px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{linkId ? "Editar" : "Cadastrar"} link</h2>
            <button type="button" onClick={() => setIsLinkModalOpen(false)}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-small text-zinc-400">Todos convidados podem visualizar os links.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="flex h-14 items-center gap-2.5 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5">
            <Tag className="size-5 text-zinc-400" />

            <input
              className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
              placeholder="Do que se trata o link?"
              {...register("title")}
            />
          </div>

          <div className="flex h-14 flex-1 items-center gap-2.5 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5">
            <Link2 className="size-5 text-zinc-400" />

            <input placeholder="Endereço do link" className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none" {...register("url")} />
          </div>

          <div>
            {Object.entries(errors).map(([field, error]) => (
              <p key={field} className="text-xs text-red-400">
                {error?.message}
              </p>
            ))}
          </div>

          <Button type="submit" size="full" isLoading={isCreating}>
            {isCreating || isEditing ? "Salvando..." : "Salvar link"}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default LinkModal
