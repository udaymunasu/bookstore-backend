var express = require('express');
const { getAllUsers, getUserById } = require('../controllers/user.controller');
const { verifyAdmin, verifyUser } = require('../Utils/verify.token');
var router = express.Router();

/* GET ALL users listing. */

// Only admins get get all users
// router.get('/',verifyAdmin, getAllUsers);
router.get('/', getAllUsers);


/* GET By ID users listing. */

// router.get('/:id',verifyUser, getUserById);
router.get('/:id', getUserById);




module.exports = router;
