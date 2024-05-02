const express=require("express");
const app=express();
const dotenv=require("dotenv");
var cors = require('cors')
const userRoutes=require("./routes/userRoutes");
const postRoutes=require("./routes/postRoutes")
dotenv.config();

const allowedOrigins = ['http://localhost:3000'];


const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

const PORT=process.env.PORT;

app.use(express.json());


app.use("/api/auth", userRoutes);
app.use("/api/post",postRoutes);
app.listen(PORT,console.log(`server reunning on ${PORT}`))