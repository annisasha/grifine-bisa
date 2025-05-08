import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Pengguna sudah terdaftar" });

    const newUser = new User({ username, email, password});
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({ message: "Registrasi berhasil", user: newUser, token });
  } catch (err) {
    console.error("Error saat registrasi:", err);
    res.status(500).json({ message: "Terjadi kesalahan, coba lagi nanti" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Email belum terdaftar" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Password salah" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "Login berhasil",  token, username: user.username, });
  } catch (err) {
    console.error("Error saat login:", err);
    res.status(500).json({ message: "Terjadi kesalahan, coba lagi nanti" });
  }
};

