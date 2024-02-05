const express = require('express');
const { authUser, registerUser, getUserProfile,getAllUsers} = require('../controllers/customerController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);
router.get("/profile",protect,getUserProfile);
router.get("/all",getAllUsers);


module.exports = router;