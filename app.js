// ===============================
// CONECTANDO O BEM - APP.JS
// ===============================

console.log("✅ JS rodando em:", window.location.pathname);

document.addEventListener("DOMContentLoaded", () => {

  // === 1. FADE-IN NO CARREGAMENTO ===
  document.body.classList.add('loaded');


  // === 2. ANIMAÇÃO DE ELEMENTOS (ao rolar a tela) ===
  function applyReveal() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
      const top = el.getBoundingClientRect().top;
      const visible = window.innerHeight - 100;
      if (top < visible) el.classList.add('active');
    });
  }
  window.addEventListener('scroll', applyReveal);
  applyReveal();


  // === 3. MARCAR ABA ATIVA NO MENU ===
  const links = document.querySelectorAll('nav a');
  const path = location.pathname.split('/').pop();
  links.forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (href === 'index.html' && (path === '' || path === 'index.html'))) {
      a.classList.add('active');
    }
  });


  // === 4. VERIFICAÇÃO DE PERFIL ===
  // Se o usuário não tiver perfil salvo, redireciona automaticamente pra criação
 // ===== Sem redirect forçado =====
// Só carregamos as variáveis do localStorage — sem mandar o usuário pra perfil.html
const nomeSalvo = localStorage.getItem('nomeVoluntario') || null;
const fotoSalva = localStorage.getItem('fotoVoluntario') || null;


  // === 5. FEED DE NOTÍCIAS (index.html) ===
  const feed = document.getElementById('feed');
  if (feed) {
    const noticias = [
      {
        titulo: "Projeto Viva Conectando",
        resumo: "O projeto “Viva Conectado” surge como uma alternativa inovadora para reduzir esse distanciamento, ao oferecer um aplicativo que combina tecnologia, entretenimento e inclusão para idosos. ",
        imagem: "https://picsum.photos/600/350?random=1",
        data: "01/11/2025"
      },
      {
        titulo: "Voluntários plantam 500 árvores em São Paulo",
        resumo: "O projeto Verde SP cresce com apoio de estudantes e ONGs locais.",
        imagem: "https://picsum.photos/600/350?random=2",
        data: "04/11/2025"
      },
      {
        titulo: "Campanha arrecada 2 toneladas de alimentos",
        resumo: "Moradores se mobilizaram em uma corrente solidária que uniu toda a cidade.",
        imagem: "https://picsum.photos/600/350?random=3",
        data: "03/11/2025"
      }
    ];

    noticias.forEach(noticia => {
      const col = document.createElement('div');
      col.className = 'col-md-6 col-lg-4';
      col.innerHTML = `
        <div class="card shadow-sm h-100">
          <img src="${noticia.imagem}" class="card-img-top" alt="${noticia.titulo}">
          <div class="card-body">
            <h5 class="card-title">${noticia.titulo}</h5>
            <p class="card-text">${noticia.resumo}</p>
            <p class="text-muted small mb-0">${noticia.data}</p>
          </div>
        </div>
      `;
      feed.appendChild(col);
    });
  }


  // === 6. CRIAÇÃO DE PERFIL (perfil.html) ===
 // === 6. CRIAÇÃO DE PERFIL (perfil.html) ===
const formCriacao = document.getElementById('formCriacao');
const criarPerfilForm = document.getElementById('criarPerfilForm');
const perfilCriado = document.getElementById('perfilCriado');
const msgSucesso = document.getElementById('msgSucesso');
const listaAvatares = document.getElementById('listaAvatares');

// Carrega lista de avatares se estiver na tela de criação
if (listaAvatares) {
  // Avatares estilo cartoon (gerados pela API DiceBear)
  const avatares = [
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Aiko",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Marcus",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Rina",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Leo",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Jade",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Tom",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Sara",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Alex"
  ];

  avatares.forEach(url => {
    const img = document.createElement('img');
    img.src = url;
    img.alt = "Avatar";
    img.classList.add('avatar-desenho');
    img.addEventListener('click', () => {
      document.querySelectorAll('#listaAvatares img').forEach(i => i.classList.remove('selecionado'));
      img.classList.add('selecionado');
    });
    listaAvatares.appendChild(img);
  });
}

  // Exibe o perfil salvo, se existir
  if (nomeSalvo && fotoSalva && perfilCriado && formCriacao) {
    formCriacao.classList.add('d-none');
    perfilCriado.classList.remove('d-none');
    document.getElementById('nomePerfil').textContent = nomeSalvo;
    document.getElementById('fotoPerfil').src = fotoSalva;
    document.getElementById('nivelPerfil').textContent = 'Nível 1 - Iniciante';
    document.getElementById('acoesPerfil').textContent = 'Ações concluídas: 0';
    const span = document.createElement('span');
    span.className = 'badge bronze';
    span.textContent = 'Primeira Ação 🥉';
    document.getElementById('badgesPerfil').appendChild(span);
  }

  // Criação de novo perfil
  if (criarPerfilForm) {
    criarPerfilForm.addEventListener('submit', e => {
      e.preventDefault();
      const nome = document.getElementById('inputNome').value.trim();
      const avatarSelecionado = document.querySelector('#listaAvatares img.selecionado');
      if (!avatarSelecionado) {
        alert('Escolha uma imagem para seu perfil!');
        return;
      }

      const foto = avatarSelecionado.src;
      localStorage.setItem('nomeVoluntario', nome);
      localStorage.setItem('fotoVoluntario', foto);
      localStorage.setItem('acoesVoluntario', '0');

      msgSucesso.classList.remove('d-none');
      setTimeout(() => msgSucesso.classList.add('d-none'), 3000);

      setTimeout(() => window.location.reload(), 1000);
    });
  }

