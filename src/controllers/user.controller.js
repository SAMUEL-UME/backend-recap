import User from "../models/user.model.js";

const registerUser = async (req, res, next) => {
	try {
		const { username, email, password } = req.body;

		//basic validation

		if (!username || !email || !password) {
			return res.status(400).json({
				message: "All fields are required"
			});
		}

		//check if user already exists
		const existingUser = await User.findOne({ email: email.toLowerCase() });
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}

		//create a new user
		const user = await User.create({
			username,
			email: email.toLowerCase(),
			password
		});

		res.status(201).json({
			message: "User registered successfully",
			user: { userId: user._id, email: user.email, username: user.username }
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: "Internal Server Error",
			error: error
		});
	}
};

const loginUser = async (req, res) => {
	try {
		//Check for user credentials
		const { email, password } = req.body;

		const user = await User.findOne({ email: email.toLowerCase() });

		if (!user) {
			return res.status(400).json({
				message: "Invalid credentials"
			});
		}

		//Validate the password

		const isMatch = await user.comparePassword(password);

		console.log(isMatch);

		if (!isMatch) {
			return res.status(400).json({
				message: "Invalid credentials"
			});
		}

		res.status(200).json({
			message: "User is logged in successfully",
			user: { userId: user._id, email: user.email, username: user.username }
		});
	} catch (error) {
		res.status(500).json({
			message: "Internal Server Error",
			error: error
		});
	}
};

const logoutUser = async (req, res) => {
	// In a real application, you would handle token invalidation here
	
}

export { registerUser, loginUser };
