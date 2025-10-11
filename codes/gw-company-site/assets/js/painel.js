// 🔐 Verifica login
const user = JSON.parse(localStorage.getItem("usuarioLogado"));
if (!user) {
  alert("Você precisa estar logado para acessar o painel!");
  window.location.href = "cadastro.html";
}

// 👋 Nome do usuário
document.getElementById("nomeUsuario").textContent = user.nome.split(" ")[0];

// 🔢 Mock inicial
document.getElementById("projetosCount").textContent = Math.floor(Math.random() * 5) + 1;
document.getElementById("creditosUser").textContent = user.creditos || 2;
document.getElementById("ultimoAcesso").textContent = new Date().toLocaleDateString("pt-BR");

// ➕ Criar novo projeto → vai para tela de serviços
document.getElementById("criarProjetoBtn").addEventListener("click", () => {
  window.location.href = "servicos.html";
});

// 🚪 Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("usuarioLogado");
  alert("Você saiu da sua conta.");
  window.location.href = "index.html";
});
