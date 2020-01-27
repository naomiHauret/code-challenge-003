import React from "react"
import styled from "styled-components/native"
import { space, color, position, typography, flexbox } from "styled-system"
import { withTheme } from "styled-components"

const Text = styled.Text`
  fontfamily: sans-serif;
  fontsize: ${(props) => props.theme.fontSizes[18]} ${space} ${color} ${flexbox} ${typography} ${position};
`

export default withTheme(Text)
