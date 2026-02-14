import express from "express"; //import express

const app = express(); //create an express app

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes import
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

//ex

export default app;
