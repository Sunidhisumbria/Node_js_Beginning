"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadSingleFile = exports.connectDb = exports.LoggedInUserOnly = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _cloudinary = require("cloudinary");

var _promises = _interopRequireDefault(require("fs/promises"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_cloudinary.v2.config({
  cloud_name: 'dqr2mxlv3',
  api_key: '847423956334364',
  api_secret: 'ueGE5KG28uAXIpw-JSVnE6P8omM'
});

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

  req.user = decodedData.userId; // to get user info by token

  next();
};

exports.LoggedInUserOnly = LoggedInUserOnly;

var uploadSingleFile = function uploadSingleFile(req, res) {
  var result, fileDetails;
  return regeneratorRuntime.async(function uploadSingleFile$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;

          if (req.file) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).send("No file uploaded"));

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(_cloudinary.v2.uploader.upload(req.file.path, {
            folder: 'avatars' // Folder name in Cloudinary

          }));

        case 5:
          result = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(_promises["default"].unlink(req.file.path));

        case 8:
          // Save file details to MongoDB
          fileDetails = new File({
            originalName: req.file.originalname,
            fileName: result.public_id,
            filePath: result.secure_url,
            size: req.file.size,
            mimeType: req.file.mimetype
          });
          _context.next = 11;
          return regeneratorRuntime.awrap(fileDetails.save());

        case 11:
          return _context.abrupt("return", result);

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          console.error("Error uploading file:", _context.t0);
          res.status(500).send("An error occurred while uploading the file");

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

exports.uploadSingleFile = uploadSingleFile;
//# sourceMappingURL=db.dev.js.map
