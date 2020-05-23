import React, { useContext } from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { routersNotAuth } from 'config-router'
import { CommonContext } from 'tools'
import Layout from 'pages/layout'

const Components = {}
routersNotAuth.forEach(route => {
  Components[route.component] = React.lazy(() => import(`pages/${route.component}`))
})

const Routers = props => {
  const { history } = props
  const { isAuth } = useContext(CommonContext)

  return (
    <Switch>
      {routersNotAuth.map((route, idx) => (
        <Route
          key={idx}
          exact={route.exact}
          path={route.path}
          render={() => {
            const Component = Components[route.component]
            return (
              <React.Suspense fallback={null}>
                {isAuth ? <Redirect to='/' /> : <Component />}
              </React.Suspense>
            )
          }}
        />
      ))}
      <Route
        path='/'
        render={() => {
          const Component = React.lazy(() => import(`pages/component`))
          return (
            <React.Suspense fallback={null}>
              {isAuth ? (
                <Layout history={history}>
                  <Component history={history}/>
                </Layout>
              ) : (
                <Redirect to={routersNotAuth[0].path} />
              )}
            </React.Suspense>
          )
        }}
      />
      <Route render={() => <>404 Not found...</>} />
    </Switch>
  )
}

const AppRouters = withRouter(Routers)

export { AppRouters}
