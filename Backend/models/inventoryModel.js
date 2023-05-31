const mongoose =require('mongoose')
const inventorySchema = new mongoose.Schema({
  inventoryType: {
    type: String,
    required: [true, "Inventory Type Required"],
    enum: ["in", "out"], // which blood group is in and which is out
  },
  bloodGroup: {
    type: String,
    required: [true, "Blood group is Required"],
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  quantity:{
    type:Number,
    required:[true, 'Blood Quantity is required']
  },
  bloodbankName:{
    type: mongoose.Schema.Types.ObjectId, //because it is relational
    ref:'users',
    required:[false, 'Blood Bank is required']
  },
  hospital:{
    type: mongoose.Schema.Types.ObjectId, //because it is relational
    ref:'users',
    //function in required because type of hospital is specific
    required: function(){
        return this.inventoryType === "out"
    }
  },
  donor:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'users',
    required: function(){
        return this.inventoryType === "in"
    }
  }
},{timestamps:true});

module.exports = mongoose.model('inventory', inventorySchema)