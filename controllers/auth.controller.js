
const { createError } = require("../Utils/error");
const { createSuccess } = require("../Utils/success");
var Role = require("../models/role");
var User = require("../models/users")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');





exports.register = async (req, res, next) => {

    // return next(createError(500, "my err msg"))

    const role = await Role.find({ role: 'User' });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = await User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        roles: role,
    })

    await newUser.save()
    return next(createSuccess(200, "User Registered SuccesFull", newUser))
}

exports.login = async (req, res, next) => {

    try {
        const user = await User.findOne({ email: req.body.email })
            .populate("roles", "role")

        const { roles } = user;

        if (!user) {
            return res.status(404).send({ status: "User Not Found" })
            // return next(createError(404, "User Not Found"))

        }

        var isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)

        if (!isPasswordCorrect) {
            return res.status(400).send({ status: "Password is Incorrect" })
        }

        const token = jwt.sign(
            {
                id: user.id, isAdmin: user.isAdmin, roles: roles
            },
            "SecretKey"
        )
        // return res.status(200).send({ status: "Login Success" })
        // return next(createSuccess(200, "Login Successfull"))
        res.cookie("access_token", token, { httpOnly: true }).status(200).json({
            status: 200,
            message: "Login Success",
         user
        })

    } catch (error) {
        return res.status(500).send({ status: "Something went wrong" })
    }
}

exports.registerAdmin = async (req, res, next) => {

    // return next(createError(500, "my err msg"))

    const role = await Role.find({});
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = await User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        isAdmin: true,
        roles: role,
    })

    await newUser.save()
    return next(createSuccess(200, "Admin Registered SuccesFull", newUser))
}


