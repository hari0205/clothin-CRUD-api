const {Schema,model} = require("mongoose")


const UserSchema = new Schema({
    name: {
        type: String,
        required : true
    },

    email:{
        type: String,
        unique : true,
        required : true
    },

    password:{
        type: String,
        required : true
    },

    access:{
        type: "string",
        default: "User"
    }
})


const AdminSchema = new Schema({
    name: {
        type: String,
        required : true
    },

    email:{
        type: String,
        unique : true,
        required : true
    },

    password:{
        type: String,
        required : true
    },

    access:{
        type: String,
        default: "Admin"
    }
})


const ProductSchema = new Schema({
    name:{
        type:String,
        required:true
    },

    category:{
        type:String,
        required:true
    },

    price:{
        type:Number,
        default:0
    },


})

model("User", UserSchema)
model("Admin", AdminSchema)
model("Cloths", ProductSchema)