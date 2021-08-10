const { gql } = require("apollo-server-express");

const typeDefs = gql`
	type Expense {
		_id: ID
		category: String
		cost: Int
		comment: String
		username: String
	}
	type Image {
		_id: ID
		username: String
		url: String
		alt: String
	}
	type Roadtrip {
		_id: ID
		name: String
		destination: String
		playlist: String
		images: [Image]
		expenses: [Expense]
		stops: [Stop]
		user: [User]
	}
	type Stop {
		_id: ID
		lat: String
		lon: String
		name: String
		address: String
	}
	type User {
		_id: ID
		username: String
		email: String
		roadtrips: [Roadtrip]
		expenses: [Expense]
	}
	type Query {
		me: User
		user: User
		users: User
		roadtrip: Roadtrip
		roadtrips: Roadtrip
	}
	type Auth {
		token: ID!
		user: User
	}
	type Mutation {
		login(email: String!, password: String!): Auth
		createUser(username: String!, email: String!, password: String!): Auth
		addUser(username: String!): User
		removeUser(username: String!): User
		AddRoadTrip(name: String!): Roadtrip
		deleteRoadTrip(_id: ID!): Roadtrip
		addExpense(
			category: String!
			cost: Int!
			comment: String
			username: String!
		): Roadtrip
		updateExpense(category: String, cost: Int, comment: String): Roadtrip
		deleteExpense(_id: ID!): Roadtrip
		addImage(url: String!, alt: String!): Roadtrip
		deleteImage(_id: ID!): Roadtrip
		addStop(lat: String!, lon: String!): Roadtrip
		deleteStop(_id: ID!): Roadtrip
	}
`;

// Expense / Image / Roadtrip / Stop / User /  Me / Auth /
// Query ( me, user, users, roadtrip, roadtrips )
// Mutation (login, createUser, addUser, removeUser, addRoadtrip, deleteRoadtrip, addExpense, updateExpense, deleteExpense, addImage, deleteImage, addStop, deleteStop)

module.exports = typeDefs;
