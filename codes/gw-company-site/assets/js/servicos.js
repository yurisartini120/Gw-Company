// 🔒 Verifica login
const user = JSON.parse(localStorage.getItem("usuarioLogado"));
if (!user) {
  alert("Você precisa estar logado para acessar esta página!");
  window.location.href = "cadastro.html";
}

// 👋 Exibe nome do usuário
document.getElementById("nomeUsuario").textContent = user.nome.split(" ")[0];

// 🚪 Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("usuarioLogado");
  alert("Você saiu da sua conta.");
  window.location.href = "index.html";
});
