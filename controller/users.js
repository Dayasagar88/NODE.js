// const express = require("express");
// const fs = require("fs");
// const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
// const users = data.users;
const userModel = require("../models/userModel");
const User = userModel.User;

//POST
exports.createUsers = async (req, res) => {
  try {
    const user = new User(req.body);
    await user
      .save()
      .then((user) =>
        res.status(200).json({ message: "Data saved", user: user })
      );
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Internal server error", err:err });
  }
};


//GET
exports.getAllUsers = (req, res) => {
  res.status(200).json(users);
};
//GET
exports.getUserById = (req, res) => {
  const id = +req.params.id;
  res.status(200).json(users[id - 1]);
};
//PUT
exports.replaceUser = (req, res) => {
  const id = +req.params.id;
  const userIndex = users.findIndex((u) => u.id === id);
  users.splice(userIndex, 1, { id: id, ...req.body });
  res.status(202).json({ message: "User updated" });
};
//PATCH
exports.updateUser = (req, res) => {
  const id = +req.params.id;
  const userIndex = users.findIndex((u) => u.id === id);
  const user = users[userIndex];
  users.splice(userIndex, 1, { ...user, ...req.body });
  res.status(200).json({ message: "User upadted (PATCH)" });
};
//DELETE
exports.deleteUser = (req, res) => {
  const id = +req.params.id;
  const userIndex = users.findIndex((u) => u.id === id);
  users.splice(userIndex, 1);
  res.status(200).json({ message: "User deleted" });
};
