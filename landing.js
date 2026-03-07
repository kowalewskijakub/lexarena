// Landing page module
export function renderLanding() {
  return `
    <section class="hero">
      <div class="floating-icons" id="floating-icons"></div>
      <div class="hero-content">
        <div class="hero-badge">🚀 Nowa era edukacji prawniczej</div>
        <h1>Prawo × AI × Gamifikacja</h1>
        <p>Rozwiązuj kazusy prawne, identyfikuj halucynacje AI i rywalizuj na rankingach. Przygotuj się do aplikacji jak nigdy dotąd.</p>
        <div class="hero-actions">
          <button class="btn btn-primary btn-lg pulse" id="hero-cta">⚡ Rozpocznij naukę</button>
          <button class="btn btn-secondary btn-lg" id="hero-demo">Zobacz jak to działa</button>
        </div>
        <div class="hero-stats">
          <div><div class="hero-stat-value">500+</div><div class="hero-stat-label">Kazusów</div></div>
          <div><div class="hero-stat-value">2.4k</div><div class="hero-stat-label">Studentów</div></div>
          <div><div class="hero-stat-value">12</div><div class="hero-stat-label">Kancelarii</div></div>
          <div><div class="hero-stat-value">95%</div><div class="hero-stat-label">Satysfakcji</div></div>
        </div>
      </div>
    </section>

    <section class="section problems-section">
      <div class="container">
        <div class="section-header">
          <h2>Problem, który rozwiązujemy</h2>
          <p>Tradycyjna edukacja prawnicza nie nadąża za erą AI</p>
        </div>
        <div class="grid-3">
          <div class="card problem-card">
            <div class="card-icon">🤖</div>
            <div class="card-title">Brak edukacji AI w prawie</div>
            <div class="card-desc">Studenci prawa nie uczą się, jak korzystać z AI w praktyce prawniczej — ani jak rozpoznawać jego błędy i halucynacje.</div>
          </div>
          <div class="card problem-card">
            <div class="card-icon">📚</div>
            <div class="card-title">Nudna nauka kazusów</div>
            <div class="card-desc">Istniejące repozytoria (Beck, Arslege) to suche bazy danych bez gamifikacji, bez motywacji, bez rywalizacji.</div>
          </div>
          <div class="card problem-card">
            <div class="card-icon">🎯</div>
            <div class="card-title">Brak praktycznych doświadczeń</div>
            <div class="card-desc">Studenci i aplikanci nie mają doświadczenia w pracy z realnymi kazusami przed egzaminem lub praktyką w kancelarii.</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2>Jak działa Lex Arena?</h2>
          <p>Gamifikacja edukacji prawnej w starciu z halucynacjami AI</p>
        </div>
        <div class="grid-4">
          <div class="card feature-card">
            <div class="card-icon">📋</div>
            <div class="card-title">Rozwiąż kazus</div>
            <div class="card-desc">Otrzymaj kazus oparty na bazie SAOS — wybierz poziom trudności i dziedzinę prawa.</div>
          </div>
          <div class="card feature-card">
            <div class="card-icon">🔍</div>
            <div class="card-title">Zidentyfikuj halucynacje</div>
            <div class="card-desc">AI generuje odpowiedź z celowymi błędami. Twoim zadaniem jest znaleźć halucynacje.</div>
          </div>
          <div class="card feature-card">
            <div class="card-icon">💬</div>
            <div class="card-title">Otrzymaj feedback</div>
            <div class="card-desc">Chatbot podpowiada lepsze prompty i analizuje Twoje odpowiedzi w czasie rzeczywistym.</div>
          </div>
          <div class="card feature-card">
            <div class="card-icon">🏆</div>
            <div class="card-title">Rywalizuj i ucz się</div>
            <div class="card-desc">Zbieraj XP, wspinaj się na rankingach i bierz udział w konkursach kancelaryjnych.</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section problems-section">
      <div class="container">
        <div class="section-header">
          <h2>Dla kogo jest Lex Arena?</h2>
          <p>Poznaj naszych użytkowników</p>
        </div>
        <div class="grid-2">
          <div class="persona-card">
            <div class="persona-avatar female">A</div>
            <div>
              <div class="persona-name">Asia, 26 lat</div>
              <div class="persona-role">Aplikantka radcowska, pracuje w kancelarii</div>
              <div class="persona-desc">Chce przygotować się do egzaminu zawodowego i jednocześnie nauczyć się korzystać z AI w praktyce prawniczej. Potrzebuje realistycznych kazusów i feedbacku.</div>
            </div>
          </div>
          <div class="persona-card">
            <div class="persona-avatar male">B</div>
            <div>
              <div class="persona-name">Błażej, 20 lat</div>
              <div class="persona-role">Student II roku prawa</div>
              <div class="persona-desc">Właśnie przeczytał art. 5 KC i chce rozpocząć praktyczną naukę. Szuka gamifikowanego rozwiązania, które sprawi, że nauka prawa będzie atrakcyjna.</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer class="footer">
      <div class="container">
        <p>© 2026 Lex Arena — Gamifikacja Edukacji Prawniczej z AI</p>
      </div>
    </footer>
  `;
}

export function initLanding() {
  // Floating icons
  const container = document.getElementById('floating-icons');
  if (container) {
    const icons = ['§', '⚖️', '📋', '🔍', '🤖', '💼', '📜', '🏛️', '⚡', '🎓'];
    icons.forEach((icon, i) => {
      const el = document.createElement('span');
      el.className = 'floating-icon';
      el.textContent = icon;
      el.style.left = `${Math.random() * 100}%`;
      el.style.animationDelay = `${i * 2}s`;
      el.style.animationDuration = `${15 + Math.random() * 10}s`;
      container.appendChild(el);
    });
  }

  document.getElementById('hero-cta')?.addEventListener('click', () => {
    window.location.hash = '#dashboard';
  });
  document.getElementById('hero-demo')?.addEventListener('click', () => {
    window.location.hash = '#game';
  });
}
