import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react"
import { useState } from "react"
import { DateRange, DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"
import Button from "../../../components/Button"
import { DestinationAndDateStepProps } from "../../../validation/types"
import { formatTripDate } from "../../../utils/functions"
import { useFormContext } from "react-hook-form"
import { TripForm } from "../../../validation/schemas"

const DestinationAndDateStep = ({
  isGuestInputOpen,
  setIsGuestInputOpen,
}: DestinationAndDateStepProps) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  const { register, watch, setValue } = useFormContext<TripForm>()

  const [from, to] = watch(["startsAt", "endsAt", "destination"])

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
    <div className="h-16 p-4 bg-zinc-900 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="text-zinc-400 size-5" />
        <input
          disabled={isGuestInputOpen}
          placeholder="Para onde você vai?"
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          {...register('destination')}
        />
      </div>

      <button
        disabled={isGuestInputOpen}
        onClick={() => setIsDatePickerOpen(true)}
        className="flex items-center gap-2 text-left text-zinc-400">
        <Calendar className=" size-5" />
        <span className="text-lg w-40">{formattedDate}</span>
      </button>

      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Selecione a data</h2>
                <button
                  type="button"
                  onClick={() => setIsDatePickerOpen(false)}>
                  <X className="text-zinc-400 size-5" />
                </button>
              </div>
            </div>

            <DayPicker mode="range" selected={date} onSelect={onSelectDate} />

            <Button
              variant="secondary"
              size="full"
              onClick={() => setIsDatePickerOpen(false)}>
              Confirmar <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      )}

      <div className="w-px h-6 bg-zinc-800" />

      {isGuestInputOpen ? (
        <Button onClick={() => setIsGuestInputOpen(false)} variant="secondary">
          Alterar local e data <Settings2 className="size-5" />
        </Button>
      ) : (
        <Button onClick={() => setIsGuestInputOpen(true)}>
          Continuar <ArrowRight className="size-5" />
        </Button>
      )}
    </div>
  )
}

export default DestinationAndDateStep
