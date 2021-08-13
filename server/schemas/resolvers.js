const mongoose = require("mongoose");
const { AuthenticationError } = require("apollo-server-express");
const { User, Roadtrip, Image } = require("../models");
const { signToken } = require("../utils/auth");
const cloudinary = require("cloudinary").v2;

const resolvers = {
	Query: {
		me: async (parent, args, context) => {
			if (context.user) {
				const userData = await User.findOne({ _id: context.user._id })
					.select("-__v -password")
					.populate("roadtrips")
					.populate("expenses");

				return userData;
			}
			throw new AuthenticationError("Not Logged In");
		},
		user: async (parent, { username }, context) => {
			if (context.user) {
				const userData = await User.findOne({ username })
					.select("-__v -password")
					.populate("roadtrips")
					.populate("expenses");

				return userData;
			}
		},
		users: async (parent, args, context) => {
			if (context.user) {
				const userdata = await User.find()
					.select("-__v -password")
					.populate("roadtrips")
					.populate("expenses");

				return userdata;
			}
		},
		roadtrip: async (parent, { _id }, context) => {
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
				const updatedRoadtrip = await Roadtrip.create({
					...args,
					users: context.user._id,
				});

				await User.findOneAndUpdate(
					{ _id: context.user._id },
					{ $push: { roadtrips: updatedRoadTrip._id } },
					{ new: true }
				);

				return updatedRoadtrip;
			}
			throw new AuthenticationError("You need to be logged in!");
		},
		deleteRoadtrip: async (parent, { _id }, context) => {
			if (context.user) {
				const updatedRoadtrip = await Roadtrip.deleteOne({ _id });

				return updatedRoadtrip;
			}
		},
		addExpense: async (parent, { _id, ...args }, context) => {
			if (context.user) {
				const updatedRoadTrip = await Roadtrip.findOneAndUpdate(
					{ _id: _id },
					{ $push: { expenses: args } },
					{ new: true }
				)
					.select("-__v")
					.populate("images")
					.populate("expenses")
					.populate("stops")
					.populate("users");

				await User.findOneAndUpdate(
					{ _id: context.user._id },
					{ $push: { expenses: updatedRoadTrip.expenses } },
					{ new: true }
				);

				return updatedRoadTrip;
			}
			throw new AuthenticationError("You need to be logged in!");
		},
		updateExpense: async (parent, { _id, expenseId, ...args }, context) => {
			if (context.user) {
				const updatedExpense = await Roadtrip.findOneAndUpdate(
					{ _id: _id, "expenses._id": expenseId },
					{ $set: { "expenses.$": args } },
					{ new: true }
				)
					.select("-__v")
					.populate("images")
					.populate("expenses")
					.populate("stops")
					.populate("users");
				console.log("-------------------------------------------");
				console.log(updatedExpense);
				await User.findOneAndUpdate(
					{ _id: context.user._id, "expenses._id": expenseId },
					{ $set: { "expenses.$": args } },
					{ new: true }
				);

				return updatedExpense;
			}

			throw new AuthenticationError("You need to be logged in!");
		},
		deleteExpense: async (parent, { _id, expenseId, ...args }, context) => {
			if (context.user) {
				const updatedExpense = await Roadtrip.findOneAndUpdate(
					{ _id },
					{ $pull: { expenses: { _id: expenseId } } },
					{ new: true }
				)
					.select("-__v")
					.populate("images")
					.populate("expenses")
					.populate("stops")
					.populate("users");

				await User.findOneAndUpdate(
					{ _id: context.user._id },
					{ $pull: { expenses: { _id: expenseId } } },
					{ new: true }
				);

				return updatedExpense;
			}

			throw new AuthenticationError("You need to be logged in!");
		},
		addImage: async (parent, { _id, ...args }, context) => {
			if (context.user) {
				console.log(args);
				// const file = args.photo;
				// const ext = args.ext;
				// const getUrl = await cloudinary.uploader.upload(
				// 	`${file}.${ext}`,
				// 	(err, result) => {
				// 		if (err) {
				// 			console.log("Cloudinary error: " + err);
				// 		}
				// 		return { success: true, result };
				// 	}
				// );

				const image = await Roadtrip.findOneAndUpdate(
					{ _id: _id },
					{
						$push: {
							images: {
								username: context.user.username,
								url: getUrl.result.secure_url,
								alt: args.alt,
							},
						},
					},
					{ new: true }
				)
					.select("-__v")
					.populate("images")
					.populate("expenses")
					.populate("stops")
					.populate("users");

				return image;
			}

			throw new AuthenticationError("You need to be logged in!");
		},
		deleteImage: async (parent, { _id, imageId, ...args }, context) => {
			if (context.user) {
				const updatedImage = await Roadtrip.findOneAndUpdate(
					{ _id },
					{ $pull: { images: { _id: imageId } } },
					{ new: true }
				)
					.select("-__v")
					.populate("images")
					.populate("expenses")
					.populate("stops")
					.populate("users");

				return updatedImage;
			}

			throw new AuthenticationError("You need to be logged in!");
		},
		addStop: async (parent, args, context) => {
			if (context.user) {
				const updatedStop = await Roadtrip.findOneAndUpdate(
					{ _id: args._id },
					{ $push: { stops: args } },
					{ new: true }
				)
					.select("-__v")
					.populate("images")
					.populate("expenses")
					.populate("stops")
					.populate("users");

				return updatedStop;
			}

			throw new AuthenticationError("You need to be logged in!");
		},
		deleteStop: async (parent, args, context) => {
			if (context.user) {
				const updatedStop = await Roadtrip.findOneAndUpdate(
					{ _id: args._id },
					{ $pull: { stops: { _id: args.stopId } } },
					{ new: true }
				)
					.select("-__v")
					.populate("images")
					.populate("expenses")
					.populate("stops")
					.populate("users");

				return updatedStop;
			}

			throw new AuthenticationError("You need to be logged in!");
		},
	},
};

module.exports = resolvers;

// Query ( *me, *user, *users, *roadtrip, *roadtrips )
// Mutation (*login, signup, *createUser, *addUser,*removeUser, *addRoadtrip, *deleteRoadtrip, *addExpense, updateExpense, *deleteExpense, *addImage, *deleteImage, *addStop, 8deleteStop)
