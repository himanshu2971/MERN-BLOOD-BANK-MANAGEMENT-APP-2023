const testController = (req,res) =>{
    res.status(200).send({
        message: "Test Route Successfull",
        success: true,
    })
}
module.exports = {testController};