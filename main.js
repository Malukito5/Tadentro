// Dados dos palpites atualizados: DIÁRIO 1 com conteúdo completo, outros como indisponíveis
const palpitesData = [
  { 
    id: "diario1", 
    titulo: "📆 DIÁRIO 1", 
    bets: [
      "🏆 Premier Bet físico: 66130964",
      "🐘 Elephant online: 979770",
      "🏬 Elephant Física: 377D516",
      "🟢 Bantu Bet: 980354",
      "💰 Kwanza Bet: indisponível"
    ],
    odd: "20-30",
    aposta: "500 KZ",
    ganho: "15.000 KZ",
    detalhesEspeciais: [
      "🇩🇪 Alemanha vs Gana → 1/2 e +2.5 Golos ⚽⚽",
      "🇨🇾 Cypre vs Moldova → 1X e -3.5 Golos 🛡️",
      "🇬🇾 Guyana vs Belize → 2X e -3.5 golos 🌍",
      "🇮🇹 Arezza vs Ascoli → 1X e -3.5 Golos 🔥",
      "🇷🇺 Torpedo vs Ska → 1X e +1.5 Golos ⚡",
      "🇪🇬 Masry vs Gouna → 1X e -3.5 Golos 🎯",
      "🇪🇬 Arabi vs Masr → 2X e -3.5 Golos 💪"
    ],
    inicioFicha: "⏰ Início da ficha: 16h"
  },
  { id: "diario2", titulo: "📆 DIÁRIO 2", bets: ["📢 Indisponível: aguarde novos conteúdos"], unavailable: true, odd: "-", aposta: "-", ganho: "-" },
  { id: "diario3", titulo: "📆 DIÁRIO 3", bets: ["📢 Indisponível: aguarde novos conteúdos"], unavailable: true, odd: "-", aposta: "-", ganho: "-" },
  { id: "diario4", titulo: "📆 DIÁRIO 4", bets: ["📢 Indisponível: aguarde novos conteúdos"], unavailable: true, odd: "-", aposta: "-", ganho: "-" },
  { id: "injetavel1", titulo: "💉 INJETÁVEL 1", bets: ["📢 Indisponível: aguarde novos conteúdos"], unavailable: true, odd: "-", aposta: "-", ganho: "-" },
  { id: "injetavel2", titulo: "💉 INJETÁVEL 2", bets: ["📢 Indisponível: aguarde novos conteúdos"], unavailable: true, odd: "-", aposta: "-", ganho: "-" },
  { id: "corrida1", titulo: "🏁 CORRIDA 1", bets: ["📢 Indisponível: aguarde novos conteúdos"], unavailable: true, odd: "-", aposta: "-", ganho: "-" },
  { id: "corrida2", titulo: "🏁 CORRIDA 2", bets: ["📢 Indisponível: aguarde novos conteúdos"], unavailable: true, odd: "-", aposta: "-", ganho: "-" }
];

// Perfis de usuários
const usuarios = {
  "777500": { senha: "2020", nome: "VENCEDOR BRONZE", niveis: { diario1: true, diario2: true, diario3: false, diario4: false, injetavel1: false, injetavel2: false, corrida1: true, corrida2: false } },
  "400600": { senha: "3030", nome: "VENCEDOR PRATA", niveis: { diario1: true, diario2: true, diario3: true, diario4: false, injetavel1: false, injetavel2: false, corrida1: true, corrida2: false } },
  "299222": { senha: "5050", nome: "VENCEDOR OURO", niveis: { diario1: true, diario2: true, diario3: true, diario4: true, injetavel1: true, injetavel2: true, corrida1: true, corrida2: true } }
};

const planosList = [
  { nome: "BOCADO", preco: "500 KZ", beneficios: ["21 palpites/semana", "2 Diários + 1 Corrida"] },
  { nome: "PALPITE BUÉ MAU", preco: "1000 KZ", beneficios: ["28 palpites/semana", "3 Diários + 1 Corrida"] },
  { nome: "PLANO BOSS", preco: "2000 KZ", beneficios: ["44 palpites/semana", "3 Diários, 2 Corridas, 2 Injetáveis"] }
];

const loginSection = document.getElementById('loginSection');
const palpitesSection = document.getElementById('palpitesSection');
const planosSection = document.getElementById('planosSection');
const headerActions = document.getElementById('headerActions');

let currentUser = null;
let currentUserNiveis = null;

function updateHeader(state, userName = null) {
  const logoDiv = document.querySelector('.logo-area h1');
  const logoSpan = document.querySelector('.logo-area span');
  
  if (state === 'login') {
    if (logoDiv) logoDiv.innerText = 'TÁ DENTRO';
    if (logoSpan) logoSpan.innerText = 'Tá Dentro';
    headerActions.innerHTML = '';
  } 
  else if (state === 'palpites') {
    if (logoDiv) logoDiv.innerText = `🏆 BEM-VINDO, ${userName || 'VENCEDOR'}`;
    if (logoSpan) logoSpan.innerText = 'Tá Dentro • Vip';
    headerActions.innerHTML = `
      <div class="days-badge">📅 FALTAM 7 DIAS</div>
      <button class="renew-plan-btn" id="renewPlanHeaderBtn">🔄 RENOVAR PLANO</button>
    `;
    const renewBtn = document.getElementById('renewPlanHeaderBtn');
    if (renewBtn) renewBtn.addEventListener('click', () => showPlanosFromRenew());
  } 
  else if (state === 'planos') {
    if (logoDiv) logoDiv.innerText = 'TÁ DENTRO';
    if (logoSpan) logoSpan.innerText = 'Escolha seu Plano';
    headerActions.innerHTML = `<button class="back-button" id="backToLoginBtn">⬅ VOLTAR</button>`;
    const backBtn = document.getElementById('backToLoginBtn');
    if (backBtn) backBtn.addEventListener('click', () => showLoginScreen());
  }
}

