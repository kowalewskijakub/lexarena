// Leaderboard page module
import { mockLeaderboard, mockCompetitions } from './data.js';

let activeFilter = 'all';

export function renderLeaderboard() {
    const top3 = mockLeaderboard.slice(0, 3);
    const podiumOrder = [top3[1], top3[0], top3[2]]; // silver, gold, bronze
    const medals = ['🥈', '🥇', '🥉'];

    const podiumHTML = podiumOrder.map((u, i) => {
        const heights = [160, 210, 140];
        return `
      <div class="podium-item" style="width:140px">
        <div class="podium-place" style="min-height:${heights[i]}px;${i === 1 ? 'background:rgba(245,158,11,0.05);border-color:rgba(245,158,11,0.2)' : ''}">
          <div class="podium-rank">${medals[i]}</div>
          <div class="podium-avatar" style="background:linear-gradient(135deg,${u.color},var(--secondary))">${u.initials}</div>
          <div class="podium-name">${u.name.split(' ')[0]}</div>
          <div class="podium-xp">${u.xp.toLocaleString()} XP</div>
        </div>
        <div class="podium-bar" style="height:8px;background:${u.color}"></div>
      </div>`;
    }).join('');

    const rows = mockLeaderboard.map((u, i) => `
    <tr${u.initials === 'BŁ' ? ' style="background:rgba(139,92,246,0.06)"' : ''}>
      <td class="rank-num">${i + 1}</td>
      <td><div class="rank-user">
        <div class="rank-avatar" style="background:linear-gradient(135deg,${u.color},var(--secondary))">${u.initials}</div>
        <span>${u.name}${u.initials === 'BŁ' ? ' (Ty)' : ''}</span>
      </div></td>
      <td class="rank-xp">${u.xp.toLocaleString()}</td>
      <td>${u.cases}</td>
      <td>🔥 ${u.streak}</td>
    </tr>`).join('');

    const compCards = mockCompetitions.filter(c => c.status === 'active').map(c => `
    <div class="competition-card">
      <div class="competition-icon">${c.icon}</div>
      <div class="competition-info">
        <div class="competition-name">${c.name}</div>
        <div class="competition-meta">${c.participants} uczestników · ${c.prize}</div>
      </div>
      <button class="btn btn-primary btn-sm">Dołącz</button>
    </div>`).join('');

    return `
    <div class="leaderboard container">
      <h1>🏆 Ranking</h1>

      <div class="podium">${podiumHTML}</div>

      <div class="filter-tabs">
        <button class="filter-tab active" data-filter="all">Ogólny</button>
        <button class="filter-tab" data-filter="monthly">Miesięczny</button>
        <button class="filter-tab" data-filter="weekly">Tygodniowy</button>
      </div>

      <div class="grid-2">
        <div>
          <table class="ranking-table">
            <thead><tr>
              <th>#</th><th>Użytkownik</th><th>XP</th><th>Kazusy</th><th>Streak</th>
            </tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
        <div>
          <div class="competitions-section">
            <h2>🏛️ Konkursy kancelaryjne</h2>
            ${compCards}
          </div>
        </div>
      </div>
    </div>`;
}

export function initLeaderboard() {
    document.querySelectorAll('.filter-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}
