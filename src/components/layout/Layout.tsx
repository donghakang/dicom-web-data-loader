import { css } from '@emotion/react'
import React from 'react'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
      `}
    >
      <div
        css={css`
          margin: auto;
          max-width: 768px;
        `}
      >
        {children}
      </div>
    </div>
  )
}

export default Layout
