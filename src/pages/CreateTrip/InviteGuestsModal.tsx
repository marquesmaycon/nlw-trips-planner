import { useFormContext } from "react-hook-form"
import { AtSign, Plus, X } from "lucide-react"

import Button from "../../components/Button"
import { InviteGuestsModalProps } from "../../validation/types"
import { TripSchema } from "../../validation/schemas"

const InviteGuestsModal = ({ setIsGuestModalOpen }: InviteGuestsModalProps) => {
  const { watch, setValue } = useFormContext<TripSchema>()

  const emails = watch("emails_to_invite")

  function addGuestEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const email = new FormData(event.currentTarget).get("email")?.toString()
    if (!email) return
    if (emails.includes(email)) return

    setValue("emails_to_invite", [...emails, email])
    event.currentTarget.reset()
  }

  function removeEmailToInvite(email: string) {
    const newEmails = emails.filter((prevEmail) => prevEmail !== email)
    setValue("emails_to_invite", newEmails)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[640px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Selecionar convidados</h2>
            <button type="button" onClick={() => setIsGuestModalOpen(false)}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-small text-zinc-400">Os convidados irão receber e-mails para confirmar a participação na viagem.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {emails.map((email) => (
            <div key={email} className="flex items-center gap-2 rounded-md bg-zinc-800 px-2.5 py-1.5">
              <span className="text-zinc-300">{email}</span>
              <button type="button" onClick={() => removeEmailToInvite(email)}>
                <X className="size-4 text-zinc-400" />
              </button>
            </div>
          ))}
        </div>

        <div className="h-px w-full bg-zinc-800" />

        <form onSubmit={addGuestEmail} className="flex items-center gap-2.5 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5">
          <AtSign className="size-5 text-zinc-400" />

          <input type="email" name="email" className="flex-1 bg-transparent outline-none" placeholder="Digite o e-mail do convidado" />

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
