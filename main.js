// --------------------------------------------------------------
// BASE DE DADOS DE PALPITES ATUALIZADA
// --------------------------------------------------------------
const palpitesData = [
  { 
    id: "diario1", 
    titulo: "📆 DIÁRIO 1", 
    bets: ["📢 Indisponível: aguarde novos conteúdos"],
    unavailable: true,
    odd: "-",
    aposta: "-",
    ganho: "-"
  },
  { 
    id: "diario2", 
    titulo: "📆 DIÁRIO 2", 
    bets: ["📢 Indisponível: aguarde novos conteúdos"],
    unavailable: true,
    odd: "-",
    aposta: "-",
    ganho: "-"
  },
  { 
    id: "diario3", 
    titulo: "📆 DIÁRIO 3", 
    bets: ["📢 Indisponível: aguarde novos conteúdos"],
    unavailable: true,
    odd: "-",
    aposta: "-",
    ganho: "-"
  },
  { 
    id: "corrida1", 
    titulo: "🏁 CORRIDA 1", 
    bets: [
      "🏆 Premier Bet físico: indisponível",
      "🐘 Elephant online: indisponível",
      "🏬 Elephant Física: indisponível",
      "🟢 Bantu Bet: 429972",
      "💰 Kwanza Bet: indisponível"
    ],
    finished: false,
    odd: "1000+",
    aposta: "500 KZ",
    ganho: "700.000 KZ",
    detalhesEspeciais: [
      "⚽ Empate em uma das partes nos seguintes jogos:",
      "🇪🇸 Rayo Vallecano vs Elche CF",
      "🇪🇸 Real Sociedad vs Levante",
      "🇪🇸 Mallorca vs Real Madrid",
      "🇮🇹 Inter Milan vs AS Roma",
      "🇩🇪 Freiburg vs Bayern Munich",
      "🇩🇪 Werder Bremen vs RB Leipzig",
      "🇩🇪 VfB Stuttgart vs Borussia Dortmund",
      "🇫🇷 Paris Saint-Germain vs Toulouse",
      "🇫🇷 Lille OSC vs Lens",
      "🇫🇷 AS Monaco vs Olympique de Marseille",
      "🇵🇹 Sporting CP vs Santa Clara",
      "🇵🇹 Porto vs Famalicao",
      "🇪🇸 Real Betis vs Espanyol"
    ],
    inicioFicha: "⏰ Começa: dia 3 às 19h | Termina: dia 5 às 23h"
  },
  { 
    id: "corrida2", 
    titulo: "🏁 CORRIDA 2", 
    bets: ["📢 Indisponível: aguarde novos conteúdos"],
    unavailable: true,
    odd: "-",
    aposta: "-",
    ganho: "-"
  },
  { 
    id: "injetavel1", 
    titulo: "💉 INJETÁVEL 1", 
    bets: ["📢 Indisponível: aguarde novos conteúdos"],
    unavailable: true,
    odd: "-",
    aposta: "-",
    ganho: "-"
  },
  { 
    id: "injetavel2", 
    titulo: "💉 INJETÁVEL 2", 
    bets: ["📢 Indisponível: aguarde novos conteúdos"],
    unavailable: true,
    odd: "-",
    aposta: "-",
    ganho: "-"
  }
];

// --------------------------------------------------------------
// PERFIS DE USUÁRIO (Níveis de acesso)
// --------------------------------------------------------------
const usuarios = {
  "888900": { senha: "2121", nome: "VENCEDOR BRONZE", niveis: { diario1: false, diario2: false, diario3: false, corrida1: true, corrida2: false, injetavel1: false, injetavel2: false } },
  "400600": { senha: "3030", nome: "VENCEDOR PRATA", niveis: { diario1: false, diario2: false, diario3: false, corrida1: true, corrida2: false, injetavel1: false, injetavel2: false } },
  "299222": { senha: "5050", nome: "VENCEDOR OURO", niveis: { diario1: false, diario2: false, diario3: false, corrida1: true, corrida2: false, injetavel1: false, injetavel2: false } }
};

const planosList = [
  { nome: "BOCADO", preco: "500 KZ", beneficios: ["21 palpites/semana", "2 Diários + 1 Corrida"] },
  { nome: "PALPITE BUÉ MAU", preco: "1000 KZ", beneficios: ["28 palpites/semana", "3 Diários + 1 Corrida"] },
  { nome: "PLANO BOSS", preco: "2000 KZ", beneficios: ["44 palpites/semana", "3 Diários, 2 Corridas, 2 Injetáveis"] }
];

// Elementos DOM
const loginSection = document.getElementById('loginSection');
const palpitesSection = document.getElementById('palpitesSection');
const planosSection = document.getElementById('planosSection');
const headerActions = document.getElementById('headerActions');
const palpitesGrid = document.getElementById('palpitesGrid');
const plansContainer = document.getElementById('plansContainer');

