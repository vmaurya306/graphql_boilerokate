export const root = `
  # Query Definitions
  type Query {
    getUsers: UserConnection 
  }
  
  # Mutation Definitions  
  type Mutation {
   createUser(input: CreateUserInput!): User
  }

  # Scalar Definitions
  scalar DateTime
  scalar JSON
  scalar Upload
`;
