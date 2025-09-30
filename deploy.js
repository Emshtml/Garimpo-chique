const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// === CONFIGURAÇÕES ===
const frontendDir = path.join(__dirname, "frontend");
const publicDir = path.join(__dirname, "public");
const commitMessage = "🚀 Deploy automático: atualiza frontend e backend";

// === FUNÇÃO: copiar pasta recursivamente ===
function copyFolderSync(from, to) {
  if (!fs.existsSync(to)) fs.mkdirSync(to, { recursive: true });

  fs.readdirSync(from).forEach((element) => {
    const fromPath = path.join(from, element);
    const toPath = path.join(to, element);
    const stat = fs.lstatSync(fromPath);

    if (stat.isFile()) {
      fs.copyFileSync(fromPath, toPath);
    } else if (stat.isDirectory()) {
      copyFolderSync(fromPath, toPath);
    }
  });
}

// === ETAPA 1: Copiar frontend para public ===
if (fs.existsSync(frontendDir)) {
  if (fs.existsSync(publicDir)) {
    fs.rmSync(publicDir, { recursive: true, force: true });
  }
  copyFolderSync(frontendDir, publicDir);
  console.log("✅ Frontend copiado para public/ com sucesso!");
} else {
  console.log("⚠️ Pasta 'frontend/' não encontrada!");
  process.exit(1);
}

// === ETAPA 2: Commit e push no Git ===
try {
  console.log("📦 Preparando commit...");

  execSync("git add .", { stdio: "inherit" });
  execSync(`git commit -m "${commitMessage}"`, { stdio: "inherit" });
  execSync("git push origin main", { stdio: "inherit" });

  console.log("\n✅ Deploy enviado com sucesso para o GitHub!");
  console.log("🌐 A Vercel vai iniciar a build automaticamente em alguns minutos...");
} catch (err) {
  console.log("\n⚠️ Nenhuma alteração nova para commit ou erro no Git.");
  console.log("ℹ️ Verifique se há mudanças e se o repositório tem permissão de push.");
}
