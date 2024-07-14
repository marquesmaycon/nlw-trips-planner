import { format } from "date-fns"

export function formatTripDate(from: Date | string | undefined, to: Date | string | undefined) {
  if (!from || !to) return undefined
  return format(from, "dd'/'MM") + " até " + format(to, "d'/'MM")
}