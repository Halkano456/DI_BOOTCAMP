import { useEffect, useState } from 'react';

const fallbackData = {
  recommendedMatches: [],
  marketRows: [],
  recentTransactions: [],
  activeSessions: [],
  stats: { credits: 0 }
};

export default function useDashboardData() {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || '/api';

    async function fetchDashboard() {
      try {
        const response = await fetch(`${apiUrl}/dashboard`);
        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }
        const payload = await response.json();
        setData(payload);
      } catch (err) {
        console.error('Unable to load dashboard data:', err);
        // Don't set error, keep fallback data
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  return { data, loading, error };
}
