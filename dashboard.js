// Dashboard page module
import { mockUser, mockCompetitions } from './data.js';

export function renderDashboard() {
    const u = mockUser;
    const progressItems = Object.entries(u.progress).map(([key, val]) => {
        const labels = {
            cywilne: 'Prawo Cywilne', karne: 'Prawo Karne', administracyjne: 'Prawo Administracyjne',
            pracy: 'Prawo Pracy', konstytucyjne: 'Prawo Konstytucyjne', handlowe: 'Prawo Handlowe',
        };
        return `
      <div class="progress-item">
        <div class="progress-header">
          <span class="progress-name">${labels[key] || key}</span>
          <span class="progress-pct">${val}%</span>
        </div>
        <div class="progress-bar"><div class="progress-fill" style="width:0%" data-target="${val}"></div></div>
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
