import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from 'app/store'
import { ThemeProvider, CSSReset, Box } from '@chakra-ui/core'

const render = () => {
  const App = require('./app').default

  ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider>
        <CSSReset />
        <Box>
          <App />
        </Box>
      </ThemeProvider>
    </Provider>,
    document.getElementById('root')
  )
}

render()

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./app', render)
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<Root />, rootElement);
