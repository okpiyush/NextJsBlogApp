import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true, // Ensures username is unique
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user',
        enum: ["user", "admin"]
    }
});

// finding by username
UserSchema.statics.findByUsername = async function(username) {
    return await this.findOne({ username });
};


const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