let currentUserNome = null;
let currentUserNiveis = null;

// Atualizar cabeçalho conforme estado
function updateHeader(state, userName = null) {
  const logoTitle = document.querySelector('.logo-area h1');
  const logoSpan = document.querySelector('.logo-area span');
  
  if (state === 'login') {
    if (logoTitle) logoTitle.innerText = 'TÁ DENTRO';
    if (logoSpan) logoSpan.innerText = 'Palpites com Inteligência';
    headerActions.innerHTML = '';
  } 
  else if (state === 'palpites') {
    if (logoTitle) logoTitle.innerText = `🏆 OLÁ, ${userName || 'VENCEDOR'}`;
    if (logoSpan) logoSpan.innerText = 'Tá Dentro • Plano Ativo';
    headerActions.innerHTML = `
      <div class="days-badge">📅 ACESSO PREMIUM</div>
      <button class="renew-plan-btn" id="renewPlanHeaderBtn">🔄 RENOVAR PLANO</button>
    `;
    const renewBtn = document.getElementById('renewPlanHeaderBtn');
    if (renewBtn) renewBtn.addEventListener('click', () => showPlanosScreen());
  } 
  else if (state === 'planos') {
    if (logoTitle) logoTitle.innerText = 'TÁ DENTRO';
    if (logoSpan) logoSpan.innerText = 'Escolha seu Plano VIP';
    headerActions.innerHTML = `<button class="back-button" id="backToLoginBtn">⬅ VOLTAR</button>`;
    const backBtn = document.getElementById('backToLoginBtn');
    if (backBtn) backBtn.addEventListener('click', () => showLoginScreen());
  }
}

// Exibir tela de login
function showLoginScreen() {
  loginSection.classList.remove('hidden-section');
  palpitesSection.classList.add('hidden-section');
  planosSection.classList.add('hidden-section');
  updateHeader('login');
  currentUserNome = null;
  currentUserNiveis = null;
}

// Renderizar os palpites com base no nível de acesso
function renderPalpites() {
  if (!palpitesGrid) return;
  palpitesGrid.innerHTML = '';
  
  palpitesData.forEach(item => {
    const hasAccess = currentUserNiveis ? currentUserNiveis[item.id] : false;
    const card = document.createElement('div');
    card.className = 'card-bet';
    if (!hasAccess) card.classList.add('hidden-card');
    
    let betsHtml = '';
    if (item.unavailable) {
      betsHtml = `<div class="unavailable-text">🚫 ${item.bets[0]}</div>`;
    } else if (item.finished) {
      betsHtml = `<div class="finished-text">🏁 ${item.bets[0]}<br><span style="font-size:0.8rem;">⏰ Resultado disponível</span></div>`;
    } else {
      betsHtml = item.bets.map(bet => `<div class="bet-detail">${bet}</div>`).join('');
    }
    
    const oddDisplay = item.odd || (item.unavailable ? '—' : '10');
    const apostaDisplay = item.aposta || (item.unavailable ? '—' : '500 KZ');
    const ganhoDisplay = item.ganho || (item.unavailable ? '—' : '5.000 KZ');
    
    card.innerHTML = `
      <div class="card-header">
        <h3>${item.titulo}</h3>
      </div>
      <div class="card-body">
        ${betsHtml}
        <div class="bet-stats">
          <div>🎲 Odds: ${oddDisplay}</div>
          <div>💰 Aposta: ${apostaDisplay}</div>
          <div>🏆 Ganho: ${ganhoDisplay}</div>
        </div>
        <button class="btn-details" data-card-id="${item.id}" data-card-title="${item.titulo}">🔍 VER DETALHES</button>
      </div>
    `;
    palpitesGrid.appendChild(card);
  });
  
  // Eventos dos botões de detalhes (popup)
  document.querySelectorAll('.btn-details').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const cardId = btn.getAttribute('data-card-id');
      const cardTitle = btn.getAttribute('data-card-title');
      showPopupDetails(cardId, cardTitle);
    });
  });
}

