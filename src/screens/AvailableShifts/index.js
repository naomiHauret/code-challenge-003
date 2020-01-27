import React, { useContext, useState } from "react"
import { ShiftsApiContext } from "contexts/Shifts"
import Body from "components/Body"
import Box from "components/Box"
import ListShifts from "components/ListShifts"
import FiltersBar from "components/FiltersBar"

const AvailabeShifts = () => {
  const { availableShiftsList, areas } = useContext(ShiftsApiContext)
  const [currentAreaFilter, setAreaFilter] = useState(areas[0])
  const filterData = areas.map((area) => {
    const count = Object.keys(availableShiftsList[area])
      .map((timestamp) => availableShiftsList[area][timestamp].length)
      .reduce((total, shifts) => {
        return total + shifts
      })
    return {
      city: area,
      count,
    }
  })
  return (
    <Body variant="neutral" noSpace={true}>
      <FiltersBar filterData={filterData} handleChange={setAreaFilter} active={currentAreaFilter} />
      <Box px={15} mt={30}>
        <ListShifts
          showShiftsAmount={false}
          showArea={false}
          emptyStateMessage="No shifts available"
          list={availableShiftsList[currentAreaFilter]}
        />
      </Box>
    </Body>
  )
}

export default AvailabeShifts
