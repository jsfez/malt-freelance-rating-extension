const todayDate = new Date().toLocaleDateString('fr-FR', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
})

export const seeds = {
  status: [
    { color: '#ccc', comment: 'Nouveau', text: ' ', rank: 10 },
    { color: 'lightgreen', comment: 'Profile adapté', text: ' ', rank: 60 },
    { color: 'lightgreen', comment: 'Message envoyé', text: '📬', rank: 50 },
    { color: 'red', comment: 'Pas adapté', text: ' ', rank: 40 },
    { color: 'red', comment: 'Profil Junior', text: '👶', rank: 30 },
    { color: 'red', comment: 'Refus du freelance', text: '🙅‍♂️', rank: 20 },
  ],
  currentSearchIndex: 0,
  searches: [
    {
      id: 0,
      name: 'First list',
      missionStartDate: todayDate,
      skills: 'php, lead',
    },
    {
      id: 1,
      name: 'JS dev',
      missionStartDate: todayDate,
      skills: 'js, react',
    },
  ],
}
