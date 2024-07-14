import { Link2, Plus } from "lucide-react"
import Button from "../../components/Button"

const ImportantLinks = () => {
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Link importantes</h2>

      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">
              Reserva do AirBnB
            </span>
            <a
              href="#"
              className="block text-xs text-zinc-400 hover:text-zinc-200 truncate shrink-0">
              https://www.airbnb.com.br/rooms/123456dada asdsa sd d asd
            </a>
          </div>
          <Link2 className="size-5 text-zinc-400" />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">
              Reserva do AirBnB
            </span>
            <a
              href="#"
              className="block text-xs text-zinc-400 hover:text-zinc-200 truncate shrink-0">
              https://www.airbnb.com.br/rooms/123456dada asdsa sd d asd
            </a>
          </div>
          <Link2 className="size-5 text-zinc-400" />
        </div>
      </div>

      <Button variant="secondary" size="full">
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>
    </div>
  )
}

export default ImportantLinks
