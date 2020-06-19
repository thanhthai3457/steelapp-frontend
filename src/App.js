import { hot } from 'react-hot-loader'
import React from 'react'
import 'antd/dist/antd.css'

import 'react-notifications/lib/notifications.css'

import 'bootstrap/dist/css/bootstrap.min.css'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

import { AppProvider } from 'utils'
import { AppRouters } from 'pages'
import './app.scss'

const App = () => (
  <AppProvider>
    <AppRouters />
  </AppProvider>
)

export default hot(module)(App)
