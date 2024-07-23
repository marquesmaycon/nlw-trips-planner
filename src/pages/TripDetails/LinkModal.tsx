import { zodResolver } from "@hookform/resolvers/zod"
import { Link2, Tag, X } from "lucide-react"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import Button from "../../components/Button"
import { linksController } from "../../controllers/LinksController"
import {
  linkDefaultValues,
  LinkForm,
  linkSchema,
} from "../../validation/schemas"

type LinkModalProps = {
  setIsLinkModalOpen: (value: boolean) => void
  fetchLinks: () => void
}

const LinkModal = ({ setIsLinkModalOpen, fetchLinks }: LinkModalProps) => {
  const { tripId } = useParams()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LinkForm>({
    defaultValues: linkDefaultValues,
    resolver: zodResolver(linkSchema),
  })

  async function onSubmit(data: LinkForm) {
    const newLink = await linksController.createResource(tripId!, data)
    if (!newLink) return
    fetchLinks()
    setIsLinkModalOpen(false)
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Cadastrar link</h2>
            <button type="button" onClick={() => setIsLinkModalOpen(false)}>
              <X className="text-zinc-400 size-5" />
            </button>
          </div>
          <p className="text-small text-zinc-400">
            Todos convidados podem visualizar os links.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="px-4 h-14 py-2.5 border border-zinc-800 bg-zinc-950 rounded-lg flex gap-2.5 items-center">
            <Tag className="size-5 text-zinc-400" />

            <input
              className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none"
              placeholder="Do que se trata o link?"
              {...register("title")}
            />
          </div>

          <div className="px-4 flex-1 h-14 py-2.5 border border-zinc-800 bg-zinc-950 rounded-lg flex gap-2.5 items-center">
            <Link2 className="size-5 text-zinc-400" />

            <input
              placeholder="Endereço do link"
              className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none"
              {...register("url")}
            />
          </div>

          <div>
            {Object.entries(errors).map(([field, error]) => (
              <p key={field} className="text-red-400 text-xs">
                {error?.message}
              </p>
            ))}
          </div>

          <Button type="submit" size="full">
            Salvar link
          </Button>
        </form>
      </div>
    </div>
  )
}

export default LinkModal
