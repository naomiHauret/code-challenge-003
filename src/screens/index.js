import React, { Suspense } from "react"
import { Ionicons } from "@expo/vector-icons"
import { createAppContainer } from "react-navigation"
import { createBottomTabNavigator } from "react-navigation-tabs"
import { ShiftsApiProvider } from "contexts/Shifts"
import { ThemeProvider } from "styled-components"
import AvailableShifts from "./AvailableShifts"
import BookedShifts from "./BookedShifts"
import Home from "./Home"
import Box from "components/Box"
import Text from "components/Text"
import { theme } from "styles"

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => <Ionicons name="md-home" color={tintColor} size={25} />,
      },
    },
    Booked: {
      screen: BookedShifts,
      navigationOptions: {
        tabBarLabel: "Booked",
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-bicycle" color={tintColor} size={25} />,
      },
    },
    Available: {
      screen: AvailableShifts,
      navigationOptions: {
        tabBarLabel: "Available",
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-calendar" color={tintColor} size={25} />,
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: theme.colors["blue_300"],
      labelStyle: {
        fontSize: theme.fontSizes[12],
      },
      style: {
        backgroundColor: theme.colors["white_000"],
      },
    },
  },
)

const AppNavigator = createAppContainer(TabNavigator)
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Suspense
        fallback={
          <Box bg="blue_300" flexGrow={1} alignItems="center" justifyContent="center">
            <Text color="white_000">Loading...</Text>
          </Box>
        }
      >
        <ShiftsApiProvider>
          <AppNavigator />
        </ShiftsApiProvider>
      </Suspense>
    </ThemeProvider>
  )
}

export default App
