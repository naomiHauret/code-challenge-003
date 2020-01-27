import dayjs from "dayjs"

export function formatSimpleTime(timestamp1, timestamp2) {
  const t1 = dayjs(timestamp1)
  const t2 = dayjs(timestamp2)

  return `${t1.format("HH:mm")} - ${t2.format("HH:mm")}`
}

export function formatTime(timestamp) {
  const t = dayjs(timestamp)

  if (isToday(t)) return "Today"
  if (isTomorrow(t)) return "Tomorrow"

  return `${t.format("MMMM DD")}`
}

export function isToday(timestamp) {
  return (
    ["$y", "$D", "$M"].filter((key) => {
      return dayjs()[key] !== dayjs(timestamp)[key]
    }).length === 0
  )
}

export function isTomorrow(timestamp) {
  return (
    ["$y", "$D", "$M"].filter((key) => {
      return dayjs().add(1, "day")[key] !== dayjs(timestamp)[key]
    }).length === 0
  )
}

export function isOverlapping(timeInterval1, timeInterval2) {
  return timeInterval1.startTime < timeInterval2.endTime && timeInterval1.endTime > timeInterval2.startTime
}

export function timeDiffBetween(earlierTimestamp, laterTimestamp) {
  return dayjs(laterTimestamp).diff(dayjs(earlierTimestamp), "minute")
}

export function minutesToTime(minutesNumber) {
  const hours = Math.floor(minutesNumber / 60)
  const minutes = minutesNumber % 60
  return `${hours > 0 ? `${hours} h` : ""}${hours > 0 && minutes > 0 ? ` and ` : ""}${
    minutes > 0 ? `${minutes} min` : ""
  }`
}
