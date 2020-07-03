import React from 'react'

import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'

import Main from './Main'

const App = () => {

  return (
    <div>
      <CssBaseline />
      <ThemeProvider theme={theme}>
          <Main />
      </ThemeProvider>
    </div>
  )
}

export default App
