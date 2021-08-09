const { AuthenticationError } = require("apollo-server-express");
const { User, Roadtrip, Image } = require("../models");
const { signToken } = require("../utils/auth");
const cloudinary = require('cloudinary').v2;

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
	},

	Mutation: {
		addImage: async (parent, args, context) => {
			if (context.user) {
				const file = args.photo;
				const ext = args.ext;
				const getUrl = await cloudinary.uploader.upload(`${file}.${ext}`, (err, result) => {
					if (err) {
						console.log('Cloudinary error: ' + err);
					}
					return { success: true, result };
				})

				const image = await Image.create({
					username: args.username,
					url: getUrl,
					alt: args.alt
				})

				return image
			}

			throw new AuthenticationError("Not Logged In");

		}
	},
};

module.exports = resolvers;

// Query ( me, user, users, roadtrip, roadtrips )
// Mutation (login, signup, createUser, addUser, removeUser, addRoadtrip, deleteRoadtrip, addExpense, updateExpense, deleteExpense, addImage, deleteImage, addStop, deleteStop)
