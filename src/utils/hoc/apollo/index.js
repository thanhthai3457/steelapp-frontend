import React from 'react'
import {
  withApollo as withApo,
  graphql,
  withQuery as withQueryApollo,
  withMutation as withMutationApollo
} from 'react-apollo'
import gqlTag from 'graphql-tag'
import compose from 'lodash-es/flowRight'

/*
  @params object = {
    query: string,
    variables: object,
    options: props => object
  }
*/
const withQuery = (Component = null, flagClient = false) => ({ query, variables, options }, loadingComponent) => {
  try {
    if (Component === null) return null
    if (query === undefined) return withApo(Component)
    const GraphQL = withQueryApollo(
      gqlTag(query),
      {
        ...(!!variables) ? {
          options: { variables, ...options }
        } : { options }
      }
    )
    const HandlerComponent = (props) => {
      const { loading, error } = props?.data
      if (error) {
        console.error('[withQuery]: ', error)
        return loadingComponent || null
      }
      if (loading) return loadingComponent || null
      return <Component {...props} />
    }
    return flagClient ? withApo(GraphQL(HandlerComponent)) : GraphQL(HandlerComponent)
  } catch (e) {
    console.error('[withQuery]: ', e)
    return withApo(Component)
  }
}

/*
  @params object = {
    mutation: string, name: string,
    options: props => object,
    name: string,
    withRef: boolean
  }
*/
const withMutation = (Component = null, flagClient = false) => ({ mutation, options, name, withRef }) => {
  try {
    if (Component === null) return null
    if (mutation === undefined) return withApo(Component)
    const GraphQL = withMutationApollo(
      gqlTag(mutation),
      {
        ...(!!options) ? { options } : {},
        ...(!!name) ? { name } : {},
        ...(!!withRef) ? { withRef } : {}
      }
    )
    const HandlerComponent = (props) => {
      const wrapProps = { ...props }
      wrapProps.mutation = { [name]: wrapProps[name] }
      delete wrapProps[`${name}Result`]
      delete wrapProps[name]
      return <Component {...wrapProps} />
    }
    return flagClient ? withApo(GraphQL(HandlerComponent)) : GraphQL(HandlerComponent)
  } catch (e) {
    console.error('[withMutation]: ', e)
    return withApo(Component)
  }
}

/*
  @params arr = [
    {
      query: string,
      variables: object,
      options: props => object
    },
    {
      mutation: string, name: string,
      options: props => object,
      name: string,
      withRef: boolean
    }
  ]
*/
const withApollo = (Component = null, flagClient = false) => (arr = [], loadingComponent) => {
  try {
    if (Component === null) return null
    if (arr === undefined || arr.length === 0) return withApo(Component)
    const GraphQL = arr.map((gql) => {
      if (!!gql.query) {
        return graphql(
          gqlTag(gql.query),
          {
            ...(!!gql.variables) ? {
              options: { variables: { ...gql.variables }, ...gql.options }
            } : {
              options: gql.options
            }
          }
        )
      }
      return graphql(
        gqlTag(gql.mutation),
        {
          ...(!!gql.options) ? { options: gql.options } : {},
          ...(!!gql.name) ? { name: gql.name } : {},
          ...(!!gql.withRef) ? { withRef: gql.withRef } : {}
        }
      )
    })
    const HandlerComponent = (props) => {
      if (!!props?.data) {
        const { loading, error } = props.data
        if (error) {
          console.error('[withApollo]: ', error)
          return loadingComponent || null
        }
        if (loading) return loadingComponent || null
      }
      const wrapProps = { ...props }
      arr.forEach((gql) => {
        if (!!gql.mutation && !!gql.name) {
          wrapProps.mutation = {
            ...wrapProps.mutation,
            [gql.name]: props[gql.name]
          }
          delete wrapProps[`${gql.name}Result`]
          delete wrapProps[gql.name]
        }
      })
      return <Component {...wrapProps} />
    }
    return flagClient ? compose(...GraphQL, withApo)(HandlerComponent) : compose(...GraphQL)(HandlerComponent)
  } catch (e) {
    console.error('[withApollo]: ', e)
    return withApo(Component)
  }
}

export { withQuery, withMutation, withApollo }
