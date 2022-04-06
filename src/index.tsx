import { Global, ThemeProvider } from '@emotion/react'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import GlobalStyles from './style/global'
import theme from './style/theme'
import * as Styled from './style/mode'
import FileProvider from './context/file'
import InformationProvider from './context/information'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <FileProvider>
      <InformationProvider>
        <App />
      </InformationProvider>
    </FileProvider>
  </ThemeProvider>,
  document.getElementById('root')
)
