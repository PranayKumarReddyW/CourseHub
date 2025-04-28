const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { userName, userEmail, password, role } = req.body;
  const userExists = await User.findOne({ $or: [{ userEmail }, { userName }] });
  if (userExists) {
    return res.status(400).json({
      success: false,
      message: "User name  or user email already exists",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    userName,
    userEmail,
    password: hashedPassword,
    role,
  });

  await user.save();

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
  });
};

const loginUser = async (req, res) => {
  const { userEmail, password } = req.body;
  const userExists =
    (await User.findOne({ userEmail })) ||
    bcrypt.compare(password, userExists.password);
  if (!userExists) {
    return res.status(400).json({
      success: false,
      message: "Invalid credentials",
    });
  }
  const token = jwt.sign(
    {
      userId: userExists._id,
      userName: userExists.userName,
      userEmail: userExists.userEmail,
      role: userExists.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return res.status(200).json({
    success: true,
    message: "User logged in successfully",
    accessToken: token,
    data: {
      userName: userExists.userName,
      userEmail: userExists.userEmail,
      role: userExists.role,
    },
  });
};
module.exports = { registerUser, loginUser };
