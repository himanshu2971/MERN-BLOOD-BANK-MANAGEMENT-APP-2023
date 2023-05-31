const JWT = require('jsonwebtoken')
module.exports = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(" ")[1]
        JWT.verify(token, process.env.JWT_SECRET, (err, decode)=>{
            if(err){
                res.status(401).send({
                    success: false,
                    message: "Unauthorized Access",
                })
            }
            else{
                req.body.userId = decode.userId
                next();
            }
        })
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            message: "Unauthorized Access",
            error
        })
    }
}

//in middleware 3 parameters are there , next is used only when next block of request is called
//status(401) means Unauthorizaed Access