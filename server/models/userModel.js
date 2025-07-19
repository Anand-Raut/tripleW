import mongoose, { mongo } from "mongoose";

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    points: {type: Number, default: 0}
}, {timestamps: true});

const userModel = mongoose.models.User || mongoose.model('User', userSchema);

export default userModel