function showLoginScreen() {
  loginSection.classList.remove('hidden-section');
  palpitesSection.classList.add('hidden-section');
  planosSection.classList.add('hidden-section');
  updateHeader('login');
  currentUser = null;
  currentUserNiveis = null;
}

function renderPalpites() {
  const grid = document.getElementById('palpitesGrid');
  if (!grid) return;
  grid.innerHTML = '';
  
  palpitesData.forEach((item, idx) => {
    const hasAccess = currentUserNiveis && currentUserNiveis[item.id];
    
    const card = document.createElement('div');
    card.className = 'card-bet';
    if (!hasAccess) card.classList.add('hidden-card');
    
    let betsHtml = '';
    if (item.unavailable) {
      betsHtml = `<div class="unavailable-text">🚫 ${item.bets[0]}</div>`;
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
    grid.appendChild(card);
  });
  
  document.querySelectorAll('.btn-details').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const cardId = btn.getAttribute('data-card-id');
      const cardTitle = btn.getAttribute('data-card-title');
      showPopupAd(cardId, cardTitle);
    });
  });
}

function showPopupAd(cardId, cardTitle) {
  const overlay = document.createElement('div');
  overlay.className = 'popup-overlay';
  
  let popupContentHtml = '';
  
  if (cardId === 'diario1') {
    const diario1Data = palpitesData.find(p => p.id === 'diario1');
    if (diario1Data && diario1Data.detalhesEspeciais) {
      const matchesHtml = diario1Data.detalhesEspeciais.map(match => `
        <div class="match-item">
          <div class="match-title">📌 ${match}</div>
        </div>
      `).join('');
      popupContentHtml = `
        <div class="match-item" style="background:#d9f0c5;">
          <div class="match-title">🎯 SUPER PALPITES DIÁRIO 1 🎯</div>
          <div class="bet-example">📊 Odds estimadas: 20-30 | 💵 Aposta mínima: 500 KZ | 💰 Retorno: 15.000 KZ</div>
        </div>
        ${matchesHtml}
        <div class="match-item" style="background:#ffe6b3;">
          <div class="match-title">⏰ ${diario1Data.inicioFicha}</div>
          <div class="bet-example">✅ Confira as combinações e maximize seus ganhos! ✅</div>
        </div>
        <p style="font-size:12px; margin-top:12px; text-align:center;">💡 Tá Dentro - Exclusivo para Vencedores 💡</p>
      `;
    } else {
      popupContentHtml = `<div class="match-item"><div class="match-title">⚠️ Conteúdo em atualização</div><div class="bet-example">Em breve mais detalhes.</div></div>`;
    }
  } else {
    popupContentHtml = `
      <div class="match-item" style="text-align:center;">
        <div class="match-title">🚫 PALPITE INDISPONÍVEL 🚫</div>
        <div class="bet-example">📢 O conteúdo para <strong>${cardTitle}</strong> ainda não foi liberado.</div>
        <div class="bet-example">🔜 Fique atento às próximas atualizações ou adquira um plano superior.</div>
        <div class="bet-example">📞 Contacte-nos para mais informações sobre planos VIP.</div>
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
        ${popupContentHtml}
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  const closeBtn = overlay.querySelector('.close-popup');
  closeBtn.addEventListener('click', () => overlay.remove());
}

function scrollToContact() {
  const contactSection = document.getElementById('contactSection');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    contactSection.style.transition = 'all 0.3s ease';
    contactSection.style.boxShadow = '0 0 0 3px #f5c542';
    setTimeout(() => contactSection.style.boxShadow = '', 1500);
  }
}

function renderPlanos() {
  const container = document.getElementById('plansContainer');
  if (!container) return;
  container.innerHTML = '';
  planosList.forEach((plano, index) => {
    const planCard = document.createElement('div');
    planCard.className = 'plan-card';
    planCard.innerHTML = `
      <h3>${plano.nome}</h3>
      <div class="plan-price">${plano.preco}</div>
      <ul class="plan-features">
        ${plano.beneficios.map(b => `<li>✅ ${b}</li>`).join('')}
      </ul>
      <button class="btn-primary choose-plan-btn" data-plan-index="${index}" style="background:#f5c542; color:#1e3a2f; width:100%">ESCOLHER PLANO</button>
    `;
    container.appendChild(planCard);
  });
  document.querySelectorAll('.choose-plan-btn').forEach(btn => {
    btn.addEventListener('click', () => scrollToContact());
  });
}

function showPlanosScreen() {
  loginSection.classList.add('hidden-section');
  palpitesSection.classList.add('hidden-section');
  planosSection.classList.remove('hidden-section');
  updateHeader('planos');
  renderPlanos();
}

function handleRegistrar() {
  showPlanosScreen();
}

function handleEntrar() {
  const numero = document.getElementById('loginNumber').value.trim();
  const senha = document.getElementById('loginPassword').value.trim();
  const usuario = usuarios[numero];
  
  if (usuario && usuario.senha === senha) {
    currentUser = usuario.nome;
    currentUserNiveis = usuario.niveis;
    
    loginSection.classList.add('hidden-section');
    palpitesSection.classList.remove('hidden-section');
    planosSection.classList.add('hidden-section');
    renderPalpites();
    updateHeader('palpites', usuario.nome);
  } else {
    alert("❌ Acesso negado! Verifique número e senha.");
  }
}

function showPlanosFromRenew() {
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