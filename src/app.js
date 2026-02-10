import express from "express"; //import express

const app = express(); //create an express app

app.use(express.json());

//routes import
import userRouter from "./routes/user.routes.js";

//routes declaration
app.use("/api/v1/users", userRouter);
// app.use("/api/v1/post", postROuter);

//ex

export default app;
