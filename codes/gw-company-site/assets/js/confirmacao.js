document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("usuarioLogado")) || { nome: "Visitante", creditos: 2, plano: "Free", projetos: [] };

  // Preenche resumo
  document.getElementById("servicoEscolhido").textContent = localStorage.getItem("servicoSelecionado") || "—";
  document.getElementById("estiloEscolhido").textContent = (JSON.parse(localStorage.getItem("estilosSelecionados")) || []).join(", ") || "—";
  document.getElementById("tipografiaEscolhida").textContent = localStorage.getItem("tipografiaSelecionada") || "—";

  // Exibe cores com círculos
  const coresContainer = document.getElementById("coresEscolhidas");
  const coresSelecionadas = JSON.parse(localStorage.getItem("paletaSelecionada")) || [];

  if (coresSelecionadas.length > 0) {
    coresContainer.innerHTML = "";
    coresSelecionadas.forEach(cor => {
      const corDiv = document.createElement("span");
      corDiv.classList.add("cor-visual");
      corDiv.style.backgroundColor = cor;
      corDiv.title = cor;
      coresContainer.appendChild(corDiv);
    });
  } else {
    coresContainer.textContent = "—";
  }

  // Botão voltar
  document.getElementById("btnVoltar").addEventListener("click", () => {
    window.location.href = "cores.html";
  });

  // Botão confirmar
  document.getElementById("btnConfirmar").addEventListener("click", () => {
    if (user.creditos <= 0) {
      alert("Você não tem créditos suficientes para confirmar a criação.");
      return;
    }

    // Atualiza créditos
    user.creditos -= 1;

    // Cria novo projeto
    const novoProjeto = {
      nome: `${localStorage.getItem("servicoSelecionado") || "Projeto"} — ${new Date().toLocaleDateString()}`,
      status: "Em andamento",
      estilos: JSON.parse(localStorage.getItem("estilosSelecionados")) || [],
      cores: coresSelecionadas,
    };

    user.projetos = user.projetos || [];
    user.projetos.push(novoProjeto);

    localStorage.setItem("usuarioLogado", JSON.stringify(user));

    // Mostra animação
    const overlay = document.getElementById("overlayConfirmacao");
    overlay.style.display = "flex";

    setTimeout(() => {
      overlay.style.display = "none";
      window.location.href = "painel.html";
    }, 2500);
  });
});
