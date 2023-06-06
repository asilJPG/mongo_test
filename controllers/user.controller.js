const { errorHandler } = require("../helpers/error_handler");
const User = require("../models/user");

const addUser = async (req, res) => {
  try {
    //adduser
    const { name, email, password } = req.body;
    if (name == "" || email == "" || password == "") {
      return res
        .status(400)
        .send({ messege: "Ma`lumotlarini tolik koiriting" });
    }
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).send({ messege: "Bunday email mavjud" });
    }
    const newUser = await User({
      name: name,
      email: email,
      password: password,
    });
    await newUser.save();
    res.status(200).send({ messege: "Foydalanuvchi koshildi " });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getUsers = async (req, res) => {
  try {
    //getusers
    const users = await User.find({});
    if (!users) {
      res.status(400).send({ messege: "Users not found" });
    }
    res.json({ users });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getUserbyId = async (req, res) => {
  try {
    //getUserbyId
    // const userId = req.params.id;
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      res.status(400).send({ messege: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    errorHandler(res, error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user || user.password !== password) {
      res.status(400).send({ message: "Invalid email or password" });
    } else {
      res.status(200).send({ message: "Welcome!" });
    }
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateUser = async (req, res) => {
  try {
    //гзвфеуUser
    // const userId = req.params.id;
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      res.status(400).send({ messege: "User not found" });
    }
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    await user.save();
    res.status(200).send({ messege: "User succesffully updaated" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete({ _id: req.params.id });
    if (!user) {
      res.status(400).send({ messege: "User is not found" });
    } else {
      res.status(200).send({ messege: "User successfully deleted" });
    }
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addUser,
  getUserbyId,
  getUsers,
  loginUser,
  updateUser,
  deleteUser,
};
