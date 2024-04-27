
var Role = require("../models/role");




exports.createRole = async (req, res, next) => {
    try {
        if (req.body.role && req.body.role != '') {

            const newRole = new Role(req.body);
            await newRole.save();

            return res.send({ status: "Role Created", data: newRole })
        }
        else {
            return res.status(404).send({ status: "Role Not Created" })
        }
    }
    catch (error) {
        return res.status(500).send({ status: "Intrnal Server Error" })

    }
}


exports.getAllRoles = async (req, res, next) => {
    try {
        const roles = await Role.find({});
        if (roles) {
            return res.status(200).send({ status: "Fetch All Roles", data: roles })
        } else {
            return res.status(404).send({ status: "Roles Not Found" })
        }
    }
    catch (error) {
        return res.status(500).send({ status: "Intrnal Server Error" })

    }
}

exports.updateRole = async (req, res, next) => {
    try {
        const role = await Role.findById({ _id: req.params.id });
        if (role) {
            const newData = await Role.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            )
            return res.status(200).send({ status: "Role updated", data: newData })
        } else {
            return res.status(404).send({ status: "Role Not updated" })
        }
    }
    catch (error) {
        return res.status(500).send({ status: "Intrnal Server Error" })

    }
}

exports.deleteRole = async (req, res, next) => {
    try {
        const roleId = req.params.id
        const role = await Role.find({ _id: roleId });
        if (role) {
            await Role.findByIdAndDelete(role)
            return res.status(200).send({ status: "Role Deleted", data: role })
        } else {
            return res.status(404).send({ status: "Roles Not Found" })
        }
    }
    catch (error) {
        return res.status(500).send({ status: "Intrnal Server Error" })

    }
}