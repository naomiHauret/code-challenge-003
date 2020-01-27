import React from "react"
import Box from "components/Box"
import { VanillaButton } from "components/Button"
import Text from "components/Text"

const FiltersBar = (props) => {
  const { filterData, handleChange, active } = props
  return (
    <Box px={30} py={10} borderColor="gray_300" borderBottomWidth={1} flexDirection="row" justifyContent="center">
      {filterData.map((filter, i) => (
        <VanillaButton mr={i < filterData.length - 1 ? 20 : 0} onPress={() => handleChange(filter.city)} key={i}>
          <Text fontSize={18} color={active === filter.city ? "blue_300" : "gray_300"}>
            {filter.city}
            <Text ml={5} fontSize={14}>
              ({filter.count})
            </Text>
          </Text>
        </VanillaButton>
      ))}
    </Box>
  )
}

export default FiltersBar
