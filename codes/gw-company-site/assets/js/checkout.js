const user = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!user) {
  alert("Você precisa estar logado para escolher um plano!");
  window.location.href = "cadastro.html";
}

document.querySelectorAll(".plano-card button").forEach(btn => {
  const plano = btn.dataset.plano;

  // marca plano atual
  if (plano === user.plano) {
    btn.textContent = "Plano atual";
    btn.disabled = true;
    btn.style.background = "rgba(255,255,255,0.2)";
  }

  // clique
  btn.addEventListener("click", () => {
    if (plano === user.plano) return;

    const confirmar = confirm(`Deseja mudar seu plano para ${plano}?`);
    if (!confirmar) return;

    // simula pagamento
    const pago = confirm(`O pagamento do plano ${plano} foi confirmado?`);
    if (pago) {
      user.pagamentoConfirmado = true;
      switch (plano) {
        case "Basic": user.creditos = 20; break;
        case "Premium": user.creditos = 50; break;
        case "Plus": user.creditos = "∞"; break;
      }
    } else {
      user.pagamentoConfirmado = false;
      user.creditos = 0;
    }

    user.plano = plano;
    localStorage.setItem("usuarioLogado", JSON.stringify(user));

    const historico = JSON.parse(localStorage.getItem("historicoPlanos")) || [];
    historico.push({
      plano,
      data: new Date().toLocaleDateString("pt-BR"),
      status: pago ? "Pagamento confirmado" : "Pendente"
    });
    localStorage.setItem("historicoPlanos", JSON.stringify(historico));

    alert(`Plano ${plano} atualizado!`);
    window.location.href = "planos.html";
  });
});
