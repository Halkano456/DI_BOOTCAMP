const pool = require('../config/db');

const staticRows = [
  { request: 'PostgreSQL', skills: 'PostgreSQL', credits: '28 credits', offer: 'Offer' },
  { request: 'React.js', skills: 'AWS', credits: '28 credits', offer: 'Medium' },
  { request: 'React.js', skills: 'Cybersecurity', credits: '28 credits', offer: 'Medium' },
  { request: 'AWS', skills: 'React.js', credits: '28 credits', offer: 'Medium' },
  { request: 'Cybersecurity', skills: 'AWS', credits: '28 credits', offer: 'Offer' }
];

const recentTransactions = [
  { title: 'Gained 2 credits from teaching Python', value: '+2 credits' },
  { title: 'Gained 2 credits from teaching Python', value: '+2 credits' }
];

const activeSessions = [
  { name: 'Liam J.', detail: 'Learning AWS with Chloe - 15m remaining' },
  { name: 'Chloe', detail: 'Learning AWS with Chloe - 15m remaining' }
];

const fallbackDashboard = {
  recommendedMatches: [
    {
      name: 'Aisha K.',
      role: 'Full-Stack Developer looking for marketing help',
      tags: ['Python', 'Cybersecurity', 'Figma'],
      offers: 'Python, Cybersecurity help',
      seeks: 'AWS, Figma',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Ben L.',
      role: 'UX/UI Designer learning database structures',
      tags: ['PostgreSQL', 'React.js', 'Figma'],
      offers: 'PostgreSQL, React.js',
      seeks: 'Figma, Cybersecurity help',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Aisha K.',
      role: 'Full-Stack Developer looking for marketing help',
      tags: ['Full-Stack', 'React.js', 'Design'],
      offers: 'Full-Stack Developer',
      seeks: 'Figma, React.js',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Ben L.',
      role: 'UX/UI Designer learning database structures',
      tags: ['UX/UI', 'Cybersecurity', 'Figma'],
      offers: 'Full-Stack, Cybersecurity',
      seeks: 'UX/UI, Figma',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80'
    }
  ],
  marketRows: staticRows,
  recentTransactions,
  activeSessions,
  stats: { credits: 28 }
};

async function getDashboard(req, res, next) {
  try {
    const result = await pool.query(
      `SELECT u.id,
              u.name,
              u.role,
              u.credits,
              COALESCE(u.avatar_url, '') AS avatar_url,
              json_agg(s.name) FILTER (WHERE us.is_teaching) AS offers,
              json_agg(s.name) FILTER (WHERE NOT us.is_teaching) AS seeks
       FROM users u
       LEFT JOIN user_skills us ON us.user_id = u.id
       LEFT JOIN skills s ON s.id = us.skill_id
       GROUP BY u.id
       ORDER BY u.id
       LIMIT 6`
    );

    const recommendedMatches = result.rows.length > 0
      ? result.rows.map((row, index) => ({
          name: row.name,
          role: row.role,
          tags: [
            ...(row.offers || []).slice(0, 2),
            ...(row.seeks || []).slice(0, 1)
          ],
          offers: row.offers ? row.offers.join(', ') : 'No offers listed',
          seeks: row.seeks ? row.seeks.join(', ') : 'No requests listed',
          avatar: row.avatar_url || `https://i.pravatar.cc/160?img=${index + 16}`
        }))
      : fallbackDashboard.recommendedMatches;

    const creditsResult = await pool.query('SELECT SUM(credits) AS total_credits FROM users');
    const totalCredits = creditsResult.rows[0]?.total_credits || fallbackDashboard.stats.credits;

    res.json({
      recommendedMatches,
      marketRows: staticRows,
      recentTransactions,
      activeSessions,
      stats: { credits: totalCredits }
    });
  } catch (err) {
    console.error('Database unavailable, falling back to static dashboard data:', err.message);
    res.json(fallbackDashboard);
  }
}

module.exports = {
  getDashboard
};
