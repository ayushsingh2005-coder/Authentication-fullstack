const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectToDb = require('./db/db');
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/user.routes')
const adminRoutes = require('./routes/admin.routes');
const postRoute = require("./routes/postRoutes");
const adminRoute = require("./routes/adminPostRoute");

connectToDb();

app.use(cors({
  origin: "http://localhost:5173",   
  credentials: true,                 // 👈 cookies, headers allow 
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use("/post" , postRoute);
app.use("/admin", adminRoute )

app.get('/' , (req,res)=>{
    res.send('hey new project ');
})

app.use('/users' , userRoutes);

// app.use('/api/admin', adminRoutes);

module.exports = app;