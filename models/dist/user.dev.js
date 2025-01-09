"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _mongoose = require("mongoose");

var userSchema = new _mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  phone: {
    type: String
  },
  password: {
    type: String,
    required: true,
    select: false
  }
});
var User = (0, _mongoose.model)("users", userSchema); // const 

exports.User = User;
//# sourceMappingURL=user.dev.js.map
