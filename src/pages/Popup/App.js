import React from 'react'
import { ThemeProvider } from '@xstyled/styled-components'
import { GlobalStyle } from '../../components/GlobalStyle'
import { theme } from '../../components/Theme'
import { MainPopup } from '../../containers/MainPopup'

export const App = () => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <MainPopup />
      </ThemeProvider>
    </>
  )
}
