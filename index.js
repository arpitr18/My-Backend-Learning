import express from "express";
const app = express();
import dotenv from "dotenv";

dotenv.config();

// listen on PORT
const PORT = process.env.PORT || 8000;

app.get("/" , (req,res)=>{
  res.json({
    Message : "Hii! how are you?"
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});

