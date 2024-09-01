const express=require("express"); 
const {Signup,Login}=require("../Controller/UserController");

const app=express.Router();

app.post("/signup",Signup);
app.post("/login",Login);

module.exports = app;