const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const UserService = require("../user/user.service.js");

class UserController {
  createUser = catchError(async (req, res) => {
    const user = await UserService.createUser(req.body);
    res.status(201).json(responseHandler(201, "User created successfully", user));
  });

  getAllUsers = catchError(async (req, res) => {
    const users = await UserService.getAllUsers({});
    res.status(200).json(responseHandler(200, "Users fetched successfully", users));
  });

  getUserById = catchError(async (req, res) => {
    const user = await UserService.getUserById(req.params.id);
    res.status(200).json(responseHandler(200, "User fetched successfully", user));
  });

  updateUser = catchError(async (req, res) => {
    const updatedUser = await UserService.updateUser(req.params.id, req.body);
    res.status(200).json(responseHandler(200, "User updated successfully", updatedUser));
  });

  deleteUser = catchError(async (req, res) => {
    const deletedUser = await UserService.deleteUser(req.params.id);
    res.status(200).json(responseHandler(200, "User deleted successfully", deletedUser));
  });
}

module.exports = new UserController();
