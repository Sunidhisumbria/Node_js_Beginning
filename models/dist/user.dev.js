"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.File = exports.User = void 0;

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
var fileSchema = new _mongoose.Schema({
  originalName: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  },
  uploadedBy: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  uploadDate: {
    type: Date,
    "default": Date.now
  }
}, {
  timestamps: true
});
var User = (0, _mongoose.model)("users", userSchema);
exports.User = User;
var File = (0, _mongoose.model)("files", fileSchema); // const 

exports.File = File;
//# sourceMappingURL=user.dev.js.map
