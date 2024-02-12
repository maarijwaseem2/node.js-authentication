const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require('./config');

const app = express();
app.use(express.json());

app.use(express.urlencoded({extended: false}));


app.set('view engine','ejs');

app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.render("login");
});

app.get('/signup',(req,res)=>{
    res.render("signup");
});

app.post('/signup',async (req , res)=>{
    const data = {
        name : req.body.username,
        password : req.body.password,
    }

    const existingUser = await collection.findOne({name: data.name});
    if(existingUser){
        res.send("User Already have an Account");
    }
    else{
        // hash password using bcrypt
        const saltRounds = 10;
        const HashPassword = await bcrypt.hash(data.password,saltRounds);
        data.password = HashPassword;
        const userdata = await collection.insertMany(data);
        console.log(userdata)

    }
});

app.post("/login",async (res,req)=>{
    try{
        const check = await collection.findOne({name: res.body.username});
        if(!check){
            req.send("User name connot Find");
        }
        const isPassMatch = await bcrypt.compare(res.body.password, check.password);
        if(isPassMatch){
            req.render('home');
        }
        else{
            req.send('Wrong Password');
        }
    }
    catch{
        req.send("Wrond Detail");
    }
})

app.listen(3000,()=>{
    console.log("Server running on Port: 3000" );
})