import gql from 'graphql-tag'

const GET_STORES = gql`
  {
    getStores {
      _id
      code
      name
      mobile
      address
    }
  }
`

export { GET_STORES }