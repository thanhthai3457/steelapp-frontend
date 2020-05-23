import { onError } from 'apollo-link-error'

const errorMiddleware = onError(({
  graphQLErrors,
  networkError,
  response
}) => {
  if (graphQLErrors) {
    if (response) {
      // eslint-disable-next-line prefer-destructuring
      response.errors = graphQLErrors[0]
    }
    // console.log(graphQLErrors)
    // if (graphQLErrors[0].code === 'UNAUTHENTICATED') {
    //   localStorage.clear()
    //   window.location.href = process.env.APP_SERVICE ? `/${process.env.APP_SERVICE}/login` : '/login'
    // }
  }
  if (networkError) {
    console.error(`[Network Error]: ${networkError}`)
  }
})

export { errorMiddleware }
