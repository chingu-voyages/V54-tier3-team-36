import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [4, 'Password must be at least 4 characters'],
    },
    age: {
        type: String,
        enum: {
            values:['<5', '5-8', '9-12', '13-17','18+'],
            message: '{VALUE} is not a valid age group',
        },
        required: true
    },

}, {
    timestamps: true // createdAt, updatedAt
})

const User = mongoose.model('User', userSchema);

export default User;