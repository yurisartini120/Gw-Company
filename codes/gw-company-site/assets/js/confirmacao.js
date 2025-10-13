document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("usuarioLogado")) || { nome: "Visitante", creditos: 0, plano: "Free", projetos: [] };

  // Preenche resumo
  document.getElementById("servicoEscolhido").textContent = localStorage.getItem("servicoSelecionado") || "—";
  document.getElementById("estiloEscolhido").textContent = (JSON.parse(localStorage.getItem("estilosSelecionados")) || []).join(", ") || "—";
  document.getElementById("tipografiaEscolhida").textContent = localStorage.getItem("tipografiaSelecionada") || "—";
  document.getElementById("coresEscolhidas").textContent = (JSON.parse(localStorage.getItem("paletaSelecionada")) || []).join(", ") || "—";

  document.getElementById("btnVoltar").addEventListener("click", () => {
    window.location.href = "cores.html";
  });

  document.getElementById("btnConfirmar").addEventListener("click", () => {
    if (user.creditos <= 0) {
      alert("Você não tem créditos suficientes para confirmar a criação.");
      return;
    }

    // Atualiza créditos
    user.creditos -= 1;

    // Criação salva
    const novoProjeto = {
      nome: `${localStorage.getItem("servicoSelecionado") || "Projeto"} — ${new Date().toLocaleDateString()}`,
      status: "Em andamento",
      estilos: JSON.parse(localStorage.getItem("estilosSelecionados")),
      cores: JSON.parse(localStorage.getItem("paletaSelecionada")),
    };
    user.projetos = user.projetos || [];
    user.projetos.push(novoProjeto);

    localStorage.setItem("usuarioLogado", JSON.stringify(user));

    // Mostra animação
    const overlay = document.getElementById("overlayConfirmacao");
    overlay.style.display = "flex";

    setTimeout(() => {
      overlay.style.display = "none";
      alert("Criação confirmada com sucesso! 🎉");
      window.location.href = "painel.html";
    }, 2500);
  });
});
