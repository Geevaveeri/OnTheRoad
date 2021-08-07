const { Schema, model } = require('mongoose');
const userSchema = require('./User');
const stopSchema = require('./Stop');
// import expenses

const roadtripSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        destination: {
            type: String,
            required: true,
            trim: true
        },
        playlist: {
            type: String,
            trim: true
        },
        images: [imageSchema],
        expenses: [expenseSchema],
        stops: [stopSchema],
        users: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],

    }
);

module.exports = roadtripSchema;