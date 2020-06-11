import React, { useReducer, useRef } from 'react'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'

import { Client, CommonContext } from 'tools'

const commonReducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        isAuth: action.payload
      }
    case 'logout':
      return {
        ...state,
        isAuth: action.payload
      }
    case 'changeStore':
      return {
        ...state,
        sourceStore: action.payload
      }
    case 'changeProfile':
      return {
        ...state,
        currentProfile: action.payload
      }
    default:
      return state
  }
}

const AppProvider = ({ children }) => {
  const [commonState, dispatch] = useReducer(commonReducer, {
    isAuth: !!localStorage.getItem('authorization'),
    sourceStore: {},
    currentProfile: {}
  })

  const refSave = useRef({})

  const setRef = (name, value) => {
    refSave.current[name] = value
  }
  const getRef = (name) => refSave.current[name]

  return (
    <CookiesProvider>
        <ApolloProvider client={Client}>
          <CommonContext.Provider
            value={{
              ...commonState,
              dispatch,
              setRef,
              getRef
            }}
          >
            <BrowserRouter basename='steelApp'>
              {children}
            </BrowserRouter>
          </CommonContext.Provider>
        </ApolloProvider>
    </CookiesProvider>
  )
}

export { AppProvider }
