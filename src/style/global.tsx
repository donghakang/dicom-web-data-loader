import React from 'react'
import { css, useTheme, Global } from '@emotion/react'

const GlobalStyles = () => {
  const theme = useTheme()
  return (
    <Global
      styles={css`
        body,
        html {
          margin: 0;
          font-family: 'Poppins', sans-serif;
          background: ${theme.light.background};
          color: ${theme.light.color};
        }

        * {
          font-family: 'Poppins', sans-serif;
          color: ${theme.light.color};
        }
      `}
    />
  )
}

export default GlobalStyles
