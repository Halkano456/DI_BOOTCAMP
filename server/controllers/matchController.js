const pool = require('../db'); // Assuming db.js exports pg pool

exports.getReciprocalMatches = async (req, res) => {
    const { userId } = req.params;

    try {
        const query = `
            SELECT DISTINCT 
                u.id, u.name, u.role, u.avatar, u.credits,
                (SELECT STRING_AGG(s.name, ', ') FROM user_skills us JOIN skills s ON us.skill_id = s.id WHERE us.user_id = u.id AND us.is_teaching = TRUE) as offers,
                (SELECT STRING_AGG(s.name, ', ') FROM user_skills us JOIN skills s ON us.skill_id = s.id WHERE us.user_id = u.id AND us.is_teaching = FALSE) as seeks
            FROM users u
            JOIN user_skills us_offered ON us_offered.user_id = u.id AND us_offered.is_teaching = TRUE
            JOIN user_skills us_sought ON us_sought.user_id = u.id AND us_sought.is_teaching = FALSE
            WHERE u.id != $1
            AND us_offered.skill_id IN (
                SELECT skill_id FROM user_skills WHERE user_id = $1 AND is_teaching = FALSE
            )
            AND us_sought.skill_id IN (
                SELECT skill_id FROM user_skills WHERE user_id = $1 AND is_teaching = TRUE
            );
        `;

        const { rows } = await pool.query(query, [userId]);
        
        // Format tags for MatchCard
        const matches = rows.map(r => ({
            ...r,
            tags: r.offers ? r.offers.split(', ').slice(0, 2) : ['Expert']
        }));

        res.json(matches);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Matching Engine Error' });
    }
};