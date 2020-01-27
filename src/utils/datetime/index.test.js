import dayjs from "dayjs"
import { isToday, isTomorrow, minutesToTime, timeDiffBetween, isOverlapping } from "./"

test("Is timestamp today", () => {
  expect(isToday(dayjs(new Date()))).toBe(true)
})

test("Is timestamp today", () => {
  expect(isToday(dayjs(new Date("December 17, 1995 03:24:00")))).toBe(false)
})

test("Is timestamp tomorrow", () => {
  expect(isTomorrow(dayjs(Date.now()).add(1, "day"))).toBe(true)
})

test("Is timestamp tomorrow", () => {
  expect(isTomorrow(dayjs(new Date("December 17, 1995 03:24:00")))).toBe(false)
})

test("Difference between 2 timestamps is calculated", () => {
  expect(timeDiffBetween(1579950000000, 1579957200000)).toBe(120) // January 23rd 12h - January 23rd 14h
})

test("Timestamps overlap", () => {
  const timestamp1 = {
    startTime: 1580115600000, // 10h
    endTime: 1580131800000, // 14h30
  }

  const timestamp2 = {
    startTime: 1580130000000, // 14h
    endTime: 1580139000000, // 16h30
  }
  expect(isOverlapping(timestamp1, timestamp2)).toBe(true)
})

test("Timestamps don't overlap", () => {
  const timestamp1 = {
    startTime: 1580198400000, // 9h
    endTime: 1580205600000, // 11h
  }

  const timestamp2 = {
    startTime: 1580209200000, // 12h
    endTime: 1580220000000, // 15h
  }
  expect(isOverlapping(timestamp1, timestamp2)).toBe(false)
})

test('Minutes are converted to "{hours} and {minutes} min" format', () => {
  expect(minutesToTime(125)).toBe("2 h and 5 min")
})

test("Converted amount of minutes is clean (0 hour not printed)", () => {
  expect(minutesToTime(20)).toBe("20 min")
})

test("Converted amount of minutes is clean (0 minute not printed)", () => {
  expect(minutesToTime(120)).toBe("2 h")
})
