# Express API Notes
This document contains essential details about setting up and using an Express server, covering status codes, common middlewares, HTTP methods, and route examples.

## Status Codes

- **200** : OK — (GET)
- **201** : Created — (POST)

## Common Middlewares

You can use these common middlewares to handle different types of data and enable additional features in your Express app.

```javascript
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Middleware to handle CORS
import cors from "cors";
app.use(cors());
````

## HTTP Methods

### **GET Method**

* **Root Route**

  * Responds with a simple "Hello World!" message.

  ```javascript
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
  ```

* **Query Parameters**

  * Handles queries to search for users by name.

  ```javascript
  app.get("/api/v1/users", (req, res) => {
    const { name } = req.query;

    if (name) {
      const filteredUsers = data.filter(
        (user) => user.name.toLocaleLowerCase() === name.toLocaleLowerCase()
      );
      return res.send(filteredUsers);
    }
    res.json(data);
  });
  ```

* **Path Parameters**

  * Fetches a user by their unique ID.

  ```javascript
  app.get("/api/v1/users/:id", (req, res) => {
    const { id } = req.params;
    const userId = parseInt(id);

    const user = data.find((user) => user.id === userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json(user);
  });
  ```

### **POST Method**

* **Create a New User**

  * Adds a new user to the database (or array of data).

  ```javascript
  app.post("/api/v1/users", (req, res) => {
    const { name, email } = req.body;
    const newUser = {
      id: (data.length + 1).toString(),  // Generates a new ID based on the current data length
      name,
      email,
    };
    
    // Add the new user to the data array
    data.push(newUser);
    
    // Respond with a success message and the new user data
    res.status(201).send({
      message: "User added successfully",
      user: newUser,
    });
  });
  ```

### **PUT Method**

* **Update an Existing User**

  * Fully updates a user’s information based on the user ID.

  ```javascript
  app.put("/api/v1/users/:id", (req, res) => {
    const { body, params: { id } } = req;
    const parsedId = parseInt(id);

    const userIndex = data.findIndex((user) => user.id === parsedId);
    if (userIndex === -1) {
      return res.status(404).send("User not found");
    }

    // Update the user data
    data[userIndex] = { id: parsedId, ...body };

    res.send({
      message: "User updated successfully",
      user: data[userIndex],
    });
  });
  ```

### **PATCH Method**

* **Partially Update an Existing User**

  * Updates selected fields for a user based on their ID.

  ```javascript
  app.patch("/api/v1/users/:id", (req, res) => {
    const { body, params: { id } } = req;

    const userIndex = data.findIndex((user) => user.id.toString() === id);
    if (userIndex === -1) {
      return res.status(404).send("User not found");
    }

    // Partially update the user data
    data[userIndex] = { ...data[userIndex], ...body };

    res.send({
      message: "User updated successfully",
      user: data[userIndex],
    });
  });
  ```

### **DELETE Method**

* **Delete a User**

  * Removes a user from the database (or array of data) by their ID.

  ```javascript
  app.delete("/api/v1/users/:id", (req, res) => {
    const { id } = req.params;
    const parsedId = parseInt(id);
    const userIndex = data.findIndex((user) => user.id.toString() === id);

    if (userIndex === -1) {
      return res.status(404).send("User not found");
    }

    // Remove the user from the data array
    const deletedUser = data.splice(userIndex, 1);
    res.send({
      message: "User deleted successfully",
      user: deletedUser[0],
    });
  });
  ```

## Routes in Express

```javascript
// index.js
import userRouter from "./routers/user.route.js";
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
```

```javascript 
// user.route.js
import { Router } from "express";

const userRouter = Router();

// Define routes for user operations
userRouter.get("/create-user", (req, res) => {
  res.send("Create a new user");
});

userRouter.get("/post-user", (req, res) => {
  res.send("Post a new user");
});

userRouter.get("/delete-user", (req, res) => {
  res.send("Delete a user");
});

userRouter.get("/update-user", (req, res) => {
  res.send("Update a user");
});

export default userRouter;
```


