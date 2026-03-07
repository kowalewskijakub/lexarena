// Arena level selection — skill trees per law area

const lawTrees = [
  {
    id: 'cywilne',
    title: 'Prawo cywilne',
    icon: '\u2696\uFE0F',
    color: '#6366f1',
    levels: [
      { id: 'c1', title: 'Zdolność prawna', subtitle: 'Zdolność do czynności prawnych', stars: 3, unlocked: true },
      { id: 'c2', title: 'Wady oświadczenia woli', subtitle: 'Błąd, podstęp, groźba', stars: 2, unlocked: true },
      { id: 'c3', title: 'Forma czynności prawnych', subtitle: 'Pisemna, notarialna, elektroniczna', stars: 1, unlocked: true,
        branches: [
          { id: 'c3a', title: 'Forma notarialna', subtitle: 'Akt notarialny i jego skutki', stars: 0, unlocked: true },
          { id: 'c3b', title: 'Forma elektroniczna', subtitle: 'Podpis elektroniczny', stars: 0, unlocked: false },
        ]
      },
      { id: 'c4', title: 'Przedstawicielstwo', subtitle: 'Pełnomocnictwo i prokura', stars: 0, unlocked: true },
      { id: 'c5', title: 'Przedawnienie roszczeń', subtitle: 'Terminy i skutki', stars: 0, unlocked: true },
      { id: 'c6', title: 'Odpowiedzialność deliktowa', subtitle: 'Art. 415 i nast. KC', stars: 0, unlocked: false,
        branches: [
          { id: 'c6a', title: 'Wina w nadzorze', subtitle: 'Art. 427 KC', stars: 0, unlocked: false },
          { id: 'c6b', title: 'Zasada ryzyka', subtitle: 'Art. 435 KC', stars: 0, unlocked: false },
        ]
      },
      { id: 'c7', title: 'Odpowiedzialność kontraktowa', subtitle: 'Niewykonanie zobowiązań', stars: 0, unlocked: false },
      { id: 'c8', title: 'Zasady współżycia społecznego', subtitle: 'Klauzula generalna art. 5 KC', stars: 0, unlocked: false },
      { id: 'c9', title: 'Bezpodstawne wzbogacenie', subtitle: 'Nienależne świadczenie', stars: 0, unlocked: false },
      { id: 'c10', title: 'Produkt niebezpieczny', subtitle: 'Odpowiedzialność obiektywna', stars: 0, unlocked: false },
    ],
  },
  {
    id: 'karne',
    title: 'Prawo karne',
    icon: '\uD83D\uDD28',
    color: '#ef4444',
    levels: [
      { id: 'k1', title: 'Zasady odpowiedzialności', subtitle: 'Nullum crimen sine lege', stars: 2, unlocked: true },
      { id: 'k2', title: 'Formy winy', subtitle: 'Umyślność i nieumyślność', stars: 1, unlocked: true },
      { id: 'k3', title: 'Obrona konieczna', subtitle: 'Art. 25 KK', stars: 0, unlocked: true,
        branches: [
          { id: 'k3a', title: 'Przekroczenie granic', subtitle: 'Eksces intensywny i ekstensywny', stars: 0, unlocked: true },
          { id: 'k3b', title: 'Stan wyższej konieczności', subtitle: 'Art. 26 KK', stars: 0, unlocked: false },
        ]
      },
      { id: 'k4', title: 'Formy stadialne', subtitle: 'Przygotowanie, usiłowanie, dokonanie', stars: 0, unlocked: true },
      { id: 'k5', title: 'Współsprawstwo', subtitle: 'Formy zjawiskowe przestępstwa', stars: 0, unlocked: false },
      { id: 'k6', title: 'Kary i środki karne', subtitle: 'System sankcji', stars: 0, unlocked: false },
      { id: 'k7', title: 'Przestępstwa przeciwko życiu', subtitle: 'Art. 148-162 KK', stars: 0, unlocked: false },
      { id: 'k8', title: 'Przestępstwa przeciwko mieniu', subtitle: 'Kradzież, rozbój, oszustwo', stars: 0, unlocked: false },
    ],
  },
  {
    id: 'administracyjne',
    title: 'Prawo administracyjne',
    icon: '\uD83C\uDFDB\uFE0F',
    color: '#10b981',
    levels: [
      { id: 'a1', title: 'Zasady ogólne KPA', subtitle: 'Legalność, prawdy obiektywnej', stars: 1, unlocked: true },
      { id: 'a2', title: 'Decyzja administracyjna', subtitle: 'Elementy i skutki prawne', stars: 0, unlocked: true },
      { id: 'a3', title: 'Odwołanie od decyzji', subtitle: 'Art. 127 KPA', stars: 0, unlocked: true,
        branches: [
          { id: 'a3a', title: 'Wniosek o ponowne rozpatrzenie', subtitle: 'Art. 127 § 3 KPA', stars: 0, unlocked: false },
          { id: 'a3b', title: 'Skarga do WSA', subtitle: 'Kontrola sądowa', stars: 0, unlocked: false },
        ]
      },
      { id: 'a4', title: 'Postępowanie egzekucyjne', subtitle: 'Środki egzekucji administracyjnej', stars: 0, unlocked: false },
      { id: 'a5', title: 'Planowanie przestrzenne', subtitle: 'MPZP i decyzja WZ', stars: 0, unlocked: false },
      { id: 'a6', title: 'Samorząd terytorialny', subtitle: 'Gmina, powiat, województwo', stars: 0, unlocked: false },
    ],
  },
];

