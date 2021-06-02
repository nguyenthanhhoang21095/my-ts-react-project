import { gql } from 'apollo-boost'

export const GET_PRODUCTS = gql`
  query Product {
    id
    image
  }
`
