import React, { useContext } from "react"
import Body from "components/Body"
import Box from "components/Box"
import Text from "components/Text"
import { ShiftsApiContext } from "contexts/Shifts"

const Home = () => {
  const { bookedList } = useContext(ShiftsApiContext)
  const numberOfShifts = bookedList["Today"].length
  const text = `${numberOfShifts} ${numberOfShifts > 1 ? "shifts" : "shift"}`
  return (
    <Body variant="colorful">
      <Box flexGrow={1} justifyContent="center" alignItems="center">
        <Text fontSize={20} color="white_000">
          Today
        </Text>
        <Text mt={30} fontWeight="bold" fontSize={24} color="white_000">
          {text}
        </Text>
      </Box>
    </Body>
  )
}

export default Home
