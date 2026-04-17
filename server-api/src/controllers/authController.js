const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// const db = require("../config/db"); // Di uncomment jika tabel sudah jalan

const JWT_SECRET = process.env.JWT_SECRET || "SUPER_SECRET_KEY";

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // TODO: Gunakan query DB yang sebenarnya
    // const result = await db.query("SELECT * FROM users WHERE username = $1", [username]);
    // const user = result.rows[0];

    // Dummy user untuk contoh
    const dummyAdmin = {
      id: "uuid-1234",
      username: "admin",
      password_hash: await bcrypt.hash("admin123", 10),
      role: "admin",
    };

    if (username !== dummyAdmin.username) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, dummyAdmin.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: dummyAdmin.id, role: dummyAdmin.role },
      JWT_SECRET,
      { expiresIn: "12h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: { id: dummyAdmin.id, username: dummyAdmin.username, role: dummyAdmin.role }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
