import bcrypt from "bcryptjs";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "30d",
    }
  );
};

export const register = async (req, res) => {
  try {
    const { name, email, password, adminInviteToken } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    let role = "user";
    if (
      adminInviteToken &&
      adminInviteToken === process.env.ADMIN_INVITE_TOKEN
    ) {
      role = "admin";
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = generateToken(user);

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      })
      .status(201)
      .json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user);
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      })
      .status(200)
      .json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(req.user._id).select("-password");
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Cập nhật các trường nếu có trong req.body
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    user.address = req.body.address || user.address;

    // Chỉ admin mới được cập nhật role
    if (req.user.role === 'admin' && req.body.role) {
      user.role = req.body.role;
    }

    // Cập nhật password nếu có
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber,
      address: updatedUser.address,
      role: updatedUser.role,
      isAdmin: updatedUser.role === 'admin',
      token: generateToken(updatedUser._id),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if(!email) return res.status(400).json({message: "Please provide your email"})

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


