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
---

## Routes in Express

You can modularize your route definitions using the `Router` object from Express. This keeps your main `index.js` file clean and improves project organization.

### **Route Mounting in index.js**

* This sets up the root and user routes.

```javascript
// index.js
import express from "express";
import userRouter from "./routers/user.route.js";

const app = express();

// Mount the user routes under /api/users
app.use("/api/users", userRouter);

// Root route
app.get("/", (req, res) => {
  res.send("Hello World!");
});
```

### **Router File Example (user.route.js)**

* Define individual user-related routes using the `Router` instance.

```javascript
// user.route.js
import { Router } from "express";

const userRouter = Router();

// Route to simulate user creation
userRouter.get("/create-user", (req, res) => {
  res.send("Create a new user");
});

// Route to simulate posting a user
userRouter.get("/post-user", (req, res) => {
  res.send("Post a new user");
});

// Route to simulate deleting a user
userRouter.get("/delete-user", (req, res) => {
  res.send("Delete a user");
});

// Route to simulate updating a user
userRouter.get("/update-user", (req, res) => {
  res.send("Update a user");
});

export default userRouter;
```
---

## Cookies in Express

Cookies are small pieces of data stored in the client's browser and sent with every request to the server. Express makes cookie handling easier with the `cookie-parser` middleware.

### **Using `cookie-parser` Middleware**

```javascript
import cookieParser from "cookie-parser";

app.use(cookieParser());               // For regular cookies
app.use(cookieParser("secret"));      // For signed cookies
```

### **Set Cookies**

Use `res.cookie()` to set a cookie.

```javascript
app.get("/", (req, res) => {
  res.cookie("userID", "99", {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    signed: true,
  });
  res.send("Hello World!");
});
```

### **Read Cookies**

You can read cookies and signed cookies from the request object.

```javascript
app.get("/product", (req, res) => {
  console.log("Cookies: ", req.cookies);
  console.log("Signed-Cookies: ", req.signedCookies);

  if (req.cookies.name && req.cookies.game === "express") {
    res.status(200).send({
      id: 1,
      name: "item-1",
      price: "$100",
    });
  } else {
    res.status(403).send({
      user: "Not-Authorized",
    });
  }
});
```

### **Additional Cookie Properties**

These options provide better control and security:

```javascript
res.cookie("anything", "anyvalue", {
  maxAge: 24 * 60 * 60 * 1000, // 1 day
  httpOnly: true,              // Prevent access via client-side JavaScript
  secure: false,               // Set to true if using HTTPS
});
```

### **Access All Cookies**

Another way to retrieve cookies:

```javascript
app.get("/product", (req, res) => {
  const cookies = req.cookies;
  res.send(`Cookies on this browser: ${JSON.stringify(cookies)}`);
});
```

### **Delete Cookies**

Use `res.clearCookie()` to remove cookies from the client.

```javascript
app.get("/deleteCookies", (req, res) => {
  res.clearCookie("game");
  res.send("Cookies have been deleted!");
});
```
---