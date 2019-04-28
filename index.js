const {ApolloServer, gql} = require('apollo-server');
const {books} = require('./static/data');

const typeDefs = gql`
    # apollo-server snippet code
    type Book {
        title: String
        author: String
    }

    # define initial type definition
    type ValidationError {
        field: String
        message: String
    }

    type TimeoutError {
        reason: String
        seconds: Int
    }

    # use word union to create union object and return type definition. Pipe symbol means OR logical
    union Error = ValidationError | TimeoutError

    # create mutation
    type Mutation {
        register: Error
    }

    type Query {
        books: [Book]
    }
`;

let showTimeoutError = false;

const resolvers = {
		// define a union in resolver
		Error: {
				// a union requires a __resvolveType and returns an obj
				__resolveType: (obj) => {
						if (obj.field) { // an obj has prop field
								return 'ValidationError'
						}
						
						if (obj.reason) { // an obj has prop reason
								return 'TimeoutError'
						}
						
						return null
				}
		},
		
		Query: {
				books: () => books,
		},
		
		Mutation: {
				register: () => {
						let error = {};
						
						if (showTimeoutError) {
								error = {reason: 'too many requests', seconds: 180}
						} else {
								error = {field: 'email', message: 'already taken'}
						}
						
						showTimeoutError = !showTimeoutError;
						
						return error
				}
		}
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => {
		console.log(`🚀  Server ready at ${url}`);
});
