// Dados dos palpites atualizados
const palpitesData = [
  { 
    id: "diario1", 
    titulo: "📆 DIÁRIO 1", 
    bets: [
      "🏆 Premier Bet físico: 67558748",
      "🐘 Elephant online: 761657",
      "🏬 Elephant Física: 947F133",
      "🟢 Bantu Bet: 758257",
      "💰 Kwanza Bet: indisponível"
    ],
    finished: false,
    odd: "20",
    aposta: "500 KZ",
    ganho: "10.000 KZ",
    detalhesEspeciais: [
      "🇪🇸 FC Andorra vs. Málaga CF → 1x2: FC Andorra",
      "🇪🇸 Racing Santander vs. Sporting Gijón → 1ª parte - 1x2: empate",
      "🇩🇿 JS Kabylie vs. ES Ben Aknoun → Parte mais produtiva: 2ª parte",
      "🇪🇸 SD Huesca vs. Cultural Leonesa → Total cantos: mais de 8.5",
      "🇪🇸 Burgos CF vs. AD Ceuta → Total golos: menos de 2.5"
    ],
    inicioFicha: "⏰ Início da ficha: 16h"
  },
  { 
    id: "diario2", 
    titulo: "📆 DIÁRIO 2", 
    bets: [
      "🏆 Premier Bet físico: 67564015",
      "🐘 Elephant online: 761014",
      "🏬 Elephant Física: 158E421",
      "🟢 Bantu Bet: 757788",
      "💰 Kwanza Bet: indisponível"
    ],
    finished: false,
    odd: "17",
    aposta: "500 KZ",
    ganho: "8.000 KZ",
    detalhesEspeciais: [
      "🇪🇸 Racing Santander vs. Sporting Gijón → Total cantos: mais de 9.5",
      "🇪🇸 SD Huesca vs. Cultural Leonesa → 1ª parte - 1x2: empate",
      "🇩🇿 JS Kabylie vs. ES Ben Aknoun → 1x2: JS Kabylie",
      "🇪🇸 Burgos CF vs. AD Ceuta → Parte mais produtiva: 2ª parte",
      "🇪🇸 FC Andorra vs. Málaga CF → Total golos: menos de 2.5"
    ],
    inicioFicha: "⏰ Início da ficha: 16h"
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
    id: "diario4", 
    titulo: "📆 DIÁRIO 4", 
    bets: ["📢 Indisponível: aguarde novos conteúdos"],
    unavailable: true,
    odd: "-",
    aposta: "-",
    ganho: "-"
  },
  { 
    id: "injetavel1", 
    titulo: "💉 INJETÁVEL 1", 
    bets: [
      "🏆 Premier Bet físico: 67565213",
      "🐘 Elephant online: 761014",
      "🏬 Elephant Física: 053C938",
      "🟢 Bantu Bet: 759426",
      "💰 Kwanza Bet: indisponível"
    ],
    finished: false,
    odd: "17",
    aposta: "500 KZ",
    ganho: "5.000 KZ",
    detalhesEspeciais: [
      "🇪🇸 Burgos CF vs. AD Ceuta → 1x2: Burgos CF",
      "🇩🇿 JS Kabylie vs. ES Ben Aknoun → Total golos: menos de 2.5",
      "🇪🇸 SD Huesca vs. Cultural Leonesa → 2 ganha qualq.Pt: não",
      "🇪🇸 FC Andorra vs. Málaga CF → Hipótese dupla: empate ou Málaga CF",
      "🇪🇸 Racing Santander vs. Sporting Gijón → Total golos: mais de 2.5"
    ],
    inicioFicha: "⏰ Início da ficha: 16h"
  },
  { 
    id: "injetavel2", 
    titulo: "💉 INJETÁVEL 2", 
    bets: ["📢 Indisponível: aguarde novos conteúdos"],
    unavailable: true,
    odd: "-",
    aposta: "-",
    ganho: "-"
  },
  { 
    id: "corrida1", 
    titulo: "🏁 CORRIDA 1", 
    bets: ["📢 Indisponível: aguarde novos conteúdos"],
    unavailable: true,
    odd: "-",
    aposta: "-",
    ganho: "-"
  },
  { 
    id: "corrida2", 
    titulo: "🏁 CORRIDA 2", 
    bets: ["📢 Indisponível: aguarde novos conteúdos"],
    unavailable: true,
    odd: "-",
    aposta: "-",
    ganho: "-"
  }
];

