import mongoose from "mongoose";
//var Schema = mongoose.Schema;


const userDetailsSchema = ({ 
    userName: String,
    email: String,
    password: String,
},
{
    collection: "userDetails",
});

//module.exports = mongoose.model("userDetails", userDetailsSchema);