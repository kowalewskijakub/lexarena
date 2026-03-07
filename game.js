// Game interface module — core BUBA gameplay
import { cases } from './cases.js';
import { mockUser, chatResponses } from './data.js';

let currentCase = null;
let flaggedParagraphs = new Set();
let submitted = false;
let chatHistory = [];
let difficulty = 'easy';

function getFilteredCases() {
  return cases.filter(c => c.difficulty === difficulty);
}

function selectCase() {
  const filtered = getFilteredCases();
  if (filtered.length === 0) return cases[Math.floor(Math.random() * cases.length)];
  return filtered[Math.floor(Math.random() * filtered.length)];
}

// Generate LEX references based on current case
function getLexReferences(caseData) {
  const refs = {
    'Prawo Cywilne': [
      { art: 'Art. 82 KC', title: 'Nieważność oświadczenia woli', desc: 'Nieważne jest oświadczenie woli złożone przez osobę, która z jakichkolwiek powodów znajdowała się w stanie wyłączającym świadome albo swobodne powzięcie decyzji...' },
      { art: 'Art. 388 KC', title: 'Wyzysk', desc: 'Jeżeli jedna ze stron, wyzyskując przymusowe położenie, niedołęstwo lub niedoświadczenie drugiej strony...' },
      { art: 'Art. 449¹ KC', title: 'Odpowiedzialność za produkt', desc: 'Kto wytwarza w zakresie swojej działalności gospodarczej produkt niebezpieczny, odpowiada za szkodę...' },
    ],
    'Prawo Karne': [
      { art: 'Art. 25 § 1 KK', title: 'Obrona konieczna', desc: 'Nie popełnia przestępstwa, kto w obronie koniecznej odpiera bezpośredni, bezprawny zamach na jakiekolwiek dobro chronione prawem.' },
      { art: 'Art. 25 § 3 KK', title: 'Przekroczenie granic', desc: 'Nie podlega karze, kto przekracza granice obrony koniecznej pod wpływem strachu lub wzburzenia...' },
    ],
    'Prawo Administracyjne': [
      { art: 'Art. 127 § 1 KPA', title: 'Odwołanie', desc: 'Od decyzji wydanej w pierwszej instancji służy stronie odwołanie tylko do jednej instancji.' },
      { art: 'Art. 101 u.s.g.', title: 'Skarga na uchwałę', desc: 'Każdy, czyj interes prawny lub uprawnienie zostały naruszone uchwałą, może zaskarżyć uchwałę do sądu administracyjnego.' },
    ],
    'Prawo Pracy': [
      { art: 'Art. 177 § 1 KP', title: 'Ochrona w ciąży', desc: 'Pracodawca nie może wypowiedzieć ani rozwiązać umowy o pracę w okresie ciąży oraz urlopu macierzyńskiego...' },
      { art: 'Art. 45 KP', title: 'Przywrócenie do pracy', desc: 'W razie ustalenia, że wypowiedzenie umowy o pracę jest nieuzasadnione lub narusza przepisy, sąd pracy orzeka...' },
      { art: 'Art. 47¹ KP', title: 'Odszkodowanie', desc: 'Odszkodowanie przysługuje w wysokości wynagrodzenia za okres od 2 tygodni do 3 miesięcy...' },
    ],
  };
  return refs[caseData.category] || refs['Prawo Cywilne'];
}

