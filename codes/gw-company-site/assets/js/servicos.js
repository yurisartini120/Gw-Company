// === Serviços e Créditos ===
const creditosSpan = document.getElementById('creditos');
let creditos = parseInt(localStorage.getItem('creditos')) || 2;
creditosSpan.textContent = creditos;

const servicos = [
  { nome: 'Vídeos', desc: 'Roteiro + edição rápida (8–30s) pronto pra viralizar.', tipo: 'free', categoria: 'instagram' },
  { nome: 'Stories', desc: 'Sequências com CTA pra gerar DM e clique no link.', tipo: 'free', categoria: 'instagram' },
  { nome: 'Reels', desc: 'Cortes rápidos com ganchos que param o dedo.', tipo: 'pago', categoria: 'tiktok' },
  { nome: 'Anúncios', desc: 'Arte + copy + CTA. Pronto pra subir em Ads.', tipo: 'free', categoria: 'instagram' },
  { nome: 'Conteúdos', desc: 'Legendas e descrições treinadas pra conversão.', tipo: 'free', categoria: 'youtube' },
  { nome: 'Artes', desc: 'Banners, thumbs e capas otimizadas pra clique.', tipo: 'free', categoria: 'sites' },
  { nome: 'Calendários', desc: 'Planejamento mensal com temas e ganchos.', tipo: 'pago', categoria: 'instagram' },
  { nome: 'Influenciadores', desc: 'Parcerias com cupom e comissão rastreável.', tipo: 'pago', categoria: 'tiktokshop' },
  { nome: 'Vídeos por IA', desc: 'Geração guiada por prompt com identidade visual.', tipo: 'free', categoria: 'tiktok' },
];

const container = document.getElementById('servicosContainer');

// === Renderizar cards ===
function renderCards(lista) {
  container.innerHTML = '';
  lista.forEach((srv, index) => {
    const badge = `<span class="badge ${srv.tipo === 'free' ? 'free' : 'pago'}">${srv.tipo === 'free' ? 'Free 1 crédito' : 'Plano pago'}</span>`;
    const card = document.createElement('div');
    card.classList.add('servico-card');
    card.innerHTML = `
      <h3>${srv.nome} ${badge}</h3>
      <p>${srv.desc}</p>
      <div class="btns">
        <button class="btn-criar" data-index="${index}">Criar grátis</button>
        <button class="btn-pedir">Pedir agora</button>
      </div>
    `;
    container.appendChild(card);
  });

  // Lógica de crédito
  document.querySelectorAll('.btn-criar').forEach(btn => {
    btn.addEventListener('click', () => {
      if (creditos > 0) {
        creditos--;
        localStorage.setItem('creditos', creditos);
        creditosSpan.textContent = creditos;
        alert('Criação realizada! 1 crédito utilizado.');
      } else {
        alert('Você não tem créditos suficientes.');
      }
    });
  });
}

// === Filtros ===
const botoesFiltro = document.querySelectorAll('.filtros button');
botoesFiltro.forEach(btn => {
  btn.addEventListener('click', () => {
    botoesFiltro.forEach(b => b.classList.remove('ativo'));
    btn.classList.add('ativo');
    const filtro = btn.dataset.filter;
    if (filtro === 'todas') renderCards(servicos);
    else renderCards(servicos.filter(s => s.categoria === filtro));
  });
});

// === Logout ===
document.getElementById('btnLogout').addEventListener('click', () => {
  localStorage.removeItem('creditos');
  window.location.href = 'index.html';
});

// Render inicial
renderCards(servicos);
