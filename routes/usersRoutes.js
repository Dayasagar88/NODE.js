const userContainer = require("../controller/users");
const express = require("express");
const router = express.Router();


router
  .post("/", userContainer.createUsers)
  .get("/", userContainer.getAllUsers)
  .get("/:id", userContainer.getUserById)
  .put("/:id", userContainer.replaceUser)
  .patch("/:id", userContainer.updateUser)
  .delete("/:id", userContainer.deleteUser);

module.exports = router;  