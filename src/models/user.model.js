import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

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

//Before saving the user password, we need to hash it for security reasons

userSchema.pre("save", async function () {
	if (!this.isModified("password")) return;
	
	this.password = await bcrypt.hash(this.password, 10);
});

//Method to compare the password during login

userSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
