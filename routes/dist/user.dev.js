"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = require("../controllers/user.js");

var _db = require("../middlewares/db.js");

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var uploadFile = (0, _multer["default"])({
  dest: "../uploadImg"
});

var app = _express["default"].Router();

app.post("/register", _user.register);
app.post("/login", _user.login);
app.use(_db.LoggedInUserOnly);
app.get("/me", _user.profile); // app.get("/me/:id",profile)

app["delete"]("/deleteUser/:id", _user.deleteUser);
app.put("/updateEditUser/:id", _user.updateEditUser);
app.post("/logout", _user.logout);
app.post("/uploadSingleImg", uploadFile.single("avatar"), _user.uploadSingleFile);
var _default = app;
exports["default"] = _default;
//# sourceMappingURL=user.dev.js.map
