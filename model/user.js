var mongoose = require("mongoose");

let userSchema = mongoose.Schema({
    name: 
    {
        type: String,
        required: [true, "please enter name.."]
    },

    email: 
    {
        type: String,
        required: [true, "please enter email.."],
        unique: true
    },

    password: 
    {
        type: String,
        required: [true, "please enter password.."]
    },

    balance: 
    {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("user", userSchema);