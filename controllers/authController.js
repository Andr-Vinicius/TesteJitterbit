const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const usersMock = [
  {
    id: 1,
    username: "admin",
    password: bcrypt.hashSync("admin123", 10) // Hash da senha
  }
];

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = usersMock.find(u => u.username === username);
    if (!user) return res.status(401).json({ message: "Usuário ou senha inválidos!" });
    
    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) return res.status(401).json({ message: "Usuário ou senha inválidos!" });
    
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({ token });

  } catch (error) {
    return res.status(500).json({ message: "Erro no login" });
  }
};