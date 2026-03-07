// Mock data for BUBA application

export const mockUser = {
  name: 'Błażej',
  initials: 'BŁ',
  xp: 2450,
  level: 7,
  streak: 12,
  casesSolved: 34,
  progress: {
    cywilne: 65,
    karne: 40,
    administracyjne: 25,
    pracy: 15,
    konstytucyjne: 50,
    handlowe: 10,
  },
};

export const mockCompetitions = [
  {
    id: 1,
    name: 'Challenge Kancelarii Wardyński',
    icon: '🏛️',
    status: 'active',
    endDate: '2026-03-21',
    participants: 234,
    prize: 'Staż w kancelarii + 5000 PLN',
  },
  {
    id: 2,
    name: 'Konkurs Prawo Cywilne Q1',
    icon: '⚖️',
    status: 'active',
    endDate: '2026-03-31',
    participants: 567,
    prize: 'Roczna subskrypcja LEX + certyfikat',
  },
  {
    id: 3,
    name: 'AI × Prawo Hackathon',
    icon: '🤖',
    status: 'upcoming',
    endDate: '2026-04-15',
    participants: 0,
    prize: 'MacBook Pro + mentoring',
  },
];

export const mockLeaderboard = [
  { rank: 1, name: 'Marta Kowalczyk', initials: 'MK', xp: 12450, cases: 98, streak: 45, color: '#ec4899' },
  { rank: 2, name: 'Tomasz Nowak', initials: 'TN', xp: 11200, cases: 87, streak: 32, color: '#3b82f6' },
  { rank: 3, name: 'Asia Wiśniewska', initials: 'AW', xp: 10800, cases: 82, streak: 28, color: '#8b5cf6' },
  { rank: 4, name: 'Piotr Zieliński', initials: 'PZ', xp: 9500, cases: 74, streak: 21, color: '#06b6d4' },
  { rank: 5, name: 'Karolina Szymańska', initials: 'KS', xp: 8900, cases: 69, streak: 19, color: '#f59e0b' },
  { rank: 6, name: 'Michał Lewandowski', initials: 'ML', xp: 7600, cases: 56, streak: 15, color: '#10b981' },
  { rank: 7, name: 'Błażej Dąbrowski', initials: 'BŁ', xp: 2450, cases: 34, streak: 12, color: '#8b5cf6' },
  { rank: 8, name: 'Natalia Jankowska', initials: 'NJ', xp: 2100, cases: 28, streak: 8, color: '#ec4899' },
  { rank: 9, name: 'Jakub Mazur', initials: 'JM', xp: 1800, cases: 22, streak: 6, color: '#3b82f6' },
  { rank: 10, name: 'Oliwia Krawczyk', initials: 'OK', xp: 1500, cases: 18, streak: 4, color: '#06b6d4' },
];

export const chatResponses = [
  'Spróbuj sprawdzić, czy podane artykuły faktycznie istnieją w danej ustawie. AI często "wymyśla" numery artykułów.',
  'Zwróć uwagę na cytowane orzeczenia sądowe — czy sygnatura wygląda realistycznie?',
  'Dobra obserwacja! Pamiętaj, żeby zweryfikować podstawę prawną. Halucynacje AI często dotyczą konkretnych przepisów.',
  'Spróbuj porównać wnioski AI z zasadami ogólnymi danej gałęzi prawa. Czy są spójne?',
  'Świetny prompt! Pamiętaj — im bardziej szczegółowe pytanie, tym łatwiej zidentyfikować halucynacje.',
  'Zwróć uwagę na terminy i procedury. AI może podawać nieprawidłowe terminy procesowe.',
];
