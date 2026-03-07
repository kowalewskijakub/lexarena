// Dashboard page module
import { mockUser, mockCompetitions } from './data.js';

export function renderDashboard() {
  const u = mockUser;
  function getSeniorityDetails(pct) {
    if (pct < 20) return { title: 'Początkujący', color: '#94a3b8', gradient: ['#475569', '#94a3b8'] };
    if (pct < 40) return { title: 'Podstawowy', color: '#10b981', gradient: ['#059669', '#34d399'] };
    if (pct < 60) return { title: 'Średniozaawansowany', color: '#3b82f6', gradient: ['#2563eb', '#60a5fa'] };
    if (pct < 85) return { title: 'Zaawansowany', color: '#8b5cf6', gradient: ['#7c3aed', '#a78bfa'] };
    return { title: 'Ekspert', color: '#f59e0b', gradient: ['#d97706', '#fbbf24'] };
  }

  const labels = {
    cywilne: 'Prawo cywilne', karne: 'Prawo karne', administracyjne: 'Prawo administracyjne',
    pracy: 'Prawo pracy', konstytucyjne: 'Prawo konstytucyjne', handlowe: 'Prawo handlowe',
  };
  const entries = Object.entries(u.progress);
  const n = entries.length;
  const cx = 220, cy = 180, r = 100;

  function polarX(i, pct) { return cx + r * (pct / 100) * Math.cos(2 * Math.PI * i / n - Math.PI / 2); }
  function polarY(i, pct) { return cy + r * (pct / 100) * Math.sin(2 * Math.PI * i / n - Math.PI / 2); }

  // Grid rings at 20, 40, 60, 80, 100%
  const gridRings = [20, 40, 60, 80, 100].map(pct => {
    const pts = entries.map((_, i) => `${polarX(i, pct)},${polarY(i, pct)}`).join(' ');
    return `<polygon points="${pts}" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>`;
  }).join('');

  // Axis lines
  const axisLines = entries.map((_, i) =>
    `<line x1="${cx}" y1="${cy}" x2="${polarX(i, 100)}" y2="${polarY(i, 100)}" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>`
  ).join('');

  // Data polygon
  const dataPoints = entries.map(([, val], i) => `${polarX(i, val)},${polarY(i, val)}`).join(' ');

  // Labels
  const labelEls = entries.map(([key, val], i) => {
    const s = getSeniorityDetails(val);
    const lx = polarX(i, 125);
    const ly = polarY(i, 125);
    const anchor = lx < cx - 5 ? 'end' : lx > cx + 5 ? 'start' : 'middle';
    return `
      <text x="${lx}" y="${ly}" text-anchor="${anchor}" dominant-baseline="middle" fill="var(--text)" font-size="11" font-weight="600">${labels[key]}</text>
      <text x="${lx}" y="${ly + 15}" text-anchor="${anchor}" dominant-baseline="middle" fill="${s.color}" font-size="10">${val}% · ${s.title}</text>`;
  }).join('');

  // Dots on vertices
  const dots = entries.map(([, val], i) => {
    const s = getSeniorityDetails(val);
    return `<circle cx="${polarX(i, val)}" cy="${polarY(i, val)}" r="4" fill="${s.color}" stroke="white" stroke-width="1.5"/>`;
  }).join('');

  const radarChart = `
    <svg viewBox="0 0 440 370" class="radar-chart">
      <defs>
        <linearGradient id="radar-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#6366f1" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#a855f7" stop-opacity="0.3"/>
        </linearGradient>
      </defs>
      ${gridRings}
      ${axisLines}
      <polygon points="${dataPoints}" fill="url(#radar-fill)" stroke="#818cf8" stroke-width="2" class="radar-data"/>
      ${dots}
      ${labelEls}
    </svg>`;

  const competitionCards = mockCompetitions.map(c => `
    <div class="competition-card">
      <div class="competition-icon">${c.icon}</div>
      <div class="competition-info">
        <div class="competition-name">${c.name}</div>
        <div class="competition-meta">${c.participants} uczestników · do ${c.endDate}</div>
        ${c.prize ? `<div class="competition-meta" style="color:var(--accent)">${c.prize}</div>` : ''}
      </div>
      <span class="competition-badge ${c.status}">${c.status === 'active' ? '🟢 Aktywny' : '🔵 Wkrótce'}</span>
    </div>`).join('');

  return `
    <div class="dashboard container">
      <div class="dashboard-greeting">
        <h1>Cześć, ${u.name}! 👋</h1>
        <p>Kontynuuj naukę i rozwiąż kolejny kazus, żeby utrzymać streak.</p>
      </div>

      <div class="grid-4">
        <div class="stat-card">
          <div class="stat-icon">⚡</div>
          <div class="stat-value xp">${u.xp.toLocaleString()}</div>
          <div class="stat-label">Punkty XP</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🔥</div>
          <div class="stat-value streak">${u.streak}</div>
          <div class="stat-label">Streak (dni)</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⭐</div>
          <div class="stat-value level">${u.level}</div>
          <div class="stat-label">Poziom</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📋</div>
          <div class="stat-value cases">${u.casesSolved}</div>
          <div class="stat-label">Rozwiązane kazusy</div>
        </div>
      </div>

      <div class="grid-2" style="margin-top:40px">
        <div>
          <div class="progress-section">
            <h2>📊 Mapa kompetencji</h2>
            ${radarChart}
          </div>
        </div>
        <div>
          <div class="competitions-section">
            <h2>🏆 Aktywne konkursy</h2>
            ${competitionCards}
          </div>
        </div>
      </div>
    </div>`;
}

export function initDashboard() {
}
