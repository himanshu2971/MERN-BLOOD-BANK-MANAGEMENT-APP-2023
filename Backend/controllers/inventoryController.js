const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

//create inventory , callback function
const createInventoryController =async(req,res)=>{
    try {
        //des structuring
        const {email, inventoryType} = req.body
        //VALIDATION FOR USER
        const user = await userModel.findOne({email})
        if(!user){
           throw new Error('User not found') 
        }
        //check inventory type
        if(inventoryType === "in" && user.role !== "donor"){
            throw new Error("Not a donor account")
        }
        if(inventoryType === "out" && user.role !== "hospital"){
            throw new Error ("Not a Hospital")
        }
        //save inventory or re3cord
        const inventory =new inventoryModel(req.body)
        await inventory.save()
        return res.status(201).send({
            success:true,
            message:" Blood Record Added"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Create Inventory API",
            error
        })
    }
}

//GET All Blood Records
const getInventoryController = async (req, res) => {
    try {
      const inventory = await inventoryModel
        .find({
          bloodbankName: req.body.userId,
        })
        .populate("donor")
        .populate("hospital")
        .sort({ createdAt: -1 });
      return res.status(200).send({
        success: true,
        messaage: "get all records successfully",
        inventory,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error In Get All Inventory",
        error,
      });
    }
  };
module.exports = {createInventoryController, getInventoryController}