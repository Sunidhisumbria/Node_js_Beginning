"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storage = void 0;

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "uploads/"); // Destination folder for uploaded files
  },
  filename: function filename(req, file, cb) {
    var uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "".concat(file.fieldname, "-").concat(uniqueSuffix, "-").concat(file.originalname));
  }
});

exports.storage = storage;
//# sourceMappingURL=storage.dev.js.map
