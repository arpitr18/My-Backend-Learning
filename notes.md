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
```javascript
const path = require('path');

console.log('Current directory:', __dirname);
console.log('Current file:', __filename);

const filePath = path.join("folders" , "students", 'example.txt');

const resolvedPath = path.resolve(filePath);
console.log('Resolved path:', resolvedPath);  

const extname = path.extname(filePath);
console.log('File extension:', extname);

const basename = path.basename(filePath);
console.log('Base name:', basename);

const dirname = path.dirname(filePath);
console.log('Directory name:', dirname);

const parsedPath = path.parse(filePath);
console.log('Parsed path:', parsedPath);

const formatPath = path.format(parsedPath);
console.log('Formatted path:', formatPath);

const isAbsolute = path.isAbsolute(filePath);
console.log('Is absolute path:', isAbsolute);

const relativePath = path.relative(__dirname, filePath);
console.log('Relative path:', relativePath);

const normalizedPath = path.normalize('folders/../students/example.txt');
console.log('Normalized path:', normalizedPath);  

```
## Events in nodeJS

```Javascript
const EventEmitter = require('events');

const emitter = new EventEmitter();
// Function to handle the 'message' event 

// on(eventName , listener) -- create
 emitter.on("Greet" , (args)=>{
    console.log(`Hello ${args.name}! , You are ${args.age} years old.`);
 })
// emit(eventName, [args]}) -- executes
emitter.emit("Greet" , {
    name: "Arpit",
    age: 20
});
```

## Streams in nodeJS

pipe method apne left mein and right mein kis type ke streams accept karta hai ?
readable <-- pipe --> writeable

req : readable stream hota hai 
res : writeable stream hota hia 

```javascript
const stream = require("stream");
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // |1. Downloading a file in a bad way ❌

  const file = fs.readFileSync("streams.txt");

  res.end(file);

  // |2. Downloading a file in a good way ✅

  const readable = fs.createReadStream("streams.txt");
  readable.pipe(res);
  res.end();

  // |3. Copying a file in a bad way ❌
  const files = fs.readFileSync("streams.txt");
  fs.writeFileSync("copy.txt", files);
  res.end("File copied successfully");

  // |4. Copying a file in a good way ✅
  const readableS = fs.createReadStream("streams.txt");
  const writableS = fs.createWriteStream("copy2.txt");

  readableS.on("data", (chunk) => {
    // console.log(chunk);
    writableS.write(chunk);
  });
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

```
