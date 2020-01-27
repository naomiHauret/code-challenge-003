import React from "react"
import Box from "components/Box"
import Text from "components/Text"
import Button from "components/Button"

const Shift = (props) => {
  const { area, booked, timestamp, showArea, isOverlapping, canBeCancelled, handleBook, handleCancel } = props

  return (
    <Box flexDirection="row" alignItems="center" justifyContent="space-between">
      <Box>
        {isOverlapping && (
          <Text mb={5} fontSize={12} fontWeight="bold" color="red_300">
            Overlapping !
          </Text>
        )}
        {booked && (
          <Text fontWeight="bold" fontSize={12} color="blue_200" mb={5}>
            Booked
          </Text>
        )}
        <Text fontSize={16} color="blue_100">
          {timestamp}
        </Text>
        {showArea && (
          <Text mt={5} fontSize={14} color="blue_200">
            {area}
          </Text>
        )}
      </Box>

      <Box flexDirection="row" alignItems="center">
        {!booked && (
          <Button variant="success" disabled={isOverlapping} onPress={handleBook}>
            Book
          </Button>
        )}

        {canBeCancelled && (
          <Button variant="danger" onPress={handleCancel}>
            Cancel
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default Shift
