import { Link2, Plus } from "lucide-react"
import Button from "../../components/Button"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { linksController } from "../../controllers/LinksController"
import { Link } from "../../validation/types"

const ImportantLinks = () => {
  const { tripId } = useParams()
  const [links, setLinks] = useState<Link[]>([])

  useEffect(() => {
    if (!tripId) return
    const fetchLinks = async () => {
      const links = await linksController.getResources(tripId)
      setLinks(links)
    }
    fetchLinks()
  }, [tripId])

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
          <div className="flex items-center justify-between gap-4">
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
            <Link2 className="size-5 text-zinc-400" />
          </div>
        ))}
      </div>

      <Button variant="secondary" size="full">
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>
    </div>
  )
}

export default ImportantLinks
