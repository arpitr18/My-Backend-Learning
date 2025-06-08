import cookieParser from "cookie-parser";
import express from "express";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.cookie("game", "express", {
    maxAge: 1000 * 60 * 60 * 24,
  });
  // res.cookie("userID" , "99" , {
  //   maxAge: 1000*60*60*24,
  //   signed:true
  // })
  res.send("Hello World!");
});

app.get("/product", (req, res) => {
  const cookies = req.cookies;
  res.send(`Cookies on this browser: ${JSON.stringify(cookies)}`)
});

// listen on PORT
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
