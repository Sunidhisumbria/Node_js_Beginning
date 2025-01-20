"use strict";

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("./routes/user.js"));

var _db = require("./middlewares/db.js");

var _dotenv = require("dotenv");

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
(0, _dotenv.config)(); // const port = process.env.PORT

(0, _db.connectDb)();
app.use(_express["default"].json());
app.use((0, _cookieParser["default"])());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use("/api/v1", _user["default"]); // app.post("/abc",(req,res)=>{
//     res.send(req.body)
// })

app.use("/", function (req, res) {
  res.send("API is working ");
});
app.listen(4000, function () {
  console.log("server is running on port ".concat(4000));
});
//# sourceMappingURL=app.dev.js.map
