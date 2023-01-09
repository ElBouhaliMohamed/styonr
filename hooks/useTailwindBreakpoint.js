import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../tailwind.config.js'

const findKeyByValue = (object, value) =>
  Object.keys(object).find((key) => object[key] === value)

export const getDeviceConfig = (width) => {
  const fullConfig = resolveConfig(tailwindConfig)
  const { screens } = fullConfig.theme

  const bpSizes = Object.keys(screens).map((screenSize) =>
    parseInt(screens[screenSize])
  )

  const bpShapes = bpSizes.map((size, index) => ({
    min: !index ? 0 : bpSizes[index - 1],
    max: size,
    key: findKeyByValue(screens, `${size}px`),
  }))

  let breakpoint = null

  bpShapes.forEach((shape) => {
    if (!shape.min && width < shape.max) {
      breakpoint = shape.key
    } else if (width >= shape.min && width < shape.max) {
      breakpoint = shape.key
    } else if (!shape.max && width >= shape.max) {
      breakpoint = shape.key
    }
  })

  return breakpoint
}