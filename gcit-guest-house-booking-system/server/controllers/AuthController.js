const bcrypt = require("bcryptjs");
const User = require('../models/Users');
const jwt = require("jsonwebtoken");
// console.log("User model:", User);
// console.log("User.findOne:", User.findOne);
// console.log("Type of findOne:", typeof User.findOne);


// PBI 1 — POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;


    // Validate required fields and unique email (sub-task)
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email and password are required." });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters." });
    }


    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }


    // Hash the password with bcrypt before saving (sub-task)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: "guest",
    });


    return res.status(201).json({
      message: "Registration successful.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Register Error:", err);
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
};


// PBI 2 — POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;


    const user = await User.findOne({ where: { email } });


    if (!user) {
      return res.status(400).send("User not found");
    }


    const isPasswordMatch = await bcrypt.compare(password, user.password);


    if (!isPasswordMatch) {
      return res.status(400).send("Wrong password");
    }


    // Generate a token and send it as a response to the client
    //console.log('JWT_SECRET:', process.env.JWT_SECRET);
    let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (err) {
    console.error("Login error", err);
    return res.status(500).send("Internal server error");
  }
};
