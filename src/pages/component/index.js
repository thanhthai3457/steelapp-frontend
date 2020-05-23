import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { routersAuth } from 'config-router'

const Components = {}
routersAuth.forEach(route => {
  Components[route.component] = React.lazy(() => import(`pages/${route.component}`))
})

const App = props => {
  return (
    <React.Suspense fallback={null}>
      <Switch>
        {routersAuth.map((route, idx) => (
          <Route
            key={idx}
            exact={route.exact}
            path={route.path}
            render={() => {
              const Component = Components[route.component]
              return <Component {...props} route={route} />
            }}
          />
        ))}
        <Redirect to='/home' />
      </Switch>
    </React.Suspense>
  )
}

export default App
