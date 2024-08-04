import { useState } from "react"
import { useParams } from "react-router-dom"
import { Link2, Plus, Trash } from "lucide-react"

import Button from "../../components/Button"
import LinkModal from "./modals/LinkModal"
import { useDeleteLink, useGetLinks } from "../../hooks/api/link"

const ImportantLinks = () => {
  const { tripId } = useParams()
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false)
  const [currLinkId, setCurrLinkId] = useState<string | null>(null)

  const { data: links } = useGetLinks(tripId!)
  const { mutateAsync: deleteLink, variables } = useDeleteLink(tripId!)
  function openCreateModal() {
    setIsLinkModalOpen(true)
    setCurrLinkId(null)
  }

  function openEditModal(linkId: string) {
    setIsLinkModalOpen(true)
    setCurrLinkId(linkId)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Link importantes</h2>

      <div className="space-y-5">
        {links?.length === 0 && <p className="text-sm text-zinc-500">Nenhum link cadastrado para essa viagem</p>}
        {links?.map((link, index) => (
          <div key={link.id} className={`group flex items-center justify-between gap-4 ${variables == link.id ? "animate-pulse" : ""}`}>
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">{link.title ?? `Link ${index + 1}`}</span>
              <a href={link.url} target="_blank" className="block shrink-0 truncate text-xs text-zinc-400 hover:text-zinc-200">
                {link.url}
              </a>
            </div>
            <div className="flex items-center gap-1">
              <Trash
                className="size-5 cursor-pointer text-transparent transition-all duration-200 ease-in group-hover:text-red-500/60"
                onClick={() => deleteLink(link.id)}
              />
              <Link2 className="size-5 cursor-pointer text-zinc-400 group-hover:text-lime-300/80" onClick={() => openEditModal(link.id)} />
            </div>
          </div>
        ))}
      </div>

      <Button variant="secondary" size="full" onClick={openCreateModal}>
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>

      {isLinkModalOpen && <LinkModal setIsLinkModalOpen={setIsLinkModalOpen} linkId={currLinkId} />}
    </div>
  )
}

export default ImportantLinks
