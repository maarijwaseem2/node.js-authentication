const mongoose = require('mongoose')
const connect = mongoose.connect('mongodb://0.0.0.0:27017/');

connect.then(()=>{
    console.log("Database Connected Successfully");
})
.catch((err)=>{
    console.log("Database cannot be connected: " + err);
});

// Write Schema 
const loginSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

const collection = new mongoose.model("users",loginSchema);

module.exports = collection;