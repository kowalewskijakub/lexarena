// Dashboard page module
import { mockUser, mockCompetitions } from './data.js';

export function renderDashboard() {
  const u = mockUser;
  function getSeniorityDetails(pct) {
    if (pct < 20) return { title: 'Stażysta', color: '#94a3b8', gradient: ['#475569', '#94a3b8'] };
    if (pct < 40) return { title: 'Junior', color: '#10b981', gradient: ['#059669', '#34d399'] };
    if (pct < 60) return { title: 'Mid', color: '#3b82f6', gradient: ['#2563eb', '#60a5fa'] };
    if (pct < 85) return { title: 'Senior', color: '#8b5cf6', gradient: ['#7c3aed', '#a78bfa'] };
    return { title: 'Partner', color: '#f59e0b', gradient: ['#d97706', '#fbbf24'] };
  }

  const progressItems = Object.entries(u.progress).map(([key, val]) => {
    const labels = {
      cywilne: 'Prawo Cywilne', karne: 'Prawo Karne', administracyjne: 'Prawo Administracyjne',
      pracy: 'Prawo Pracy', konstytucyjne: 'Prawo Konstytucyjne', handlowe: 'Prawo Handlowe',
    };
    const s = getSeniorityDetails(val);
    return `
      <div class="progress-item">
        <div class="progress-header">
          <div class="progress-info">
            <span class="progress-name">${labels[key] || key}</span>
            <span class="progress-seniority" style="color: ${s.color}; border-color: ${s.color};">${s.title}</span>
          </div>
          <span class="progress-pct" style="color: ${s.color};">${val}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill seniority-fill" style="width:0%; background: linear-gradient(90deg, ${s.gradient[0]}, ${s.gradient[1]}); box-shadow: 0 0 10px ${s.color}66;" data-target="${val}"></div>
        </div>
      </div>`;
  }).join('');

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
            <h2>📊 Postępy w nauce</h2>
            ${progressItems}
          </div>
          <div style="margin-top:32px">
            <button class="btn btn-primary btn-lg" id="start-case-btn" style="width:100%">🎮 Rozwiąż nowy kazus</button>
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
  // Animate progress bars
  setTimeout(() => {
    document.querySelectorAll('.progress-fill').forEach(el => {
      el.style.width = el.dataset.target + '%';
    });
  }, 100);

  document.getElementById('start-case-btn')?.addEventListener('click', () => {
    window.location.hash = '#game';
  });
}
