const User = require("../models/Users.js");
const bcrypt = require("bcryptjs");

const getUsers = async (request, response) => {
  try {
    const users = await User.find();
    if (users && users.length > 0) {
      response.status(200).json({ users: users });
    } else {
      response.status(404).json({ msg: "No users found" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ msg: "Error on getting users" });
  }
};
const getOneUser = async (req, res) => {
  const id = req.params.id;
  try {
    const foundUser = await User.findById(id);
    if (foundUser) {
      res.status(200).json({ user: foundUser });
    } else {
      res.status(404).json({ msg: "No user found with the given ID" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error on retrieving the user" });
  }
};

const postUser = async (request, response) => {
  const user = request.body;
  try {
    const foundUser = await User.findOne({ email: user.email });
    if (foundUser) {
      response.status(400).json({ msg: "User already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const newUser = new User({
        ...user, 
        password: hashedPassword 
      });
      await newUser.save();
      response.status(200).json({ user: newUser, msg: "User successfully added" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ msg: "Error on adding user" });
  }
};



const putUser = async (req, res) => {
  const id = req.params.id;
  const user = req.body;

  try {
    const foundUser = await User.findById(id);
    if (!foundUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    if (user.password) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;  
    }
    if (user.role && user.role !== foundUser.role) {
      // You could include additional checks here to validate the role if needed
      foundUser.role = user.role;  // Update the role
    }
    await User.findByIdAndUpdate(id, user, { new: true });
    res.status(200).json({ msg: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error on updating user",error: error.message } );
  }
};


const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ msg: "delete done" });
  } catch (error) {
    res.status(500).json({ msg: "error on deleting user" });
  }
};
module.exports = { getUsers, postUser, putUser, deleteUser, getOneUser };
