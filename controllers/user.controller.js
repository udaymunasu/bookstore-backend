
const { createError } = require("../Utils/error");
const { createSuccess } = require("../Utils/success");
var Role = require("../models/role");
var User = require("../models/users")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');





exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({})
        return next(createSuccess(200, "All Users", users));
        // return res.status(200).send({ status: "Fetch All Roles", data: users })


    } catch (error) {
        return next(createError(500, "Internal Server Erroe"));
    }

}

exports.getUserById = async (req, res, next) => {

    try {
        const users = await User.findById(req.params.id)
        if (!users) {
            return next(createError(404, "User Not Found"));

        }
        return next(createSuccess(200, "Users By Id", users))
    } catch (error) {
        return next(createError(500, "Internal Server Error"));
    }

}



