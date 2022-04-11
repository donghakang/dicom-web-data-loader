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

        .button-container {
          min-width: 120px;
          padding: 0.5rem;
          display: flex;
          justify-content: center;
          align-items: center;

          border-radius: 12px;
          background-color: #eaeaea;
          transition: background-color 0.2s ease-in-out;
          transition: color 0.2s ease-in-out;

          &:hover {
            background-color: #2ecc71;
          }

          text-transform: uppercase;
          text-decoration: none;
        }
      `}
    />
  )
}

export default GlobalStyles
