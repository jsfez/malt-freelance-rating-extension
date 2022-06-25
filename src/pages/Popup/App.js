import React from 'react'
import { ThemeProvider } from '@xstyled/styled-components'
import { GlobalStyle } from '../../components/GlobalStyle'
import { theme } from '../../components/Theme'
import { MainPopup } from '../../containers/MainPopup'

const Popup = () => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <MainPopup />
      </ThemeProvider>
    </>
  )
}

export default Popup
