const { AuthenticationError } = require("apollo-server-express");
const { User, Roadtrip } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
	Query: {
		me: async (parent, args, context) => {
			if (context.user) {
				const userData = await User.findOne({ _id: context.user._id })
					.select("-__v -password")
					.populate("roadtrips")
					.populate(" expenses");

				return userData;
			}
			throw new AuthenticationError("Not Logged In");
		},
		user: async (parent, { username }, context) => {
			if (context.user) {
				const userData = await User.findOne({ username })
					.select("-__v -password")
					.populate("roadtrips")
					.populate(" expenses");

				return userData;
			}
		},
		users: async (parent, args, context) => {
			if (context.user) {
				const userdata = await User.find()
					.select("-__v -password")
					.populate("roadtrips")
					.populate(" expenses");

				return userdata;
			}
		},
		roadtrip: async (parant, { _id }, context) => {
			if (context.user) {
				const roadtripData = await Roadtrip.findOne({ _id })
					.select("-__v")
					.populate("images")
					.populate("expenses")
					.populate("stops")
					.populate("users");

				return roadtripData;
			}
		},
		roadtrips: async (parent, args, context) => {
			if (context.user) {
				const roadtripData = await Roadtrip.find()
					.select("-__v")
					.populate("images")
					.populate("expenses")
					.populate("stops")
					.populate("users");

				return roadtripData;
			}
		},
	},

	Mutation: {
		createUser: async (parent, args) => {
			console.log("hit");
			const user = await User.create(args);
			const token = signToken(user);
			return { token, user };
		},
		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });

			if (!user) {
				throw new AuthenticationError("Incorrect Credentials");
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw new AuthenticationError("Incorrect crendentials");
			}

			const token = signToken(user);
			return { token, user };
		},
		addUser: async (parent, { username, _id }, context) => {
			if (context.user) {
				const user = await User.findOneAndUpdate(
					{ username },
					{ $addToSet: { roadtrips: _id } },
					{ new: true }
				);

				const updatedRoadtrip = await Roadtrip.findOneAndUpdate(
					{ _id: _id },
					{ $push: { users: user } },
					{ new: true }
				)
					.select("-__v")
					.populate("images")
					.populate("expenses")
					.populate("stops")
					.populate("users");

				return updatedRoadtrip;
			}

			throw new AuthenticationError("You need to be logged in!");
		},
		removeUser: async (parent, { userId, _id }, context) => {
			if (context.user) {
				const updatedRoadtrip = await Roadtrip.findOneAndUpdate(
					{ _id: _id },
					{ $pull: { users: userId } },
					{ new: true }
				)
					.select("-__v")
					.populate("images")
					.populate("expenses")
					.populate("stops")
					.populate("users");

				return updatedRoadtrip;
			}

			throw new AuthenticationError("You need to be logged in!");
		},
		addRoadtrip: async (parent, args, context) => {
			if (context.user) {
				const updatedRoadTrip = await Roadtrip.create({
					...args,
					users: context.user._id,
				});

				await User.findOneAndUpdate(
					{ _id: context.user._id },
					{ $push: { roadtrips: roadTrip._id } },
					{ new: true }
				);

				return updatedRoadTrip;
			}
			throw new AuthenticationError("You need to be logged in!");
		},
		deleteRoadtrip: async (parent, { _id }, context) => {
			if (context.user) {
				const updatedRoadTrip = await Roadtrip.deleteOne({ _id });

				return updatedRoadTrip;
			}
		},
	},
};

module.exports = resolvers;

// Query ( *me, *user, *users, *roadtrip, *roadtrips )
// Mutation (*login, signup, *createUser, *addUser,*removeUser, *addRoadtrip, *deleteRoadtrip, addExpense, updateExpense, deleteExpense, addImage, deleteImage, addStop, deleteStop)