export function renderGame() {
  currentCase = selectCase();
  flaggedParagraphs = new Set();
  submitted = false;
  chatHistory = [
    { role: 'bot', text: 'Cześć! Jestem Twoim asystentem AI. Przeanalizuj kazus i napisz swoje rozwiązanie. Mogę pomóc — zadaj mi pytanie! 💡' },
  ];

  const diffBtns = ['easy', 'medium', 'hard'].map(d => {
    const labels = { easy: '🟢 Łatwy', medium: '🟡 Średni', hard: '🔴 Trudny' };
    return `<button class="diff-btn ${d === difficulty ? 'active' : ''}" data-diff="${d}">${labels[d]}</button>`;
  }).join('');

  const lexRefs = getLexReferences(currentCase);
  const lexHTML = lexRefs.map(r => `
    <div class="lex-item">
      <div class="lex-art">${r.art}</div>
      <div class="lex-title">${r.title}</div>
      <div class="lex-desc">${r.desc}</div>
    </div>`).join('');

  return `
    <div class="container">
      <div class="game-header">
        <h1>🎮 Arena</h1>
        <div class="game-controls">
          <div class="difficulty-selector">${diffBtns}</div>
          <button class="btn btn-primary btn-sm" id="submit-case">⚡ Sprawdź odpowiedzi</button>
          <button class="btn btn-secondary btn-sm" id="next-case">Następny kazus →</button>
        </div>
      </div>

      <div class="game-grid">
        <!-- Left column -->
        <div class="game-left">
          <div class="g-panel g-panel-case">
            <div class="g-panel-head">
              <span class="g-panel-icon">📋</span>
              <h2>Kazus</h2>
              <span class="g-badge g-badge-category">${currentCase.category}</span>
            </div>
            <div class="case-category">${currentCase.title} · Poziom: ${difficulty}</div>
            <div class="case-facts">${currentCase.facts}</div>
            <div class="case-question"><strong>Pytanie:</strong> ${currentCase.question}</div>
          </div>

          <div class="g-panel g-panel-solution">
            <div class="g-panel-head">
              <span class="g-panel-icon">✍️</span>
              <h2>Twoje rozwiązanie</h2>
              <span class="doc-wordcount" id="doc-wordcount">0 słów</span>
            </div>
            <div class="doc-toolbar">
              <button class="doc-tool" data-cmd="bold" title="Pogrubienie"><b>B</b></button>
              <button class="doc-tool" data-cmd="italic" title="Kursywa"><i>I</i></button>
              <button class="doc-tool" data-cmd="underline" title="Podkreślenie"><u>U</u></button>
              <span class="doc-sep"></span>
              <button class="doc-tool" data-cmd="formatBlock" data-val="H2" title="Nagłówek">H</button>
              <button class="doc-tool" data-cmd="insertUnorderedList" title="Lista">☰</button>
              <button class="doc-tool" data-cmd="insertOrderedList" title="Lista numerowana">1.</button>
            </div>
            <div class="doc-editor" contenteditable="true" id="user-solution" data-placeholder="Rozpocznij pisanie swojej analizy prawnej..."></div>
          </div>
        </div>

        <!-- Right column -->
        <div class="game-right">
          <div class="g-panel g-panel-ai">
            <div class="g-panel-head">
              <img src="/art/ai-judge.png" alt="AI" class="g-panel-art" />
              <div>
                <h2>AI Asystent</h2>
                <span class="g-panel-subtitle">W czym mogę Ci pomóc?</span>
              </div>
            </div>
            <div class="chat-messages" id="chat-messages">${renderChat()}</div>
            <div class="chat-input-row">
              <input class="chat-input" id="chat-input" placeholder="Zapytaj AI o wskazówkę..." />
              <button class="btn-send" id="chat-send">⚡</button>
            </div>
          </div>

          <div class="g-panel g-panel-lex">
            <div class="g-panel-head">
              <img src="/art/legal-book.png" alt="LEX" class="g-panel-art" />
              <div>
                <h2>LEX</h2>
                <span class="g-panel-subtitle">Baza przepisów</span>
              </div>
            </div>
            <div class="lex-content" id="lex-content">
              ${lexHTML}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="game-result" id="game-result" style="display:none"></div>
  `;
}

function renderChat() {
  return chatHistory.map(m =>
    `<div class="chat-msg ${m.role}">${m.text}</div>`
  ).join('');
}

