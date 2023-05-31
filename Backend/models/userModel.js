const mongoose = require('mongoose')
// Schema is created for user ,Mongoose is used 
const userSchema = new mongoose.Schema({
    role:{
        type:String,
        required:[true, 'Role is required'],
        enum:['admin','donor','bloodbank','hospital']
    },
    name:{
        type:String,
        required: function(){
            if(this.role === 'donor' || this.role === 'admin'){
                return true
            }
            return false
        }
    },
    bloodbankName:{
        type:String,
        required: function(){
            if(this.role === 'bloodbank'){
                return true
            }
            return false
        }
    },
    hospitalName:{
        type:String,
        required: function(){
            if(this.role === 'hospital'){
                return true
            }
            return false
        }
    },
    email:{
        type:String,
        require:[true, 'Email is Required'],
        unique:true
    },
    password:{
        //Should be encrypted so that no one can access ,hashed password is not decrypted without password- Application Security
        type:String,
        require:[true, 'Password is Required']
    },
    website:{
        type:String,
        
    },
    address:{
        type:String,
        require:[true, 'Address is Required']
    },
    phone:{
        type:String,
        require:[true, 'Phone Number is Required']
    }
}, {timestamps:true})

//Timestamp is used to know when the new user is created

module.exports = mongoose.model('users',userSchema)