// === 6B. LISTAGEM DE ONGs, DOADORES E VOLUNTÁRIOS ===

// === ONGs (ongs.html) ===
const listaOngs = document.getElementById('listaOngs');
if (listaOngs) {
  const ongs = [
    { nome: "Instituto Luz do Amanhã", foco: "Educação infantil e reforço escolar", cidade: "Recife - PE" },
    { nome: "Cuidar é Amar", foco: "Apoio a idosos e pessoas em vulnerabilidade", cidade: "Belo Horizonte - MG" },
    { nome: "Verde Vida", foco: "Reflorestamento e educação ambiental", cidade: "São Paulo - SP" },
    { nome: "Pet Feliz", foco: "Adoção e cuidado de animais abandonados", cidade: "Curitiba - PR" },
    { nome: "Mãos Unidas", foco: "Ações emergenciais e campanhas solidárias", cidade: "Fortaleza - CE" }
  ];

  ongs.forEach(o => {
    const card = document.createElement('div');
    card.className = 'col-md-6 col-lg-4 reveal';
    card.innerHTML = `
      <div class="card h-100 shadow-sm border-0">
        <div class="card-body">
          <h5 class="card-title text-primary fw-bold">${o.nome}</h5>
          <p class="card-text">${o.foco}</p>
          <p class="text-muted small mb-0"><i class="bi bi-geo-alt-fill me-1"></i>${o.cidade}</p>
        </div>
      </div>
    `;
    listaOngs.appendChild(card);
  });
}


// === RANKING DE DOADORES (doacoes.html) ===
const rankingDoadores = document.getElementById('rankingDoadores');
if (rankingDoadores) {
  const doadores = [
    { nome: "Ismael brandao", total: 45000, badge: "Coração Solidário 💖", cor: "gold", icone: "🌍" },
    { nome: "Pedro Batista", total: 18000, badge: "Anjo do Bem 💎", cor: "gold", icone: "👑" },
    { nome: "Gabriel Lucena", total: 8500, badge: "Mão Amiga 🙌", cor: "bronze", icone: "🤝" }
  ];
  doadores.forEach((d, i) => {
    const col = document.createElement('div');
    col.className = 'col-md-4';
    col.innerHTML = `
      <div class="card text-center h-100 shadow-sm border-0">
        <div class="card-body">
          <div style="font-size:2.4rem;margin-bottom:8px;">${d.icone}</div>
          <h4 class="fw-bold text-primary">${i + 1}º ${d.nome}</h4>
          <p class="text-muted mb-1">Total doado: R$ ${Number(d.total).toLocaleString('pt-BR')}</p>
          <span class="badge ${d.cor}">${d.badge}</span>
        </div>
      </div>
    `;
    rankingDoadores.appendChild(col);
  });
}


// === RANKING DE VOLUNTÁRIOS (voluntarios.html) ===
const rankingVoluntarios = document.getElementById('rankingVoluntarios');
if (rankingVoluntarios) {
  const voluntarios = [
    { nome: "Pedro batista", acoes: 75, badge: "Herói Social 🌟", cor: "gold", icone: "🌍" },
    { nome: "Ismael brandao", acoes: 55, badge: "Voluntário Engajado 💪", cor: "gold", icone: "💚" },
    { nome: "Gabriel Lucena", acoes: 7, badge: "Iniciante do Bem 🌱", cor: "bronze", icone: "🫶" }
  ];
  voluntarios.forEach((v, i) => {
    const col = document.createElement('div');
    col.className = 'col-md-4';
    col.innerHTML = `
      <div class="card text-center h-100 shadow-sm border-0">
        <div class="card-body">
          <div style="font-size:2.4rem;margin-bottom:8px;">${v.icone}</div>
          <h4 class="fw-bold text-success">${i + 1}º ${v.nome}</h4>
          <p class="text-muted mb-1">${v.acoes} ações voluntárias</p>
          <span class="badge ${v.cor}">${v.badge}</span>
        </div>
      </div>
    `;
    rankingVoluntarios.appendChild(col);
  });
}

  // === 7. MINI PERFIL NO TOPO (todas as páginas) ===
 // === 7. MINI PERFIL NO TOPO (todas as páginas) ===
const miniFoto = document.getElementById('miniFoto');
const miniNome = document.getElementById('miniNome');
const btnSair = document.getElementById('btnSair');

if (miniFoto && miniNome) {
  // Se existir perfil, mostra primeiro nome e foto; se não, mostra call-to-action "Criar Perfil"
  if (nomeSalvo && fotoSalva) {
    miniNome.textContent = nomeSalvo.split(' ')[0];
    miniFoto.src = fotoSalva;
    if (btnSair) btnSair.style.display = ''; // garante que o botão Sair esteja visível
  } else {
    miniNome.textContent = 'Criar Perfil';
    miniFoto.src = 'https://picsum.photos/60'; // avatar padrão
    if (btnSair) btnSair.style.display = 'none'; // esconde "Sair" quando não há perfil
  }
}

  // === 8. BOTÃO SAIR ===
  if (btnSair) {
    btnSair.addEventListener('click', (e) => {
      e.preventDefault();
      const confirmar = confirm("Tem certeza que deseja sair? Seu perfil será apagado.");
      if (confirmar) {
        localStorage.removeItem('nomeVoluntario');
        localStorage.removeItem('fotoVoluntario');
        localStorage.removeItem('acoesVoluntario');
        alert("Perfil removido com sucesso. Volte em breve!");
        window.location.href = "perfil.html";
      }
    });
  }

});
