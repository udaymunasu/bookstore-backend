var mongoose = require("mongoose");

var RoleSchema = new mongoose.Schema(
    {
        role: String,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("role", RoleSchema);
