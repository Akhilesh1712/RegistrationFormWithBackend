const mongoose = require("mongoose");
const employeeschema = new mongoose.Schema({
     firstname : {
        type:String,
        required:true
     },
     email : {
        type:String,
        requireed:true,
        unique:true
     },
     password : {
        type:String,
        required:true,
     },
     confirmpassword : {
        type:String,
        required:true
     }
})


//collection

const Register = new mongoose.model("Register", employeeschema);
module.exports = Register;