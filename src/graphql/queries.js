/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getEquation = /* GraphQL */ `
  query GetEquation($id: ID!) {
    getEquation(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const listEquations = /* GraphQL */ `
  query ListEquations(
    $filter: ModelEquationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEquations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
