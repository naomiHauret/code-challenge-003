import React from "react"
import { withTheme } from "styled-components"
import styled from "styled-components/native"

const bodyDesignSystem = {
  bg: {
    neutral: "white_200",
    colorful: "blue_300",
  },
}
const Body = styled.ScrollView((props) => ({
  flexGrow: 1,
  paddingHorizontal: props.noSpace ? 0 : props.theme.space[15],
  paddingVertical: props.noSpace ? 0 : props.theme.space[30],
  backgroundColor: props.theme.colors[`${bodyDesignSystem.bg[props.variant]}`],
}))

export default withTheme(Body)
