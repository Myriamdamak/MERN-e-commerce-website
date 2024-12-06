const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const User = require('../models/Users');

const signIn = async (req, res) => {
  const user = req.body;
  try {
    const foundUser = await User.findOne({ email: user.email });
    if (foundUser) {
      bcrypt.compare(user.password, foundUser.password, (err, isMatch) => {
        if (err) {
          return res.status(500).json({ msg: "Error while comparing password" });
        }

        if (isMatch) {
          
          const token = jwt.sign(
            { id: foundUser._id, role: foundUser.role },
            process.env.JWT_SECRET.trim()
          );
          
          res.status(200).json({ user: foundUser, token: token });
        } else {
         
          res.status(400).json({ msg: "Wrong password" });
        }
      });
    } else {
     
      return res.status(400).json({ msg: "User not registered" });
    }
  } catch (error) {
   
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};



module.exports = { signIn};
