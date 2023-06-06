const { Router } = require("express");
const {
  addUser,
  getUsers,
  getUserbyId,
  updateUser,
  loginUser,
  deleteUser,
} = require("../controllers/user.controller");

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserbyId);
router.post("/", addUser);
router.post("/login", loginUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
