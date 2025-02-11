const user = require("../model/auth.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, phone, email, password } = req.body;
  try {
    const userExist = await user.findOne({ email });
    if (userExist) {
      res.status(400).json({ message: "User already exist" });
      return;
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const userObj = new user({ name, phone, email, password: hashPassword });
    await userObj.save();
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExist = await user.findOne({ email });
    if (!userExist) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    const isMatch = await bcrypt.compare(password, userExist.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
