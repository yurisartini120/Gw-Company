document.addEventListener("DOMContentLoaded", () => {
  const estilos = [
    "Minimalista", "Profissional", "Animado", "Moderno", "Simples",
    "Elegante", "Colorido", "Luxuoso", "Retrô", "Cinemático"
  ];

  const container = document.getElementById("estilosContainer");
  const previewGrid = document.getElementById("previewGrid");
  const avancarBtn = document.getElementById("avancarBtn");

  const userName = document.getElementById("userName");
  const userCredits = document.getElementById("userCredits");
  const logoutBtn = document.getElementById("logoutBtn");

  // === Usuário logado ===
  const user = JSON.parse(localStorage.getItem("usuarioLogado")) || { nome: "Visitante", creditos: 0, plano: "Free" };
  userName.textContent = `Olá, ${user.nome}`;
  userCredits.textContent = `Créditos: ${user.creditos}`;

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "index.html";
  });

  // === Limite por plano ===
  const limitePorPlano = {
    Free: 1,
    Basic: 2,
    Premium: 3,
    Plus: 999
  };
  const limite = limitePorPlano[user.plano] || 1;

  let selecionados = [];
  let tipografia = null;

  // === Cria botões ===
  estilos.forEach(estilo => {
    const btn = document.createElement("button");
    btn.textContent = estilo;
    btn.className = "estilo-btn";
    btn.addEventListener("click", () => {
      if (selecionados.includes(estilo)) {
        selecionados = selecionados.filter(e => e !== estilo);
        btn.classList.remove("active");
      } else {
        if (selecionados.length >= limite) {
          alert(`Seu plano permite apenas ${limite} estilo(s).`);
          return;
        }
        selecionados.push(estilo);
        btn.classList.add("active");
      }
      atualizarPreview();
    });
    container.appendChild(btn);
  });

  // === Fontes ===
  document.querySelectorAll(".fonte-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".fonte-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      tipografia = btn.dataset.font;
    });
  });

  // === Atualizar preview ===
  function atualizarPreview() {
    previewGrid.innerHTML = "";
    if (selecionados.length === 0) {
      previewGrid.innerHTML = "<p>Nenhum estilo selecionado ainda.</p>";
      return;
    }

    selecionados.forEach(estilo => {
      const img = document.createElement("img");
      img.src = `assets/img/previews/style-${estilo.toLowerCase().replace(" ", "")}.png`;
      img.alt = estilo;
      previewGrid.appendChild(img);
    });
  }

  // === Avançar ===
  avancarBtn.addEventListener("click", () => {
    if (selecionados.length === 0) {
      alert("Selecione ao menos um estilo.");
      return;
    }

    localStorage.setItem("estilosSelecionados", JSON.stringify(selecionados));
    localStorage.setItem("tipografiaSelecionada", tipografia);
    window.location.href = "cores.html";
  });
});
