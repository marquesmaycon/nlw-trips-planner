import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, Pin, X } from "lucide-react"
import { DateRange, DayPicker } from "react-day-picker"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"

import Button from "../../../components/Button"
import { useEditTrip } from "../../../hooks/queryAndMutations"
import { queryClient } from "../../../lib/tanStackQuery"
import { editTripSchema, EditTripSchema } from "../../../validation/schemas"
import { DestinationAndDateModalProps, Trip } from "../../../validation/types"

const DestinationAndDateModal = ({ setIsDestinationDateModalOpen }: DestinationAndDateModalProps) => {
  const { tripId } = useParams()
  const currTrip = queryClient.getQueryData<Trip>(["trip", tripId])

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EditTripSchema>({
    resolver: zodResolver(editTripSchema),
    defaultValues: currTrip,
  })

  const { mutateAsync: editTrip, isPending } = useEditTrip(tripId!)

  const [from, to] = watch(["startsAt", "endsAt"])

  const date = {
    from: from ? new Date(from) : undefined,
    to: to ? new Date(to) : undefined,
  }

  const onSelectDate = (dateRange: DateRange | undefined) => {
    if (dateRange?.from) setValue("startsAt", dateRange?.from.toString())
    if (dateRange?.to) setValue("endsAt", dateRange?.to.toString())
  }

  async function onSubmit(data: EditTripSchema) {
    await editTrip(data)
    setIsDestinationDateModalOpen(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Selecione o local data</h2>
            <button type="button" onClick={() => setIsDestinationDateModalOpen(false)}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
        </div>

        <div className="flex h-14 items-center gap-2.5 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5">
          <Pin className="size-5 text-zinc-400" />
          <input className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none" placeholder="Local" {...register("destination")} />
        </div>

        <DayPicker mode="range" selected={date} onSelect={onSelectDate} />

        <Button variant="secondary" size="full" type="submit" isLoading={isPending}>
          Confirmar <ArrowRight className="size-5" />
        </Button>

        <div>
          {Object.entries(errors).map(([field, error]) => (
            <p key={field} className="text-xs text-red-400">
              {error?.message}
            </p>
          ))}
        </div>
      </div>
    </form>
  )
}

export default DestinationAndDateModal
