import mongoose, { mongo } from "mongoose";

const userSchema = mongoose.Schema({
    name: {type: String, required: True},
    points: {type: Number, default: 0}
}, {timestamps: true});

const userModel = mongoose.model.user || mongoose.model(userSchema)

export default userModel