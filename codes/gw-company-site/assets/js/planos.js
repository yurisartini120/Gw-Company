const user = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!user) {
  alert("Você precisa estar logado para acessar esta página!");
  window.location.href = "cadastro.html";
}

// Planos e descrições
const planos = {
  Free: "Você tem 2 créditos por mês para usar gratuitamente.",
  Basic: "Tenha 20 créditos/mês e suporte padrão.",
  Premium: "Aproveite 50 créditos/mês, suporte prioritário e benefícios exclusivos.",
  Plus: "Acesso ilimitado, suporte VIP e recursos avançados da plataforma."
};

// Atualiza exibição
document.getElementById("planoNome").textContent = user.plano || "Free";
document.getElementById("creditosAtuais").textContent = user.creditos || 2;
document.getElementById("planoDescricao").textContent = planos[user.plano || "Free"];

// Simula verificação de pagamento
const statusPagamento = document.getElementById("statusPagamento");
if (user.pagamentoConfirmado) {
  statusPagamento.textContent = "Pagamento confirmado ✅";
  statusPagamento.style.color = "#3cff8a";
} else {
  statusPagamento.textContent = "Pendente ❌";
  statusPagamento.style.color = "#ff5e5e";
}

// Histórico
const historico = JSON.parse(localStorage.getItem("historicoPlanos")) || [];
const tabela = document.getElementById("historicoTabela");
tabela.innerHTML = "";

if (historico.length === 0) {
  tabela.innerHTML = `<tr><td colspan="3">Nenhum histórico encontrado.</td></tr>`;
} else {
  historico.forEach(reg => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${reg.plano}</td>
      <td>${reg.data}</td>
      <td>${reg.status}</td>
    `;
    tabela.appendChild(tr);
  });
}

// Upgrade → checkout
document.getElementById("btnUpgrade").addEventListener("click", () => {
  window.location.href = "checkout.html";
});

// Downgrade → Free
document.getElementById("btnDowngrade").addEventListener("click", () => {
  if (user.plano === "Free") {
    alert("Você já está no plano Free!");
    return;
  }

  const confirmar = confirm("Tem certeza que deseja fazer downgrade para o plano Free?");
  if (confirmar) {
    user.plano = "Free";
    user.creditos = 2;
    user.pagamentoConfirmado = false;
    localStorage.setItem("usuarioLogado", JSON.stringify(user));

    historico.push({
      plano: "Free",
      data: new Date().toLocaleDateString("pt-BR"),
      status: "Downgrade realizado"
    });
    localStorage.setItem("historicoPlanos", JSON.stringify(historico));

    alert("Downgrade realizado com sucesso!");
    window.location.reload();
  }
});
