const {gql} = require('apollo-server');

const typeDefs = gql`
    type Book {
        title: String
        author: String
    }

    type ValidationError {
        field: String
        message: String
    }

    type TimeoutError {
        reason: String
        seconds: Int
    }

    union Error = ValidationError | TimeoutError

    type Mutation {
        register: Error
    }

    type Query {
        books: [Book]
    }
`;

module.exports = typeDefs;
