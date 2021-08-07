const { Schema } = require('mongoose');

const expenseSchema = new Schema(
    {
        category: {
            type: String,
            required: true,
            trim: true
        },
        user: [
            {
                types: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
    }
)