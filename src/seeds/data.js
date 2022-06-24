const todayDate = new Date().toLocaleDateString('fr-FR', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
})

export const seeds = {
  status: [
    { color: '#ccc', comment: 'new', text: ' ', rank: 10 },
    { color: 'lightgreen', comment: 'Like', text: '🤍', rank: 60 },
    { color: 'lightgreen', comment: 'Message send', text: '📬', rank: 50 },
    { color: 'red', comment: 'Not fitting', text: '👎', rank: 40 },
    { color: 'red', comment: 'Too junior', text: '👶', rank: 30 },
    { color: 'red', comment: 'Freelance refusal', text: '🙅‍♂️', rank: 20 },
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
