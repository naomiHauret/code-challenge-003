import React, { useContext, Fragment } from "react"
import Box from "components/Box"
import Text from "components/Text"
import { SectionList, SafeAreaView } from "react-native"
import { ShiftsApiContext } from "contexts/Shifts"
import { formatSimpleTime, timeDiffBetween, minutesToTime } from "utils/datetime"
import Shift from "components/Shift"
import { space, color, border } from "styled-system"
import styled from "styled-components/native"
import { withTheme } from "styled-components"
const StyledList = withTheme(styled.SectionList`
  ${space}
  ${color}
  ${border}
`)
const ListShifts = (props) => {
  const { list, showArea, emptyStateMessage, showShiftsAmount } = props
  const { data, overlappingList, useBookShift, useCancelShift } = useContext(ShiftsApiContext)

  return (
    <SafeAreaView>
      <StyledList
        borderRadius={4}
        borderColor="gray_300"
        borderWidth={1}
        borderBottomWidth={0}
        bg="white_300"
        mb={40}
        sections={Object.keys(list).map((timestamp) => ({
          title: timestamp,
          data: list[timestamp],
        }))}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }, index) => {
          return (
            <Box p={10} borderColor="gray_300" borderBottomWidth={1}>
              <Shift
                area={data[item].area}
                booked={data[item].booked}
                timestamp={formatSimpleTime(data[item].startTime, data[item].endTime)}
                showArea={showArea}
                isOverlapping={overlappingList.includes(item)}
                canBeCancelled={data[item].startTime > Date.now() && data[item].booked}
                handleBook={() => {
                  useBookShift(data, item)
                }}
                handleCancel={() => {
                  useCancelShift(data, item)
                }}
              />
            </Box>
          )
        }}
        renderSectionHeader={({ section: { title } }, index) => {
          const numberOfShifts = list[title].length
          let cumulatedMinutes
          if (showShiftsAmount && numberOfShifts > 0) {
            cumulatedMinutes = list[title]
              .map((id) => timeDiffBetween(data[id].startTime, data[id].endTime))
              .reduce((total, hours) => total + hours)
          }
          return (
            <Fragment>
              <Box
                borderColor="gray_300"
                borderBottomWidth={1}
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                bg="gray_100"
                p={10}
              >
                <Text color="blue_100">{title}</Text>
                {showShiftsAmount && numberOfShifts > 0 && (
                  <Text color="blue_100" fontSize={14}>
                    {numberOfShifts} {numberOfShifts > 1 ? "shifts" : "shift"}, {minutesToTime(cumulatedMinutes)}
                  </Text>
                )}
              </Box>
              {numberOfShifts === 0 && (
                <Box borderColor="gray_300" borderBottomWidth={1} py={20}>
                  <Text textAlign="center" fontStyle="italic" color="blue_100">
                    {emptyStateMessage}
                  </Text>
                </Box>
              )}
            </Fragment>
          )
        }}
      />
    </SafeAreaView>
  )
}

export default ListShifts
