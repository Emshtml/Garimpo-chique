export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ erro: "Método não permitido" });
  }

  const { usuario, senha } = req.body;

  // 🔒 credenciais fixas (você pode mudar)
  const ADMIN_USER = "admin";
  const ADMIN_PASS = "garimpo2025";

  if (usuario === ADMIN_USER && senha === ADMIN_PASS) {
    return res.status(200).json({ sucesso: true, token: "acesso-liberado" });
  }

  return res.status(401).json({ sucesso: false, erro: "Credenciais inválidas" });
}
