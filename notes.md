# These are my personal notes for my reference

## how to upload any project to github using command line
```bash
echo "# My-Backend-Learning" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/arpitr18/My-Backend-Learning.git
git push -u origin main
```
## how to push an existing repo from the command line
```bash
git remote add origin https://github.com/arpitr18/My-Backend-Learning.git
git branch -M main
git push -u origin main
```

```javascript
console.log("Hello, World!");
```

## how to import modules 
index.js
```Javascript
import { ADD , SUBTRACT } from "./maths.js";

console.log(ADD(5, 3)); // Outputs: 8
console.log(SUBTRACT(5, 3)); // Outputs: 2

```
maths.js
```javascript
export function ADD(a, b) {
    return a + b;
}
export function SUBTRACT(a, b) {
    return a - b;
}
function MULTIPLY(a, b) {
    return a * b;
}   
function DIVIDE(a, b) {
    if (b === 0) {
        throw new Error("Division by zero is not allowed.");
    }
    return a / b;
} 
```

## how to use file module
```Javascript
import fs from "fs";

// fs.writeFileSync('output.txt', 'Hello, World!')
// console.log(data); // Outputs: Hello, World!

const data = fs.readFile("output.txt", "utf8", (err, res) => {
  if (err) {
    console.log("Error reading file:", err);
  } else {
    console.log("File read successfully:", res);
    return res;
  }
});
```
## how to maintain a server log file using nodeJS

```javascript
import http from "http";
import fs from "fs";

const PORT = 3000;

const myServer = http.createServer((req, res) => {
  const log = `Request received from ${req.url} at ${new Date().toDateString()} and ${Date.now()}\n`;
  fs.appendFile("server.log", log, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
      res.end("Internal Server Error");
    } else {
      res.end("Log entry added successfully");
    }
  });
});

myServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

```
## Path Modules

