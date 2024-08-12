const dotnenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000
const users = require('./routers/users');
const path = require("path");
const cookie_parser = require("cookie-parser");
const authUsers = require('./routers/authUsers');




app.use(express.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,'public')));

app.use(cookie_parser());

app.use(express.json());

app.set("view engine","ejs");


mongoose.connect(process.env.MONGODB).then(()=>{
    
    app.listen(PORT,()=>{
        console.log("server is running on"+" "+PORT);
    })
    
}).catch(()=>{
    console.log("failed to connect")
})



app.use(users);
app.use(authUsers);
app.get("*",function(req,res){
    res.status(404).send("Page not found");
});

app.listen(PORT,()=>{
    console.log("server is running on"+" "+PORT);
})
