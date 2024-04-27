let express = require("express");
const { register, login, registerAdmin } = require("../controllers/auth.controller");
var router = express.Router();

//  Register User
router.post('/register', register);

//  Login User
router.post('/login', login);

// Register Admin:

router.post('/register-admin', registerAdmin);




module.exports = router;