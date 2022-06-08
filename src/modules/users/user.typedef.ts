import { gql } from 'apollo-server-core';

export default gql`
  enum GENDER {
    MALE
    FEMALE
    OTHER
  }

  type UserResult {
    _id: ID
    fullName: String
    phone: String
    age: Int
    gender: String
    totalAmount: Int
  }

  input CreateUserInput {
    fullName: String!
    phone: String!
    age: Int
    gender: GENDER
  }

  input UpdateUserInput {
    fullName: String
    phone: String
    age: Int
    gender: GENDER
  }

  type Query {
    listUsers: [UserResult!]!
    getUser(_id: ID!): UserResult!
  }

  type Mutation {
    createUser(payload: CreateUserInput!): UserResult!
    updateUser(_id: ID!, payload: UpdateUserInput!): UserResult!
  }
`;
