import { useState } from "react"
import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react"
import { useFormContext } from "react-hook-form"
import { DateRange, DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"

import Button from "../../../components/Button"
import { DestinationAndDateStepProps } from "../../../validation/types"
import { formatTripDate } from "../../../utils/functions"
import { TripSchema } from "../../../validation/schemas"

const DestinationAndDateStep = ({ isGuestInputOpen, setIsGuestInputOpen }: DestinationAndDateStepProps) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  const { register, watch, setValue } = useFormContext<TripSchema>()

  const [from, to] = watch(["startsAt", "endsAt"])

  const date = {
    from: from ? new Date(from) : undefined,
    to: to ? new Date(to) : undefined,
  }

  const formattedDate = formatTripDate(from, to) || "Quando"

  function onSelectDate(dateRange: DateRange | undefined) {
    if (dateRange?.from) setValue("startsAt", dateRange?.from?.toString())
    if (dateRange?.to) setValue("endsAt", dateRange?.to.toString())
  }

  return (
    <div className="flex h-16 items-center gap-3 rounded-xl bg-zinc-900 p-4 shadow-shape">
      <div className="flex flex-1 items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <input
          disabled={isGuestInputOpen}
          placeholder="Para onde você vai?"
          className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
          {...register("destination")}
        />
      </div>

      <button type="button" disabled={isGuestInputOpen} onClick={() => setIsDatePickerOpen(true)} className="flex items-center gap-2 text-left text-zinc-400">
        <Calendar className="size-5" />
        <span className="w-40 text-lg">{formattedDate}</span>
      </button>

      {isDatePickerOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60">
          <div className="space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecione a data</h2>
                <button type="button" onClick={() => setIsDatePickerOpen(false)}>
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
            </div>

            <DayPicker mode="range" selected={date} onSelect={onSelectDate} />

            <Button type="button" variant="secondary" size="full" onClick={() => setIsDatePickerOpen(false)}>
              Confirmar <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      )}

      <div className="h-6 w-px bg-zinc-800" />

      {isGuestInputOpen ? (
        <Button type="button" onClick={() => setIsGuestInputOpen(false)} variant="secondary">
          Alterar local e data <Settings2 className="size-5" />
        </Button>
      ) : (
        <Button type="button" onClick={() => setIsGuestInputOpen(true)}>
          Continuar <ArrowRight className="size-5" />
        </Button>
      )}
    </div>
  )
}

export default DestinationAndDateStep
