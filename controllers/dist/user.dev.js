"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateEditUser = exports.deleteUser = exports.profile = exports.login = exports.register = void 0;

var _user = require("../models/user.js");

var _bcrypt = require("bcrypt");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var register = function register(req, res) {
  var _req$body, name, email, phone, password, bcryptPassword;

  return regeneratorRuntime.async(function register$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, email = _req$body.email, phone = _req$body.phone, password = _req$body.password;

          if (!(!email || !phone || !password || !name)) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            success: false,
            message: "ALL field are required "
          }));

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap((0, _bcrypt.hash)(password, 10));

        case 5:
          bcryptPassword = _context.sent;
          _context.next = 8;
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
          return _context.stop();
      }
    }
  });
};

exports.register = register;

var login = function login(req, res) {
  var _req$body2, email, password, user, isPasswordMatch, token;

  return regeneratorRuntime.async(function login$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_user.User.findOne({
            email: email
          }).select("+password"));

        case 3:
          user = _context2.sent;

          if (user) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            success: false,
            message: "Invalid email or Password"
          }));

        case 6:
          _context2.next = 8;
          return regeneratorRuntime.awrap((0, _bcrypt.compare)(password, user.password));

        case 8:
          isPasswordMatch = _context2.sent;

          if (isPasswordMatch) {
            _context2.next = 11;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            success: false,
            message: "Invalid email or Password"
          }));

        case 11:
          token = _jsonwebtoken["default"].sign({
            userId: user._id
          }, 'your-secret-key', {
            expiresIn: '1h'
          });
          return _context2.abrupt("return", res.status(200).cookie("test-token", token, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true
          }).json({
            success: true,
            message: "User loggedIn Successfully",
            user: user,
            token: token
          }));

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.login = login;

var profile = function profile(req, res) {
  var user;
  return regeneratorRuntime.async(function profile$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(_user.User.findById(req.user));

        case 2:
          user = _context3.sent;
          return _context3.abrupt("return", res.status(200).json({
            success: false,
            message: "Get Profile Successfully",
            user: user
          }));

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.profile = profile;

var deleteUser = function deleteUser(req, res) {
  var userId, user;
  return regeneratorRuntime.async(function deleteUser$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          userId = req.params.id;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_user.User.findByIdAndDelete(userId));

        case 3:
          user = _context4.sent;

          if (user) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: "User not found"
          }));

        case 6:
          res.status(200).json({
            message: "User deleted successfully",
            user: user
          });

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.deleteUser = deleteUser;

var updateEditUser = function updateEditUser(req, res) {
  var userId, bodyData, user;
  return regeneratorRuntime.async(function updateEditUser$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          userId = req.params.id;
          bodyData = req.body;
          _context5.next = 4;
          return regeneratorRuntime.awrap(_user.User.findById(userId));

        case 4:
          user = _context5.sent;
          if (bodyData.name) user.name = bodyData.name;
          if (bodyData.email) user.email = bodyData.email;
          if (bodyData.phone) user.phone = bodyData.phone;
          _context5.next = 10;
          return regeneratorRuntime.awrap(user.save());

        case 10:
          res.status(201).json({
            success: true,
            message: "User Updated successfully",
            user: user
          });

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.updateEditUser = updateEditUser;
//# sourceMappingURL=user.dev.js.map
