import React, { useContext } from "react"
import styled from "styled-components/native"
import { ThemeContext } from "styled-components"
import Text from "components/Text"
import { space, color, layout, flexbox, border, position } from "styled-system"

const buttonDesignSystem = {
  border: {
    success: "green_300",
    danger: "red_300",
  },
  text: {
    success: "green_300",
    danger: "red_300",
  },
}
export const VanillaButton = styled.TouchableOpacity`
  ${space}
  ${color}
  ${layout}
  ${flexbox}
  ${border}
  ${position}
`

const Button = (props) => {
  const { children, variant } = props
  const theme = useContext(ThemeContext)
  const buttonProps = {}

  Object.keys(props)
    .filter((prop) => ["children", "variant"].includes(prop) === false)
    .map((p) => (buttonProps[p] = props[p]))

  return (
    <VanillaButton
      bg={theme.colors["white_000"]}
      borderStyle="solid"
      borderColor={`${theme.colors[buttonDesignSystem.border[variant]]}`}
      borderWidth={1}
      borderRadius={4}
      py={10}
      px={20}
      display="flex"
      alignItems="center"
      justifyContent="center"
      opacity={props.disabled ? 0.25 : 1}
      {...buttonProps}
    >
      <Text fontSize={15} color={`${theme.colors[buttonDesignSystem.text[variant]]}`} fontWeight="bold">
        {children}
      </Text>
    </VanillaButton>
  )
}

export default Button
