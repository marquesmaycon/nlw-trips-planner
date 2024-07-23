import { Link2, Plus, Trash } from "lucide-react"
import Button from "../../components/Button"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { linksController } from "../../controllers/LinksController"
import { Link } from "../../validation/types"
import LinkModal from "./LinkModal"

const ImportantLinks = () => {
  const { tripId } = useParams()
  const [links, setLinks] = useState<Link[]>([])
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false)

  useEffect(() => {
    fetchLinks()
  }, [tripId])

  const fetchLinks = async () => {
    if (!tripId) return
    const links = await linksController.getResources(tripId)
    setLinks(links)
  }

  const excluirLink = async (id: string) => {
    await linksController.deleteResource(id)
    fetchLinks()
  }

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Link importantes</h2>

      <div className="space-y-5">
        {links.length === 0 && (
          <p className="text-zinc-500 text-sm">
            Nenhum link cadastrado para essa viagem
          </p>
        )}
        {links.map((link, index) => (
          <div className="group flex items-center justify-between gap-4">
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">
                {link.title ?? `Link ${index + 1}`}
              </span>
              <a
                href={link.url}
                target="_blank"
                className="block text-xs text-zinc-400 hover:text-zinc-200 truncate shrink-0">
                {link.url}
              </a>
            </div>
            <div className="flex items-center gap-1">
              <Trash className="size-5 text-transparent group-hover:text-red-500/60 transition-all ease-in duration-200 cursor-pointer" onClick={() => excluirLink(link.id)} />
              <Link2 className="size-5 text-zinc-400" />
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="secondary"
        size="full"
        onClick={() => setIsLinkModalOpen(true)}>
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>

      {isLinkModalOpen && (
        <LinkModal setIsLinkModalOpen={setIsLinkModalOpen} fetchLinks={fetchLinks} />
      )}
    </div>
  )
}

export default ImportantLinks
