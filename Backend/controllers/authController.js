const userModel = require("../models/userModel")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const registerController = async(req,res) =>{
    try {
        const existingUser = await userModel.findOne({email:req.body.email})
        //validation
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:'User Already Exists'
            })
        }
        //if not existing user then register and save
        //hashing of password 
        const salt = await bcrypt.genSalt(10) // no of rounds ; the more the number is the more is processing power used to decrypt
        const hashedPassowrd =await bcrypt.hash(req.body.password , salt)
        //after hashing replace normal password with hashed password
        req.body.password = hashedPassowrd
        //rest data
        const user = new userModel(req.body)
        await user.save()
        return res.status(201).send({
            success:'true',
            message:'User Registered Successfully',
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Register API',
            error
        })
    }
}


//Login Controller
const loginController = async (req, res) => {
    try {
      const user = await userModel.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Invalid Credentials",
        });
      }
    //   //check role
      if (user.role !== req.body.role) {
        return res.status(500).send({
          success: false,
          message: "role doesn't match",
        });
      }
      //compare password
      const comparePassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!comparePassword) {
        return res.status(500).send({
          success: false,
          message: "Invalid Credentials",
        });
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      return res.status(200).send({
        success: true,
        message: "Login Successfully",
        token,
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In Login API",
        error,
      });
    }
  };

//Current User Controller
const currentUserController =async(req, res)=>{
    try {
        const user = await userModel.findOne({_id:req.body.userId})
        return res.status(200).send({
            success:true,
            message:"User fetched successfully",
            user
        })
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Unable to get Current User",
        error,
      });
    }
}
module.exports = {registerController , loginController, currentUserController}

//staus(500) means internal server error
//status(200) means request is okay
//status(404) means request not found
//bcrypt is used to hash passwords ,simply import the package and Salt function is used