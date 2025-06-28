import cookieParser from "cookie-parser";
import session from "express-session";

app.use(
  session({
    secret: "mysecret",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, //1 day
    },
  })
);
app.use(cookieParser("aezak"));

app.get("/", (req, res) => {
  console.log(req.session);
  console.log(req.session.id);
  res.send("Hello World!");
});

app.get("/login", (req, res) => {
  req.session.user = {
    name: "Arpit",
    email: "arpitrai1809@gmail.com",
    age: 30,
  };
  res.send(`${req.session.user.name} is logged in`);
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.send(` logged out`);
});
