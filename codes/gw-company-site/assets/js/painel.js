const user = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!user) {
  alert("Você precisa estar logado para acessar o painel!");
  window.location.href = "cadastro.html";
}

// Nome do usuário
document.getElementById("nomeUsuario").textContent = user.nome.split(" ")[0];

// Dados básicos
document.getElementById("projetosCount").textContent = user.projetos?.length || 2;
document.getElementById("creditosUser").textContent = user.creditos || 2;
document.getElementById("ultimoAcesso").textContent = new Date().toLocaleDateString("pt-BR");

// Plano atual
const planoNome = user.plano || "Free";
document.getElementById("planoNome").textContent = planoNome;

const planos = {
  Free: "Você tem 2 créditos por mês para usar gratuitamente.",
  Plus: "Aproveite 10 créditos/mês, suporte prioritário e acesso antecipado a novas funções.",
  Pro: "Acesso ilimitado, IA avançada e personalização completa dos seus projetos."
};
document.getElementById("planoDescricao").textContent = planos[planoNome];

// Botão do plano
const upgradeBtn = document.getElementById("upgradeBtn");
if (planoNome !== "Free") upgradeBtn.textContent = "Gerenciar plano";
upgradeBtn.addEventListener("click", () => {
  if (planoNome === "Free") {
    window.location.href = "checkout.html";
  } else {
    window.location.href = "planos.html";
  }
});

// Projetos recentes
const listaProjetos = document.getElementById("listaProjetos");
const projetos = user.projetos || [
  { nome: "Campanha Reels Outubro", status: "Concluído" },
  { nome: "Identidade Visual Loja Fit", status: "Em andamento" },
];
projetos.forEach(p => {
  const el = document.createElement("div");
  el.classList.add("projeto");
  el.innerHTML = `<h3>${p.nome}</h3><p>Status: ${p.status}</p>`;
  listaProjetos.appendChild(el);
});

// Serviços rápidos
document.querySelectorAll(".servico").forEach(servico => {
  servico.addEventListener("click", () => {
    const link = servico.getAttribute("data-link");
    window.location.href = link;
  });
});

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("usuarioLogado");
  alert("Você saiu da sua conta.");
  window.location.href = "index.html";
});
