import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    req.userId = null;
    return next(); // Tamu tetap lanjut
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
  } catch (err) {
    req.userId = null; // Token invalid, tapi tetap lanjut
  }

  next(); // Lanjut ke controller apapun hasilnya
};

export default authMiddleware;
