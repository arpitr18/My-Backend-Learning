import express from "express";
import data from "./data.js";

const app = express();
// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Middleware to handle CORS
// import cors from "cors";
// app.use(cors());

const PORT = process.env.PORT || 3000;

// Root route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// query parameter
app.get("/api/v1/users", (req, res) => {
  const { name } = req.query;

  if (name) {
    const fusers = data.filter(
      (user) => user.name.toLocaleLowerCase() === name.toLocaleLowerCase()
    );
    return res.send(fusers);
  }
  res.json(data);
});

// route with path parameter
app.get("/api/v1/users/:id", (req, res) => {
  const { id } = req.params;
  let userId = parseInt(id);

  const user = data.find((user) => user.id === userId); 
  if (!user) {
    return res.status(404).send("User not found");
  }
  res.json(user);
});

// Post route to add a new user
app.post("/api/v1/users", (req, res) => {
  const { name, email } = req.body;
  const newUser = {
    id: (data.length + 1).toString(), // Generate a new ID based on the current length of the data array
    name,
    email,
  };
  // Add the new user to the data array
  data.push(newUser);
  // Optionally, you can log the new user to the console
  // This is useful for debugging purposes
  console.log(newUser);
  res.status(201).send({
    message: "User added successfully",
    user: newUser,
  });
});

//Put route to update all users
app.put("/api/v1/users/:id", (req, res) => {
  const {body , params: { id } } = req;
  const parsedId = parseInt(id);

  const userIndex = data.findIndex((user) => user.id === parsedId);
  if (userIndex === -1) {
    return res.status(404).send("User not found");
  }

  // Update the user data

  data[userIndex] = { id : parsedId , ...body };
  res.send({
  message: "User updated successfully",
  user: data[userIndex],
  });
})

// Patch route to update a user by ID
app.patch("/api/v1/users/:id", (req, res) => {
  const { body, params: { id } } = req;

  const userIndex = data.findIndex((user) => user.id.toString() === id);
  if (userIndex === -1) {
    return res.status(404).send("User not found");
  }

  data[userIndex] = { ...data[userIndex], ...body };

  res.send({
    message: "User updated successfully",
    user: data[userIndex],
  });
});

// Delete route to remove a user by ID
app.delete("/api/v1/users/:id", (req, res) => {
  const { id } = req.params;
  const parsedId = parseInt(id);
  const userIndex = data.findIndex((user) => user.id.toString() === id);

  if (userIndex === -1) {
    return res.status(404).send("User not found");
  }

  const deletedUser = data.splice(userIndex,1);
  res.send({
    message: "User deleted successfully",
    user: deletedUser[0],
  });
});


// listen on PORT
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
