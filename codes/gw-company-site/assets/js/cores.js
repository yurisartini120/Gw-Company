document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("usuarioLogado")) || { nome: "Visitante", creditos: 0 };
  document.getElementById("userName").textContent = `Olá, ${user.nome}`;
  document.getElementById("userCredits").textContent = `Créditos: ${user.creditos}`;

  const logoutBtn = document.getElementById("logoutBtn");
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "index.html";
  });

  const paletas = [
    { nome: "Moderno", cores: ["#7038ff", "#a46cff", "#00bfff"] },
    { nome: "Minimalista", cores: ["#ffffff", "#cccccc", "#000000"] },
    { nome: "Vibrante", cores: ["#ff006e", "#ffbe0b", "#8338ec"] },
    { nome: "Elegante", cores: ["#2b2d42", "#8d99ae", "#edf2f4"] },
    { nome: "Retrô", cores: ["#fcbf49", "#f77f00", "#003049"] },
  ];

  const container = document.getElementById("paletasContainer");
  const previewGrid = document.getElementById("previewGrid");

  let paletaSelecionada = null;

  // Gerar paletas prontas
  paletas.forEach((p, index) => {
    const div = document.createElement("div");
    div.className = "paleta";
    div.innerHTML = `
      <h4>${p.nome}</h4>
      <div class="paleta-cores">
        ${p.cores.map(c => `<div class="cor" style="background:${c}"></div>`).join("")}
      </div>
    `;
    div.addEventListener("click", () => {
      document.querySelectorAll(".paleta").forEach(el => el.classList.remove("active"));
      div.classList.add("active");
      paletaSelecionada = p.cores;
      atualizarPreview();
    });
    container.appendChild(div);
  });

  // Paleta personalizada
  document.getElementById("btnAplicarPersonalizada").addEventListener("click", () => {
    const cor1 = document.getElementById("cor1").value;
    const cor2 = document.getElementById("cor2").value;
    const cor3 = document.getElementById("cor3").value;
    paletaSelecionada = [cor1, cor2, cor3];
    atualizarPreview();
  });

  function atualizarPreview() {
    previewGrid.innerHTML = "";
    if (!paletaSelecionada) {
      previewGrid.innerHTML = "<p>Nenhuma paleta selecionada.</p>";
      return;
    }
    paletaSelecionada.forEach(cor => {
      const bloco = document.createElement("div");
      bloco.className = "preview-block";
      bloco.style.background = cor;
      previewGrid.appendChild(bloco);
    });
  }

  // Avançar
  document.getElementById("avancarBtn").addEventListener("click", () => {
    if (!paletaSelecionada) {
      alert("Selecione ou crie uma paleta antes de avançar.");
      return;
    }
    localStorage.setItem("paletaSelecionada", JSON.stringify(paletaSelecionada));
    window.location.href = "confirmacao.html";
  });
});
