const {Schema,model} = require("mongoose")


const UserSchema = new Schema({
    name: {
        type: "string",
        required : true,
    },

    email:{
        type: "string",
        unique : true,
        required : true,
    },

    password:{
        type: "string",
        required : true
    },

    access:{
        type: "string",
        default: "User"
    }
})


