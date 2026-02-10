import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
			minLength: 3,
			maxLength: 20
		},
		password: {
			type: String,
			required: true,
			minLength: 8,
			maxLength: 50
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true
		}
	},
	{
		timestamps: true
	}
);

const User = mongoose.model("User", userSchema);

export default User;
