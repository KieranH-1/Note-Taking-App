const express = require("express");
const User = require("../models/user");
const router = express.Router();

router
  .get("/getUsers", async (req, res) => {
    try {
      const users = await User.getAllUsers();
      res.send(users);
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  })
  .get("/login", async (req, res) => {
    try {
      const user = await User.login(req.body);
      res.send(user);
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  })
  .post("/register", async (req, res) => {
    try {
      const user = await User.register(req.body);
      res.send(user);
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  })
  .put("/updateUser", async (req, res) => {
    try {
      const user = await User.updateUser(req.body);
      res.send(user);
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  })
  .delete("/deleteUser", async (req, res) => {
    try {
      const user = await User.deleteUser(req.body);
      res.send({ success: `Bye Bye ${user} ` });
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  });

("http://localhost:3000/users/getUsers");

module.exports = router;