function renderTile(lvl) {
  const starsHTML = [1, 2, 3].map(s =>
    `<span class="lt-star ${s <= lvl.stars ? 'earned' : ''}">${s <= lvl.stars ? '\u2605' : '\u2606'}</span>`
  ).join('');
  const statusClass = !lvl.unlocked ? 'locked' : lvl.stars > 0 ? 'completed' : 'current';

  return `
    <div class="level-tile ${statusClass}" data-level="${lvl.id}">
      <div class="lt-top">
        <div class="lt-number">${!lvl.unlocked ? '\uD83D\uDD12' : lvl.title.charAt(0)}</div>
      </div>
      <div class="lt-body">
        <div class="lt-title">${lvl.title}</div>
        <div class="lt-subtitle">${lvl.subtitle}</div>
      </div>
      <div class="lt-bottom">
        ${lvl.unlocked ? `<div class="lt-stars">${starsHTML}</div>` : '<span class="lt-locked-text">Zablokowany</span>'}
      </div>
    </div>`;
}

function renderBranchTile(lvl) {
  const starsHTML = [1, 2, 3].map(s =>
    `<span class="lt-star ${s <= lvl.stars ? 'earned' : ''}">${s <= lvl.stars ? '\u2605' : '\u2606'}</span>`
  ).join('');
  const statusClass = !lvl.unlocked ? 'locked' : lvl.stars > 0 ? 'completed' : 'current';

  return `
    <div class="level-tile lt-branch ${statusClass}" data-level="${lvl.id}">
      <div class="lt-top">
        <div class="lt-number">${!lvl.unlocked ? '\uD83D\uDD12' : lvl.title.charAt(0)}</div>
      </div>
      <div class="lt-body">
        <div class="lt-title">${lvl.title}</div>
        <div class="lt-subtitle">${lvl.subtitle}</div>
      </div>
      <div class="lt-bottom">
        ${lvl.unlocked ? `<div class="lt-stars">${starsHTML}</div>` : '<span class="lt-locked-text">Zablokowany</span>'}
      </div>
    </div>`;
}

function renderTrack(tree) {
  let html = '';

  tree.levels.forEach((lvl, i) => {
    if (i > 0) html += `<div class="lt-conn"></div>`;

    // Wrap tile + its branches in a column container
    const hasBranches = lvl.branches && lvl.branches.length;
    html += `<div class="lt-node ${hasBranches ? 'has-branches' : ''}">`;
    html += renderTile(lvl);
    if (hasBranches) {
      html += `<div class="lt-stem"></div>`;
      html += `<div class="lt-branches">`;
      html += lvl.branches.map(b => renderBranchTile(b)).join('');
      html += `</div>`;
    }
    html += `</div>`;
  });

  return html;
}

export function renderArenaLevels() {
  const sections = lawTrees.map(tree => `
    <div class="arena-section">
      <div class="arena-section-header">
        <span class="arena-section-icon">${tree.icon}</span>
        <h2>${tree.title}</h2>
        <span class="arena-section-count">${tree.levels.length} rozdziałów</span>
      </div>
      <div class="level-scroll-wrapper">
        <div class="level-track" style="--tree-color: ${tree.color}">
          ${renderTrack(tree)}
        </div>
      </div>
    </div>
  `).join('');

  return `
    <div class="arena-levels container">
      <div class="arena-levels-header">
        <h1>Arena</h1>
        <p>Wybierz dziedzinę prawa i rozwiązuj kazusy</p>
      </div>
      ${sections}
    </div>`;
}

export function initArenaLevels() {
  document.querySelectorAll('.level-tile:not(.locked)').forEach(node => {
    node.addEventListener('click', () => {
      window.location.hash = '#game';
    });
  });
}
