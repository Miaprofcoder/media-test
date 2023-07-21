const { Schema, Types, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^.+@(?:[\w-]+\.)+\w+$/, "Please fill a valid email address"],
  },
  thoughts: [ { type: Types.ObjectId, ref: 'Thought' } ],
  friends: [ {type: Types.ObjectId, ref: 'User'} ],
});

const User = model("User", userSchema);

module.exports = User;
