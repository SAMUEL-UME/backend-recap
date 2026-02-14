import Post from "../models/post.model.js";

const createPost = async (req, res) => {
	try {
		const { name, description, age } = req.body;

		if (!name || !description || !age) {
			return res.status(400).json({ error: "All fields are required" });
		}
		const post = await Post.create({ name, description, age });

		res.status(201).json({ message: "Post created successfully", post });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Failed to create post", error });
	}
};

const getPosts = async (req, res) => {
	try {
		const posts = await Post.find();

		res.status(200).json({ message: "Post retrieved successfully", posts });
	} catch (error) {
		res.status(500).json({ message: "Failed to retrieve posts", error });
	}
};

const updatePost = async (req, res) => {
	try {
		if (Object.keys(req.body).length === 0) {
			return res.status(400).json({ message: "No data provided for update" });
		}
		const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
			returnDocument: "after"
		});
		console.log(updatePost);

		if (!updatedPost) {
			return res.status(404).json({ message: "Post not found" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Failed to update post", error });
	}
};

const deletePost = async (req, res) => {
	const { id } = req.params;
	try {
		const deletePost = await Post.findByIdAndDelete(id);

		if (!deletePost) {
			return res.status(404).json({ message: "Post not found" });
		}

		res.status(200).json({ message: "Post deleted successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Failed to delete post", error });
	}
};
export { createPost, getPosts, updatePost, deletePost };