function showResult() {
  const userSolution = document.getElementById('user-solution')?.innerText || '';

  const solutionLength = userSolution.trim().length;
  let baseScore = 0;
  if (solutionLength > 200) baseScore = 150;
  else if (solutionLength > 100) baseScore = 100;
  else if (solutionLength > 30) baseScore = 50;
  else baseScore = 10;

  const diffMultiplier = { easy: 1, medium: 1.5, hard: 2 }[difficulty] || 1;
  const score = Math.round(baseScore * diffMultiplier);
  const grade = score >= 200 ? 'great' : score >= 100 ? 'good' : 'poor';

  mockUser.xp += score;
  document.getElementById('nav-xp').textContent = mockUser.xp.toLocaleString();

  const resultEl = document.getElementById('game-result');
  resultEl.style.display = 'flex';
  resultEl.innerHTML = `
    <div class="result-card">
      <div class="result-art-bg"></div>
      <h2>${score >= 200 ? '🎉 Świetnie!' : score >= 100 ? '👍 Nieźle!' : '💪 Próbuj dalej!'}</h2>
      <div class="result-score ${grade}">+${score} XP</div>
      <div class="result-details">
        <div class="result-row"><span>Długość odpowiedzi</span><span>${solutionLength} znaków</span></div>
        <div class="result-row"><span>Mnożnik trudności</span><span class="result-highlight">×${diffMultiplier}</span></div>
      </div>
      <div class="result-model">
        <strong>📖 Wzorcowa odpowiedź:</strong><br><br>${currentCase.modelAnswer}
      </div>
      <h3 class="result-hall-title">⚠️ Halucynacje AI w tym kazusie:</h3>
      <div class="result-details">
        ${currentCase.aiParagraphs
      .filter(p => p.isHallucination)
      .map(p => `<div class="result-row"><span style="flex:1;font-size:0.82rem">⚠️ ${p.explanation}</span></div>`)
      .join('')}
      </div>
      <div class="result-actions">
        <button class="btn btn-primary" id="result-next">⚡ Następny kazus</button>
        <button class="btn btn-secondary" id="result-close">Zamknij</button>
      </div>
    </div>`;

  document.getElementById('result-next')?.addEventListener('click', () => {
    resultEl.style.display = 'none';
    renderAndInit();
  });
  document.getElementById('result-close')?.addEventListener('click', () => {
    resultEl.style.display = 'none';
  });
}

function renderAndInit() {
  document.getElementById('main-content').innerHTML = renderGame();
  initGame();
}

export function initGame() {
  // Difficulty selector
  document.querySelectorAll('.diff-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      difficulty = btn.dataset.diff;
      renderAndInit();
    });
  });

  // Submit
  document.getElementById('submit-case')?.addEventListener('click', () => {
    if (submitted) return;
    submitted = true;
    showResult();
  });

  // Next case
  document.getElementById('next-case')?.addEventListener('click', () => {
    renderAndInit();
  });

  // Chat
  document.getElementById('chat-send')?.addEventListener('click', sendChat);
  document.getElementById('chat-input')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendChat();
  });

  // Document editor toolbar
  document.querySelectorAll('.doc-tool').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const cmd = btn.dataset.cmd;
      const val = btn.dataset.val || null;
      document.execCommand(cmd, false, val);
      document.getElementById('user-solution')?.focus();
    });
  });

  // Word count
  const editor = document.getElementById('user-solution');
  if (editor) {
    editor.addEventListener('input', () => {
      const text = editor.innerText.trim();
      const words = text ? text.split(/\s+/).length : 0;
      const counter = document.getElementById('doc-wordcount');
      if (counter) counter.textContent = `${words} ${words === 1 ? 'słowo' : 'słów'}`;
    });
  }
}

function sendChat() {
  const input = document.getElementById('chat-input');
  const msg = input?.value.trim();
  if (!msg) return;

  chatHistory.push({ role: 'user', text: msg });
  input.value = '';

  setTimeout(() => {
    const response = chatResponses[Math.floor(Math.random() * chatResponses.length)];
    chatHistory.push({ role: 'bot', text: response });
    const container = document.getElementById('chat-messages');
    if (container) {
      container.innerHTML = renderChat();
      container.scrollTop = container.scrollHeight;
    }
  }, 600);

  const container = document.getElementById('chat-messages');
  if (container) {
    container.innerHTML = renderChat();
    container.scrollTop = container.scrollHeight;
  }
}
