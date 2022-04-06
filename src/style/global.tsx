import React from 'react'
import { css, useTheme, Global } from '@emotion/react'

const global = css`
  body,
  html {
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }
`

const GlobalStyles = () => {
  const theme = useTheme()
  console.log(theme.dark.background)
  return (
    <Global
      styles={css`
        body,
        html {
          margin: 0;
          font-family: 'Poppins', sans-serif;
          background: ${theme.dark.background};
          color: ${theme.dark.color};
        }
      `}
    />
  )
}

export default GlobalStyles
