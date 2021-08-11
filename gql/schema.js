const {gql} = require("apollo-server");

const typeDefs = gql`
	type User{
		id: ID
		name: String
		userame: String
		email: String
		siteWeb: String
		description: String
		password: String
		avatar: String
		createAt: String
	}
	type Query{
		# User
		getUser: User
	}
`;

module.exports = typeDefs;