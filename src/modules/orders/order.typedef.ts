import { gql } from 'apollo-server-core';

export default gql`
  type OrderResult {
    _id: ID
    user: String
    code: String
    amount: Float
    interestRate: Float
    accruedAmount: [Int]
  }

  input CreateOrderInput {
    user: String!
    amount: Float!
    interestRate: Float!
  }

  type Query {
    listOrders(user: ID!): [OrderResult!]
    getOrder(_id: ID!): OrderResult!
  }

  type Mutation {
    createOrder(payload: CreateOrderInput!): OrderResult!
  }
`;
