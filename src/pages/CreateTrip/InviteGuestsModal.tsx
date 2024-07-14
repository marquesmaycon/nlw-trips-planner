import { AtSign, Plus, X } from "lucide-react"
import Button from "../../components/Button"
import { InviteGuestsModalProps } from "../../types"

const InviteGuestsModal = ({
  tripData,
  setTripData,
  setIsGuestModalOpen,
}: InviteGuestsModalProps) => {
  function addGuestEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const email = new FormData(event.currentTarget).get("email")?.toString()
    if (!email) return
    if (tripData.guestsEmails.includes(email)) return

    setTripData((prev) => ({
      ...prev,
      guestsEmails: [...prev.guestsEmails, email],
    }))

    event.currentTarget.reset()
  }

  function removeEmailToInvite(email: string) {
    setTripData((prev) => ({
      ...prev,
      guestsEmails: prev.guestsEmails.filter(
        (prevEmail) => prevEmail !== email
      ),
    }))
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Selecionar convidados</h2>
            <button type="button" onClick={() => setIsGuestModalOpen(false)}>
              <X className="text-zinc-400 size-5" />
            </button>
          </div>
          <p className="text-small text-zinc-400">
            Os convidados irão receber e-mails para confirmar a participação na
            viagem.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {tripData.guestsEmails.map((email) => (
            <div
              key={email}
              className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2">
              <span className="text-zinc-300">{email}</span>
              <button type="button" onClick={() => removeEmailToInvite(email)}>
                <X className="text-zinc-400 size-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="h-px w-full bg-zinc-800" />

        <form
          onSubmit={addGuestEmail}
          className="px-4 py-2.5 border border-zinc-800 bg-zinc-950 rounded-lg flex gap-2.5 items-center">
          <AtSign className="size-5 text-zinc-400" />

          <input
            type="email"
            name="email"
            className="bg-transparent flex-1"
            placeholder="Digite o e-mail do convidado"
          />

          <Button type="submit">
            Convidar
            <Plus className="size-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}

export default InviteGuestsModal
