import React, { createContext } from "react"
import { View } from "react-native"
import { useShifts, useBookShift, useCancelShift } from "hooks/useShiftsApi"
import { formatTime, isOverlapping } from "utils/datetime"
export const ShiftsApiContext = createContext({})

export const ShiftsApiProvider = ({ children }) => {
  const { data, error } = useShifts()
  if (data) {
    const bookedShifts = Object.keys(data).filter((id) => data[id].booked === true)
    const bookedList = {}
    const overlappingList = [] // id of overlapping shifts
    const availableShiftsList = {} // list of available shift

    // we get areas and possible dates to build available shifts list
    const areas = [...new Set(Object.keys(data).map((id) => data[id].area))] // unique set of areas
    const possibleDates = [...new Set(Object.keys(data).map((id) => formatTime(data[id].startTime)))] // unique set of formatted dates ("Today", "Tomorrow", and other dates like "January 25")

    areas.map((area) => {
      availableShiftsList[area] = {}
      possibleDates.map((date) => {
        availableShiftsList[area][date] = [] // initializing available shifts list
      })
    })

    possibleDates.map((date) => {
      bookedList[date] = [] // initializing booked shifts list
    })

    Object.keys(data).map((id) => {
      const shift = data[id]

      // building available shifts list
      if (Date.now() < shift.startTime)
        availableShiftsList[shift.area][formatTime(shift.startTime)] = [
          ...availableShiftsList[shift.area][formatTime(shift.startTime)],
          id,
        ]

      bookedShifts.map((bid) => {
        // Building booked shifts list
        if (bid === id) bookedList[formatTime(shift.startTime)] = [...bookedList[formatTime(shift.startTime)], bid]
        // Building our list of overlapping shifts
        const timestamp1 = {
          startTime: shift.startTime,
          endTime: shift.endTime,
        }
        const timestamp2 = {
          startTime: data[bid].startTime,
          endTime: data[bid].endTime,
        }
        if (isOverlapping(timestamp1, timestamp2) && !overlappingList.includes(id) && !bookedShifts.includes(id))
          overlappingList.push(id)
      })
    })
    return (
      <ShiftsApiContext.Provider
        value={{ data, areas, bookedList, overlappingList, availableShiftsList, error, useBookShift, useCancelShift }}
      >
        {children}
      </ShiftsApiContext.Provider>
    )
  }

  return <View />
}