// Popup com detalhes aprofundados (jogos, odds, dicas)
function showPopupDetails(cardId, cardTitle) {
  const palpite = palpitesData.find(p => p.id === cardId);
  const overlay = document.createElement('div');
  overlay.className = 'popup-overlay';
  
  let innerContent = '';
  if (palpite && palpite.detalhesEspeciais && palpite.detalhesEspeciais.length > 0) {
    const matchesHtml = palpite.detalhesEspeciais.map(match => {
      // Se for o título "Empate em uma das partes nos seguintes jogos:", mostra diferente
      if (match.includes("Empate em uma das partes")) {
        return `<div class="match-item" style="background:#d9f0c5; margin-bottom:0.5rem;">
          <div class="match-title" style="font-size:1.1rem;">🎯 ${match}</div>
        </div>`;
      }
      return `
        <div class="match-item">
          <div class="match-title">⚽ ${match}</div>
        </div>
      `;
    }).join('');
    
    innerContent = `
      <div class="match-item" style="background:#d9f0c5; margin-bottom:1rem;">
        <div class="match-title">📊 ${palpite.titulo} - ANÁLISE COMPLETA</div>
        <div class="bet-example">🎯 Odds totais: ${palpite.odd} | 💵 Investimento: ${palpite.aposta} | 💰 Retorno potencial: ${palpite.ganho}</div>
      </div>
      ${matchesHtml}
      <div class="match-item" style="background:#ffe6b3;">
        <div class="match-title">⏰ ${palpite.inicioFicha || "Disponível em breve"}</div>
        <div class="bet-example">✅ Estratégia: Empate em qualquer uma das partes (1º tempo ou 2º tempo) em pelo menos um dos jogos listados. Odds combinadas 1000+!</div>
        <div class="bet-example" style="margin-top:0.5rem;">💡 Dica: Apenas um empate em qualquer parte do jogo já garante o prêmio!</div>
      </div>
      <div class="contact-row" style="justify-content:center; margin-top:1rem;">
        <a href="https://wa.me/244958685897" class="contact-link" target="_blank" style="background:#25d366;">💬 Dúvidas? Fale conosco</a>
      </div>
    `;
  } else {
    innerContent = `
      <div class="match-item" style="text-align:center;">
        <div class="match-title">🚫 PALPITE INDISPONÍVEL 🚫</div>
        <div class="bet-example">📢 O conteúdo <strong>${cardTitle}</strong> ainda não foi liberado para o seu plano.</div>
        <div class="bet-example">🌟 Adquira um plano superior para acessar todos os palpites!</div>
      </div>
      <div class="contact-row" style="justify-content:center; margin-top:1rem;">
        <a href="https://wa.me/244958685897" class="contact-link" target="_blank" style="background:#25d366;">💬 Suporte WhatsApp</a>
      </div>
    `;
  }
  
  overlay.innerHTML = `
    <div class="popup-ad">
      <div class="popup-header">
        <button class="close-popup">✕</button>
      </div>
      <div class="popup-content">
        ${innerContent}
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  const closeBtn = overlay.querySelector('.close-popup');
  closeBtn.addEventListener('click', () => overlay.remove());
}

// Exibir planos (renovação)
function renderPlanos() {
  if (!plansContainer) return;
  plansContainer.innerHTML = '';
  planosList.forEach((plano, idx) => {
    const planCard = document.createElement('div');
    planCard.className = 'plan-card';
    planCard.innerHTML = `
      <h3>${plano.nome}</h3>
      <div class="plan-price">${plano.preco}</div>
      <ul class="plan-features">
        ${plano.beneficios.map(b => `<li>✅ ${b}</li>`).join('')}
      </ul>
      <button class="btn-primary choose-plan-btn" data-plan="${plano.nome}" style="background:#f5c542; color:#1e3a2f; width:100%">ESCOLHER PLANO</button>
    `;
    plansContainer.appendChild(planCard);
  });
  document.querySelectorAll('.choose-plan-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // Rolar para área de contato (simulação de contato para upgrade)
      const contactSection = document.getElementById('contactSection');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        contactSection.style.boxShadow = '0 0 0 3px #f5c542';
        setTimeout(() => contactSection.style.boxShadow = '', 1500);
      }
      alert("📞 Entre em contato pelo WhatsApp para ativar seu novo plano e receber os acessos imediatamente!");
    });
  });
}

function showPlanosScreen() {
  loginSection.classList.add('hidden-section');
  palpitesSection.classList.add('hidden-section');
  planosSection.classList.remove('hidden-section');
  updateHeader('planos');
  renderPlanos();
}

// Login handler
function handleEntrar() {
  const numero = document.getElementById('loginNumber').value.trim();
  const senha = document.getElementById('loginPassword').value.trim();
  const usuario = usuarios[numero];
  
  if (usuario && usuario.senha === senha) {
    currentUserNome = usuario.nome;
    currentUserNiveis = usuario.niveis;
    
    loginSection.classList.add('hidden-section');
    palpitesSection.classList.remove('hidden-section');
    planosSection.classList.add('hidden-section');
    renderPalpites();
    updateHeader('palpites', usuario.nome);
  } else {
    alert("❌ Acesso negado! Verifique seu código e senha.");
  }
}

function handleRegistrar() {
  showPlanosScreen();
}

function bindEvents() {
  const btnEntrar = document.getElementById('btnEntrar');
  const btnRegistrar = document.getElementById('btnRegistrar');
  if (btnEntrar) btnEntrar.addEventListener('click', handleEntrar);
  if (btnRegistrar) btnRegistrar.addEventListener('click', handleRegistrar);
}

function init() {
  bindEvents();
  showLoginScreen();
  renderPlanos();
}

init();