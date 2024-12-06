const bcrypt = require("bcryptjs");
const users = [
  {
    userName: "Admin",
    email: "admin@node.com",
    password: bcrypt.hashSync("123456", 10),
    role:"admin",
  },

  {
    userName: "User",
    email: "user@node.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

module.exports = users;