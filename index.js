import express from "express";
import data from "./data.js";
import userRouter from "./routers/user.route.js";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Middleware to handle CORS
// import cors from "cors";
// app.use(cors());

app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});



// listen on PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
