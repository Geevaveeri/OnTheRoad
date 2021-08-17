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
		start: String
		destination: String
		playlist: String
		images: [Image]
		expenses: [Expense]
		stops: [Stop]
		users: [User]
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
		user(username: String!): User
		users: [User]
		roadtrip(_id: ID!): Roadtrip
		roadtrips: [Roadtrip]
	}
	type Auth {
		token: ID!
		user: User
	}
	type Mutation {
		login(email: String!, password: String!): Auth
		createUser(username: String!, email: String!, password: String!): Auth
		addUser(username: String!, _id: ID!): User
		removeUser(userId: String!, _id: ID!): Roadtrip
		addRoadtrip(name: String!): Roadtrip
		deleteRoadtrip(_id: ID!): Roadtrip
		addExpense(
			category: String!
			cost: Int!
			comment: String
			_id: ID!
		): Roadtrip
		updateExpense(
			category: String
			cost: Int
			comment: String
			_id: ID!
			expenseId: ID!
		): Roadtrip
		deleteExpense(_id: ID!, expenseId: ID!): Roadtrip
		addImage(url: String!, alt: String!, _id: ID!): Roadtrip
		deleteImage(_id: ID!, imageId: ID!): Roadtrip
		addStop(lat: String!, lon: String!, _id: ID!): Roadtrip
		deleteStop(_id: ID!, stopId: ID!): Roadtrip
		addPlaylist(playlist: String!, roadtripId: ID!): Roadtrip
		deletePlaylist(_id: ID!): Roadtrip
	}
`;

// Expense / Image / Roadtrip / Stop / User /  Me / Auth /
// Query ( me, user, users, roadtrip, roadtrips )
// Mutation (login, createUser, addUser, removeUser, addRoadtrip, deleteRoadtrip, addExpense, updateExpense, deleteExpense, addImage, deleteImage, addStop, deleteStop)

module.exports = typeDefs;
