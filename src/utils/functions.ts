import { format, isBefore, parseISO } from "date-fns"

export function formatTripDate(from: Date | string | undefined, to: Date | string | undefined) {
  if (!from || !to) return undefined
  return format(from, "dd'/'MM") + " até " + format(to, "d'/'MM")
}

export function isBeforeRightNow(createdAt: string) {
  const now = new Date()
  const date = parseISO(createdAt)
  return isBefore(date, now)
}