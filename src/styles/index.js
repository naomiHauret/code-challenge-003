import { COLORS } from "styles/tokens/colors"
import { FONTSIZES } from "styles/tokens/fontSizes"
import { RADIUS } from "styles/tokens/radius"

const toRem = (value) => `${value / FONTSIZES.base}rem`

const fsizes = {}
Object.keys(FONTSIZES).map((size) => (fsizes[size] = toRem(FONTSIZES[size])))

const rSizes = {}
Object.keys(RADIUS).map((size) => (rSizes[size] = toRem(RADIUS[size])))

const spacings = {}
for (let i = 0; i < 250; i = i + 5) {
  spacings[i] = toRem(i)
}

export const theme = {
  colors: {
    ...COLORS,
  },
  fonts: ["system-ui, sans-serif"],
  fontSizes: {
    ...fsizes,
  },
  radii: {
    ...rSizes,
  },
  space: { ...spacings },
}
