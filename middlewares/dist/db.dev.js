"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectDb = exports.LoggedInUserOnly = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var connectDb = function connectDb() {
  _mongoose["default"].connect("mongodb://127.0.0.1:27017/sunidhiDb").then(function (res) {
    console.log("Database is connected with host:-".concat(res.connection.host));
  })["catch"](function (err) {
    console.log("************** Database is not connected ***************** ", err);
  });
};

exports.connectDb = connectDb;

var LoggedInUserOnly = function LoggedInUserOnly(req, res, next) {
  var token = req.cookies["test-token"];
  if (!token) return res.status(401).json({
    success: false,
    message: "Unauthorized user,please login !"
  });

  var decodedData = _jsonwebtoken["default"].verify(token, "your-secret-key");

  req.user = decodedData.userId;
  next();
};

exports.LoggedInUserOnly = LoggedInUserOnly;
//# sourceMappingURL=db.dev.js.map
