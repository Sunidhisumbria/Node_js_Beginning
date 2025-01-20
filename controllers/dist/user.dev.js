"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadSingleFile = exports.logout = exports.updateEditUser = exports.deleteUser = exports.profile = exports.login = exports.register = void 0;

var _user = require("../models/user.js");

var _bcrypt = require("bcrypt");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _cloudinary = require("cloudinary");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(function _callee() {
  var uploadResult, optimizeUrl, autoCropUrl;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // Configuration
          _cloudinary.v2.config({
            cloud_name: 'dqr2mxlv3',
            api_key: '847423956334364',
            api_secret: 'ueGE5KG28uAXIpw-JSVnE6P8omM' // Click 'View API Keys' above to copy your API secret

          }); // Upload an image


          _context.next = 3;
          return regeneratorRuntime.awrap(_cloudinary.v2.uploader.upload('https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
            public_id: 'shoes'
          })["catch"](function (error) {
            console.log(error);
          }));

        case 3:
          uploadResult = _context.sent;
          console.log(uploadResult); // Optimize delivery by resizing and applying auto-format and auto-quality

          optimizeUrl = _cloudinary.v2.url('shoes', {
            fetch_format: 'auto',
            quality: 'auto'
          });
          console.log(optimizeUrl); // Transform the image: auto-crop to square aspect_ratio

          autoCropUrl = _cloudinary.v2.url('shoes', {
            crop: 'auto',
            gravity: 'auto',
            width: 500,
            height: 500
          });
          console.log(autoCropUrl);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
})(); //----------------------------Registeration Api-------------------//


var register = function register(req, res) {
  var _req$body, name, email, phone, password, bcryptPassword;

  return regeneratorRuntime.async(function register$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, email = _req$body.email, phone = _req$body.phone, password = _req$body.password;

          if (!(!email || !phone || !password || !name)) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            success: false,
            message: "ALL field are required "
          }));

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap((0, _bcrypt.hash)(password, 10));

        case 5:
          bcryptPassword = _context2.sent;
          _context2.next = 8;
          return regeneratorRuntime.awrap(_user.User.create({
            name: name,
            email: email,
            password: bcryptPassword,
            phone: phone
          }));

        case 8:
          res.status(201).json({
            success: true,
            message: "User created successfully"
          });

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  });
}; //----------------------------Login Api-------------------//


exports.register = register;

var login = function login(req, res) {
  var _req$body2, email, password, user, isPasswordMatch, token;

  return regeneratorRuntime.async(function login$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_user.User.findOne({
            email: email
          }).select("+password"));

        case 3:
          user = _context3.sent;

          if (user) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            success: false,
            message: "Invalid email or Password"
          }));

        case 6:
          _context3.next = 8;
          return regeneratorRuntime.awrap((0, _bcrypt.compare)(password, user.password));

        case 8:
          isPasswordMatch = _context3.sent;

          if (isPasswordMatch) {
            _context3.next = 11;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            success: false,
            message: "Invalid email or Password"
          }));

        case 11:
          token = _jsonwebtoken["default"].sign({
            userId: user._id
          }, 'your-secret-key', {
            expiresIn: '1h'
          });
          return _context3.abrupt("return", res.status(200).cookie("test-token", token, {
            maxAge: 1000 * 60 * 60 * 24,
            // to the token after sometime
            httpOnly: true
          }).json({
            success: true,
            message: "User loggedIn Successfully",
            user: user,
            token: token
          }));

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  });
}; //----------------------------GetUserProfile-------------------//


exports.login = login;

var profile = function profile(req, res) {
  var user;
  return regeneratorRuntime.async(function profile$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          console.log(req); // const userId = req.params.id;
          // const user = await User.findById(userId);

          _context4.next = 3;
          return regeneratorRuntime.awrap(_user.User.findById(req.user));

        case 3:
          user = _context4.sent;
          return _context4.abrupt("return", res.status(200).json({
            success: false,
            message: "Get Profile Successfully",
            user: user
          }));

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
}; //----------------------------DeleteUser Api-------------------//


exports.profile = profile;

var deleteUser = function deleteUser(req, res) {
  var userId, user;
  return regeneratorRuntime.async(function deleteUser$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          userId = req.params.id;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_user.User.findByIdAndDelete(userId));

        case 3:
          user = _context5.sent;

          if (user) {
            _context5.next = 6;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            message: "User not found"
          }));

        case 6:
          res.status(200).json({
            message: "User deleted successfully",
            user: user
          });

        case 7:
        case "end":
          return _context5.stop();
      }
    }
  });
}; //----------------------------EditUser Api-------------------//


exports.deleteUser = deleteUser;

var updateEditUser = function updateEditUser(req, res) {
  var userId, bodyData, user;
  return regeneratorRuntime.async(function updateEditUser$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          userId = req.params.id;
          bodyData = req.body;
          _context6.next = 4;
          return regeneratorRuntime.awrap(_user.User.findById(userId));

        case 4:
          user = _context6.sent;
          if (bodyData.name) user.name = bodyData.name;
          if (bodyData.email) user.email = bodyData.email;
          if (bodyData.phone) user.phone = bodyData.phone;
          _context6.next = 10;
          return regeneratorRuntime.awrap(user.save());

        case 10:
          res.status(201).json({
            success: true,
            message: "User Updated successfully",
            user: user
          });

        case 11:
        case "end":
          return _context6.stop();
      }
    }
  });
}; //-------------------------------logout------------------------------// 


exports.updateEditUser = updateEditUser;

var logout = function logout(req, res) {
  return regeneratorRuntime.async(function logout$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(res.clearCookie("test-token"));

        case 2:
          return _context7.abrupt("return", res.status(200).json({
            success: true,
            message: "User Logout Successfull"
          }));

        case 3:
        case "end":
          return _context7.stop();
      }
    }
  });
}; //-------------------------------Upload------------------------------// 


exports.logout = logout;

var uploadSingleFile = function uploadSingleFile(req, res) {
  var fileDetails;
  return regeneratorRuntime.async(function uploadSingleFile$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          console.log(req.file, "==========");
          _context8.prev = 1;

          if (req.file) {
            _context8.next = 4;
            break;
          }

          return _context8.abrupt("return", res.status(400).send("No file uploaded"));

        case 4:
          fileDetails = new _user.File({
            originalName: req.file.originalname,
            fileName: req.file.filename,
            filePath: req.file.path,
            size: req.file.size,
            mimeType: req.file.mimetype
          });
          _context8.next = 7;
          return regeneratorRuntime.awrap(fileDetails.save());

        case 7:
          res.status(201).send({
            message: "File uploaded successfully",
            file: fileDetails
          });
          _context8.next = 14;
          break;

        case 10:
          _context8.prev = 10;
          _context8.t0 = _context8["catch"](1);
          console.error("Error uploading file:", _context8.t0);
          res.status(500).send("An error occurred while uploading the file");

        case 14:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[1, 10]]);
}; //-------------------------------GetUploaded file------------------------------//


exports.uploadSingleFile = uploadSingleFile;
//# sourceMappingURL=user.dev.js.map
