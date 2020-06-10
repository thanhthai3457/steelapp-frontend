import { hot } from 'react-hot-loader'
import React from 'react'
import 'antd/dist/antd.css'
import 'react-notifications/lib/notifications.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { AppProvider } from 'utils'
import { AppRouters } from 'pages'

const App = () => (
  <AppProvider>
    <AppRouters />
  </AppProvider>
)

export default hot(module)(App)
