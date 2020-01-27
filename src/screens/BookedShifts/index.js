import React, { useContext } from "react"
import { ShiftsApiContext } from "contexts/Shifts"
import ListShifts from "components/ListShifts"
import Body from "components/Body"

const BookedShifts = () => {
  const { bookedList } = useContext(ShiftsApiContext)

  return (
    <Body variant="neutral">
      <ListShifts
        showShiftsAmount={true}
        showArea={true}
        emptyStateMessage="No shifts booked for that day"
        list={bookedList}
      />
    </Body>
  )
}

export default BookedShifts
