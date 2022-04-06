import '@emotion/react'

declare module '@emotion/react' {
  export interface Theme {
    light: {
      background: string
      color: string
    }
    dark: {
      background: string
      color: string
    }
  }
}
