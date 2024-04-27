var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  username: String,
  email: String,
  password: String,
  profileimage: String,
  isAdmin: Boolean,
  roles: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "role"
  }
},
  {
    timestamps: true
  }
);


module.exports = mongoose.model('users', UserSchema);