// Perfis de usuários - ATUALIZADO
const usuarios = {
  "888900": { senha: "2121", nome: "VENCEDOR BRONZE", niveis: { diario1: true, diario2: true, diario3: false, diario4: false, injetavel1: false, injetavel2: false, corrida1: false, corrida2: false } },
  "400600": { senha: "3030", nome: "VENCEDOR PRATA", niveis: { diario1: true, diario2: true, diario3: true, diario4: false, injetavel1: true, injetavel2: false, corrida1: true, corrida2: false } },
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
    } else if (item.finished) {
      betsHtml = `<div class="finished-text">🏁 ${item.bets[0]}<br><span style="font-size:0.8rem;">⏰ Aguarde novos palpites em breve!</span></div>`;
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
    const diarioData = palpitesData.find(p => p.id === 'diario1');
    if (diarioData && diarioData.detalhesEspeciais) {
      const matchesHtml = diarioData.detalhesEspeciais.map(match => `
        <div class="match-item">
          <div class="match-title">🎯 ${match}</div>
        </div>
      `).join('');
      popupContentHtml = `
        <div class="match-item" style="background:#d9f0c5;">
          <div class="match-title">📆 DIÁRIO 1 - PALPITES COMPLETOS 📆</div>
          <div class="bet-example">📊 Odds: ${diarioData.odd} | 💵 Aposta: ${diarioData.aposta} | 💰 Retorno: ${diarioData.ganho}</div>
        </div>
        ${matchesHtml}
        <div class="match-item" style="background:#ffe6b3;">
          <div class="match-title">⏰ ${diarioData.inicioFicha}</div>
          <div class="bet-example">✅ Aposte com responsabilidade e maximize seus ganhos! ✅</div>
        </div>
        <div class="contact-row" style="justify-content:center; margin-top:1rem;">
          <a href="https://wa.me/244958685897" class="contact-link" target="_blank" style="background:#25d366;">💬 Suporte WhatsApp</a>
        </div>
      `;
    }
  } 
  else if (cardId === 'diario2') {
    const diarioData = palpitesData.find(p => p.id === 'diario2');
    if (diarioData && diarioData.detalhesEspeciais) {
      const matchesHtml = diarioData.detalhesEspeciais.map(match => `
        <div class="match-item">
          <div class="match-title">🎯 ${match}</div>
        </div>
      `).join('');
      popupContentHtml = `
        <div class="match-item" style="background:#d9f0c5;">
          <div class="match-title">📆 DIÁRIO 2 - PALPITES COMPLETOS 📆</div>
          <div class="bet-example">📊 Odds: ${diarioData.odd} | 💵 Aposta: ${diarioData.aposta} | 💰 Retorno: ${diarioData.ganho}</div>
        </div>
        ${matchesHtml}
        <div class="match-item" style="background:#ffe6b3;">
          <div class="match-title">⏰ ${diarioData.inicioFicha}</div>
          <div class="bet-example">✅ Aposte com responsabilidade e maximize seus ganhos! ✅</div>
        </div>
        <div class="contact-row" style="justify-content:center; margin-top:1rem;">
          <a href="https://wa.me/244958685897" class="contact-link" target="_blank" style="background:#25d366;">💬 Suporte WhatsApp</a>
        </div>
      `;
    }
  }
  else if (cardId === 'injetavel1') {
    const injetavelData = palpitesData.find(p => p.id === 'injetavel1');
    if (injetavelData && injetavelData.detalhesEspeciais) {
      const matchesHtml = injetavelData.detalhesEspeciais.map(match => `
        <div class="match-item">
          <div class="match-title">🎯 ${match}</div>
        </div>
      `).join('');
      popupContentHtml = `
        <div class="match-item" style="background:#d9f0c5;">
          <div class="match-title">💉 INJETÁVEL 1 - PALPITES COMPLETOS 💉</div>
          <div class="bet-example">📊 Odds: ${injetavelData.odd} | 💵 Aposta: ${injetavelData.aposta} | 💰 Retorno: ${injetavelData.ganho}</div>
        </div>
        ${matchesHtml}
        <div class="match-item" style="background:#ffe6b3;">
          <div class="match-title">⏰ ${injetavelData.inicioFicha}</div>
          <div class="bet-example">✅ Aposte com responsabilidade e maximize seus ganhos! ✅</div>
        </div>
        <div class="contact-row" style="justify-content:center; margin-top:1rem;">
          <a href="https://wa.me/244958685897" class="contact-link" target="_blank" style="background:#25d366;">💬 Suporte WhatsApp</a>
        </div>
      `;
    }
  }
  else {
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