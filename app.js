// ===============================
//  CONECTANDO O BEM - APP.JS
// ===============================

console.log("JS rodando em:", window.location.pathname);

document.addEventListener("DOMContentLoaded", () => {
  /* Fade / Reveal */
  document.body.classList.add("loaded");
  function applyReveal() {
    document.querySelectorAll(".reveal").forEach((el) => {
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight - 120) el.classList.add("active");
    });
  }
  window.addEventListener("scroll", applyReveal);
  applyReveal();

  /* Mark nav active */
  const path = location.pathname.split("/").pop();
  document.querySelectorAll("nav a").forEach((a) => {
    if (a.getAttribute("href") === path) a.classList.add("active");
  });

  /* Mini profile */
  const nomeSalvo = localStorage.getItem("nomeVoluntario");
  const fotoSalva = localStorage.getItem("fotoVoluntario");
  const miniFoto = document.getElementById("miniFoto");
  const miniNome = document.getElementById("miniNome");
  const btnSair = document.getElementById("btnSair");

  if (miniFoto && miniNome) {
    if (nomeSalvo && fotoSalva) {
      miniNome.textContent = nomeSalvo.split(" ")[0];
      miniFoto.src = fotoSalva;
      if (btnSair) btnSair.style.display = "";
    } else {
      miniNome.textContent = "Criar Perfil";
      miniFoto.src = "https://picsum.photos/60";
      if (btnSair) btnSair.style.display = "none";
    }
  }

  if (btnSair) {
    btnSair.addEventListener("click", (e) => {
      e.preventDefault();
      if (confirm("Deseja sair e apagar seu perfil?")) {
        localStorage.removeItem("nomeVoluntario");
        localStorage.removeItem("fotoVoluntario");
        localStorage.removeItem("acoesVoluntario");
        localStorage.removeItem("causasVoluntario");
        window.location.href = "perfil.html";
      }
    });
  }

  /* Perfil creation */
  const listaAvatares = document.getElementById("listaAvatares");
  const criarPerfilForm = document.getElementById("criarPerfilForm");
  const formCriacao = document.getElementById("formCriacao");
  const perfilCriado = document.getElementById("perfilCriado");

  if (listaAvatares) {
    const avatares = [
      "https://api.dicebear.com/7.x/adventurer/svg?seed=Aiko",
      "https://api.dicebear.com/7.x/adventurer/svg?seed=Marcus",
      "https://api.dicebear.com/7.x/adventurer/svg?seed=Rina",
      "https://api.dicebear.com/7.x/adventurer/svg?seed=Leo",
      "https://api.dicebear.com/7.x/adventurer/svg?seed=Jade",
      "https://api.dicebear.com/7.x/adventurer/svg?seed=Tom",
      "https://api.dicebear.com/7.x/adventurer/svg?seed=Sara",
      "https://api.dicebear.com/7.x/adventurer/svg?seed=Alex",
    ];
    avatares.forEach((url) => {
      const img = document.createElement("img");
      img.src = url;
      img.className = "avatar-desenho";
      img.addEventListener("click", () => {
        document
          .querySelectorAll("#listaAvatares img")
          .forEach((i) => i.classList.remove("selecionado"));
        img.classList.add("selecionado");
      });
      listaAvatares.appendChild(img);
    });
  }

  if (nomeSalvo && fotoSalva && perfilCriado) {
    formCriacao?.classList.add("d-none");
    perfilCriado.classList.remove("d-none");
    document.getElementById("nomePerfil").textContent = nomeSalvo;
    document.getElementById("fotoPerfil").src = fotoSalva;
    const causas = JSON.parse(localStorage.getItem("causasVoluntario") || "[]");
    const container = document.getElementById("causasExibidas");
    if (container && causas.length)
      causas.forEach((c) => {
        const badge = document.createElement("span");
        badge.className = "badge bg-primary me-1";
        badge.textContent = c;
        container.appendChild(badge);
      });
  }

  if (criarPerfilForm) {
    criarPerfilForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nome = document.getElementById("inputNome").value.trim();
      const avatar = document.querySelector(".avatar-desenho.selecionado");
      const causas = [...document.querySelectorAll(".causa.selecionado")].map(
        (c) => c.textContent
      );
      if (!avatar) return alert("Escolha um avatar.");
      localStorage.setItem("nomeVoluntario", nome);
      localStorage.setItem("fotoVoluntario", avatar.src);
      localStorage.setItem("causasVoluntario", JSON.stringify(causas));
      window.location.reload();
    });
  }

  /* Feed news (index) */
  const feed = document.getElementById("feed");
  if (feed) {
    const noticias = [
      {
        titulo: "Projeto Viva Conectado",
        resumo: "Aplicativo social conectando idosos com voluntários.",
        imagem: "https://picsum.photos/600/350?random=1",
        data: "01/11/2025",
      },
      {
        titulo: "Plantio de árvores em SP",
        resumo: "Ação voluntária plantou mais de 500 mudas.",
        imagem: "https://picsum.photos/600/350?random=2",
        data: "04/11/2025",
      },
      {
        titulo: "Campanha arrecada toneladas de alimentos",
        resumo: "Mobilização solidária apoiou centenas de famílias.",
        imagem: "https://picsum.photos/600/350?random=3",
        data: "03/11/2025",
      },

      // ⭐ Novas notícias — Fortaleza
      {
        titulo: "Mutirão social revitaliza praças em Fortaleza",
        resumo:
          "Voluntários pintam bancos, cuidam de jardins e renovam espaços públicos.",
        imagem: "https://picsum.photos/600/350?random=41",
        data: "10/11/2025",
      },
      {
        titulo: "Ação solidária distribui kits de higiene no Pirambu",
        resumo:
          "Mais de 300 famílias foram atendidas com apoio de ONGs locais.",
        imagem: "https://picsum.photos/600/350?random=42",
        data: "08/11/2025",
      },
      {
        titulo: "Projeto Juventude Ativa promove oficinas gratuitas",
        resumo:
          "Jovens participaram de cursos de informática e esportes inclusivos.",
        imagem: "https://picsum.photos/600/350?random=43",
        data: "06/11/2025",
      },
    ];

    noticias.forEach((n) => {
      const col = document.createElement("div");
      col.className = "col-md-6 col-lg-4 reveal";
      col.innerHTML = `<div class="card shadow-sm h-100"><img src="${n.imagem}" class="card-img-top"><div class="card-body"><h5 class="fw-bold">${n.titulo}</h5><p>${n.resumo}</p><small class="text-muted">${n.data}</small></div></div>`;
      feed.appendChild(col);
    });
  }

  /* ONGs (ongs.html) */
  const listaOngs = document.getElementById("listaOngs");
  const ongs = [
    {
      nome: "Instituto Luz do Amanhã",
      foco: "Educação infantil",
      cidade: "Recife - PE",
    },
    { nome: "Cuidar é Amar", foco: "Apoio a idosos", cidade: "BH - MG" },
    { nome: "Verde Vida", foco: "Meio Ambiente", cidade: "São Paulo - SP" },
    { nome: "Pet Feliz", foco: "Adoção de Animais", cidade: "Curitiba - PR" },
    {
      nome: "Mãos Unidas",
      foco: "Campanhas solidárias",
      cidade: "Fortaleza - CE",
    },
    {
      nome: "Códigos do Futuro",
      foco: "Tecnologia social",
      cidade: "Rio de Janeiro - RJ",
    },
  ];
  if (listaOngs)
    ongs.forEach((o) => {
      const col = document.createElement("div");
      col.className = "col-md-6 col-lg-4 reveal";
      col.innerHTML = `<div class="card shadow-sm p-4 h-100"><h4 class="fw-bold text-primary">${o.nome}</h4><p>${o.foco}</p><small class="text-muted"><i class="bi bi-geo-alt"></i> ${o.cidade}</small></div>`;
      listaOngs.appendChild(col);
    });

  /* Doação (doar.html) */
  const doarForm = document.getElementById("doarForm");
  if (doarForm)
    doarForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const valor = Number(document.getElementById("valorDoacao").value);
      const ong = document.getElementById("selectOng").value;
      const msg = document.getElementById("msgDoacao");
      msg.textContent = `Obrigado pela doação de R$ ${valor.toFixed(
        2
      )} para ${ong}!`;
      msg.classList.remove("d-none");
      setTimeout(() => (window.location.href = "doacoes.html"), 2000);
    });

  /* Ranking de Doadores (doacoes.html) */
  const rankingDoadores = document.getElementById("rankingDoadores");
  if (rankingDoadores) {
    const doadores = [
      {
        nome: "Pedro Batista",
        total: 2100,
        medalha: "🥇",
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Pedro",
      },
      {
        nome: "Ismael Brandão",
        total: 1750,
        medalha: "🥈",
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Ismael",
      },
      {
        nome: "Gabriel Lucena",
        total: 980,
        medalha: "🥉",
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Gabriel",
      },
    ];
    doadores.forEach((d, i) => {
      const col = document.createElement("div");
      col.className = "col-md-4";
      col.innerHTML = `<div class="card ranking-card text-center p-4 ${
        i === 0 ? "top1" : ""
      }"><img src="${
        d.avatar
      }" class="rounded-circle mb-3" style="width:90px;height:90px;"><div class="medalha">${
        d.medalha
      }</div><h4 class="fw-bold mt-2">${
        d.nome
      }</h4><p class="text-muted">Doou R$ ${d.total.toLocaleString(
        "pt-BR"
      )}</p></div>`;
      rankingDoadores.appendChild(col);
    });
  }

  /* Voluntariados (voluntariados.html) */
  const listaVoluntariados = document.getElementById("listaVoluntariados");
  if (listaVoluntariados) {
    const voluntariados = [
      {
        titulo: "Ajudar em Abrigo de Animais",
        ong: "Pet Feliz",
        local: "Curitiba - PR",
        descricao: "Passeio, cuidados e apoio no abrigo.",
        icone: "🐾",
      },
      {
        titulo: "Plantio de Árvores",
        ong: "Verde Vida",
        local: "São Paulo - SP",
        descricao: "Mutirão de reflorestamento urbano.",
        icone: "🌱",
      },
      {
        titulo: "Ações com Idosos",
        ong: "Mãos Unidas",
        local: "Fortaleza - CE",
        descricao: "Conversas e atividades recreativas.",
        icone: "👵👴",
      },
      {
        titulo: "Oficina de Programação",
        ong: "Códigos do Futuro",
        local: "Rio de Janeiro - RJ",
        descricao: "Ensinar lógica e programação básica.",
        icone: "💻",
      },
    ];
    voluntariados.forEach((v) => {
      const col = document.createElement("div");
      col.className = "col-md-6 col-lg-4";
      col.innerHTML = `<div class="card shadow-sm p-4 h-100 card-vol"><div style="font-size:3rem" class="mb-3">${v.icone}</div><h4 class="fw-bold">${v.titulo}</h4><p><strong>ONG:</strong> ${v.ong}</p><p><strong>Local:</strong> ${v.local}</p><p>${v.descricao}</p><button class="btn btn-primary w-100 mt-3 btnParticipar" data-titulo="${v.titulo}">Quero Participar 🙋‍♂️</button></div>`;
      listaVoluntariados.appendChild(col);
    });
    document.querySelectorAll(".btnParticipar").forEach((btn) => {
      btn.addEventListener("click", () =>
        alert(`Você se inscreveu em: ${btn.dataset.titulo}`)
      );
    });
  }

  /* Sidebar mobile controls */
  const sidebar = document.getElementById("sidebar");
  const openMenu = document.getElementById("openMenu");
  const closeMenu = document.getElementById("closeMenu");
  if (openMenu && closeMenu && sidebar) {
    openMenu.addEventListener("click", () => sidebar.classList.add("show"));
    closeMenu.addEventListener("click", () => sidebar.classList.remove("show"));
  }
  document.querySelectorAll(".sidebar a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 992) sidebar?.classList.remove("show");
    });
  });
});
