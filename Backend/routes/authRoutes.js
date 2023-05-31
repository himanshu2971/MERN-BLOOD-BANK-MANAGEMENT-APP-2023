const express = require("express");
const {
  registerController,
  loginController,
  currentUserController,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
//Creating Routes for Register
//Method is POST and then url pattern and Controller function
router.post("/register", registerController);

//Creating Routes for Login
//Method is POST and then url pattern and Controller function
router.post("/login", loginController);

// GET Current User , Method is GET
router.get("/current-user", authMiddleware, currentUserController);

module.exports = router;
