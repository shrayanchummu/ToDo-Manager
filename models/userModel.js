const mongoose = require('mongoose');

const userSchema=mongoose.Schema({
    phone_number: {
        type: String,
        required: [true, "Please enter User Phone Number"],
        unique: [true, "Phone Number already exists"],
    },
    password:{
        type:String,
        required:[true,"Please enter Password"]
    },
    // priority: {
    //     type: String,
    //     enum: ["0", "1", "2", "3"],
    //     required: true,
    // },
},{
    timestamps:true
});

module.exports=mongoose.model("User",userSchema);