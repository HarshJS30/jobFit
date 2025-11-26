"use client"

import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"
import { SessionProvider } from "next-auth/react"

// Create a custom system with NO global styles
const system = createSystem(defaultConfig, {
  globalCss: {}, // Empty global CSS
  preflight: false, // Disable CSS reset
})

export function Provider(props: ColorModeProviderProps) {
  return (
    <SessionProvider>
      <ChakraProvider value={system}>
        <ColorModeProvider {...props} />
      </ChakraProvider>
    </SessionProvider>
  )
}