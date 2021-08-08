const { AuthenticationError } = require("apollo-server-express");
const { User, Roadtrip } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
	Query: {
		me: async (parend, args, context) => {
			if (context.user) {
				const userData = await User.findOne({ _id: context.user._id })
					.select("-__v -password")
					.populate(" expenses")
			}
		},
	},

	Mutation: {},
};

module.exports = resolvers;

// Query ( me, user, users, roadtrip, roadtrips )
// Mutation (login, signup, createUser, addUser, removeUser, addRoadtrip, deleteRoadtrip, addExpense, updateExpense, deleteExpense, addImage, deleteImage, addStop, deleteStop)
