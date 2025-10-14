// assets/js/painel.js
document.addEventListener("DOMContentLoaded", () => {
  // Carrega usuário (defensivo)
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("usuarioLogado"));
  } catch (e) {
    console.error("Erro ao ler usuarioLogado:", e);
  }

  if (!user) {
    // Não quebra se não houver usuário — direciona ao cadastro
    console.warn("Usuário não logado. Redirecionando para cadastro...");
    // Só redireciona se estivermos na página painel (evita loop em outras páginas)
    if (location.pathname.endsWith("painel.html") || location.pathname.includes("painel")) {
      alert("Você precisa estar logado para acessar o painel!");
      window.location.href = "cadastro.html";
      return;
    }
  }

  // Função auxiliar: getElement safe
  const $ = id => document.getElementById(id);

  // Atualiza textos do painel se elementos existir
  const nomeEl = $("nomeUsuario");
  if (nomeEl && user && user.nome) {
    nomeEl.textContent = user.nome.split(" ")[0];
  }

  const planoNome = (user && user.plano) ? user.plano : "Free";
  const planoNomeEl = $("planoNome");
  if (planoNomeEl) planoNomeEl.textContent = planoNome;

  const planoDescricaoEl = $("planoDescricao");
  const planosDesc = {
    Free: "Você tem 2 créditos por mês para usar gratuitamente.",
    Basic: "Tenha 20 créditos/mês e suporte padrão.",
    Premium: "Aproveite 50 créditos/mês, suporte prioritário e benefícios exclusivos.",
    Plus: "Acesso ilimitado, suporte VIP e recursos avançados da plataforma."
  };
  if (planoDescricaoEl) planoDescricaoEl.textContent = planosDesc[planoNome] || planosDesc.Free;

  // Créditos
  const creditosEl = $("creditosUser");
  if (creditosEl) {
    if (planoNome === "Plus") creditosEl.textContent = "∞ (Ilimitado)";
    else creditosEl.textContent = (user && typeof user.creditos !== "undefined") ? user.creditos : 2;
  }

  // Projetos count e renderização
  const projetosCountEl = $("projetosCount");
  const listaProjetosEl = $("listaProjetos");
  const ultimoAcessoEl = $("ultimoAcesso");
  const projetos = (user && Array.isArray(user.projetos)) ? user.projetos : [];

  if (projetosCountEl) projetosCountEl.textContent = projetos.length;
  if (ultimoAcessoEl) ultimoAcessoEl.textContent = new Date().toLocaleDateString("pt-BR");

  if (listaProjetosEl) {
    listaProjetosEl.innerHTML = "";
    if (projetos.length === 0) {
      listaProjetosEl.innerHTML = "<p>Nenhum projeto encontrado.</p>";
    } else {
      // Mostra os mais recentes primeiro
      projetos.slice().reverse().forEach(p => {
        const div = document.createElement("div");
        div.className = "projeto";
        // cria visual das cores caso existam
        const coresHTML = (p.cores || []).map(c => `<span class="cor-visual" style="background:${c};border:1px solid rgba(255,255,255,0.12);" title="${c}"></span>`).join("");
        div.innerHTML = `
          <h3>${escapeHtml(p.nome)}</h3>
          <p><strong>Status:</strong> ${escapeHtml(p.status || "—")}</p>
          <div class="cores-preview">${coresHTML}</div>
        `;
        listaProjetosEl.appendChild(div);
      });
    }
  }

  // Upgrade / Gerenciar plano
  const upgradeBtn = $("upgradeBtn");
  if (upgradeBtn) {
    upgradeBtn.textContent = planoNome === "Free" ? "Fazer upgrade" : "Gerenciar plano";
    upgradeBtn.addEventListener("click", () => {
      if (planoNome === "Free") window.location.href = "checkout.html";
      else window.location.href = "planos.html";
    });
  }

  // Logout
  const logoutBtn = $("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("usuarioLogado");
      alert("Você saiu da sua conta.");
      window.location.href = "index.html";
    });
  }

  // Serviços rápidos: delegação via container (se existir)
  document.querySelectorAll(".servico").forEach(serv => {
    // cada .servico tem data-link no HTML
    serv.addEventListener("click", () => {
      const link = serv.getAttribute("data-link");
      if (link) {
        window.location.href = link;
      }
    });
  });

  // Utility: safe escape
  function escapeHtml(str) {
    if (!str && str !== 0) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
});
