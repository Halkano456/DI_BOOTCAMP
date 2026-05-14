import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import MatchCard from './components/matchcard';
import BubbleChart from './components/BubbleChart';
import SkillMarketTable from './components/SkillMarketTable';
import MapView from './components/MapView';
import { AppContext } from './context/AppContext';
import ProfileView from './components/ProfileView';
import MessagesView from './components/MessagesView';
import LedgerView from './components/LedgerView';
import CommunityView from './components/CommunityView';

function App() {
  const { data, loading, error } = useContext(AppContext);
  const {
    recommendedMatches = [],
    marketRows = [],
    recentTransactions = [],
    activeSessions = [],
    stats = { credits: 0 }
  } = data || {};

  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('Dashboard');
  const [showModal, setShowModal] = useState(false);
  const [connectedUserIds, setConnectedUserIds] = useState([]);
  const [matches, setMatches] = useState([]);
  const [balance, setBalance] = useState(0);
  const [ledgerTransactions, setLedgerTransactions] = useState([]);
  const [notification, setNotification] = useState('');
  const [userProfile, setUserProfile] = useState({
    name: 'Felix Arvid',
    role: 'Senior Product Designer',
    location: 'Stockholm, SE',
    bio: 'Passionate about building scalable design systems and mentoring junior designers.',
    skills: ['UX Design', 'Figma', 'Prototyping', 'User Research'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
  });

  const currentUserId = 1;

  useEffect(() => {
    const getData = async () => {
      try {
        const [matchesRes, userRes] = await Promise.all([
          axios.get(`/api/matches/${currentUserId}`),
          axios.get(`/api/users/${currentUserId}`)
        ]);

        setMatches(matchesRes.data);
        setBalance(userRes.data.credits);
        setLedgerTransactions([
          {
            title: 'Current Balance',
            detail: `Logged in as ${userRes.data.name}`,
            type: 'credit',
            value: userRes.data.credits
          }
        ]);
      } catch (err) {
        console.error('Connectivity issue:', err);
      }
    };
    getData();
  }, []);

  const [localMarketRows, setLocalMarketRows] = useState([]);
  useEffect(() => {
    if (marketRows.length > 0 && localMarketRows.length === 0) {
      setLocalMarketRows(marketRows);
    }
  }, [marketRows, localMarketRows]);

  const [sessionStatus, setSessionStatus] = useState('idle'); // idle, connecting, live

  const handleStartLiveSession = () => {
    setShowModal(true);
    setSessionStatus('connecting');
    
    // Simulate a connection delay
    setTimeout(() => {
      setSessionStatus('live');
    }, 2000);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSessionStatus('idle');
  };

  const handleConnect = async (mentorId) => {
    try {
      const res = await axios.post('/api/swap', {
        userId: currentUserId,
        mentorId
      });

      setBalance(res.data.user.credits);
      setConnectedUserIds((prev) => prev.includes(mentorId) ? prev : [...prev, mentorId]);
      setLedgerTransactions((prev) => [
        {
          title: `Connected with mentor #${mentorId}`,
          detail: '1 credit exchanged successfully.',
          type: 'debit',
          value: 1
        },
        ...prev
      ]);
      setNotification('Connection Successful');
      setTimeout(() => setNotification(''), 3000);
    } catch (err) {
      console.error('Swap failed:', err);
      setNotification(err.response?.data?.error || 'Swap failed. Try again.');
      setTimeout(() => setNotification(''), 3000);
    }
  };

  const handleAddMarketItem = (newItem) => {
    setLocalMarketRows([newItem, ...localMarketRows]);
  };

  const filteredMatches = matches.filter(match =>
    match.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const renderContent = () => {
    switch (activeView) {
      case 'My Profile':
        return <ProfileView 
                  profile={userProfile} 
                  onUpdateProfile={setUserProfile} 
                  stats={stats} 
                />;
      case 'Messages':
        return <MessagesView />;
      case 'Skill Market':
        return <div className="space-y-6">
                 <BubbleChart />
                 <SkillMarketTable rows={localMarketRows} onPostSkill={handleAddMarketItem} />
               </div>;
      case 'Ledger':
        return <LedgerView transactions={ledgerTransactions} stats={{ ...stats, credits: balance }} />;
      case 'Community':
        return <CommunityView matches={recommendedMatches} onConnect={handleConnect} connectedIds={connectedUserIds} />;
      case 'Dashboard':
      default:
        break;
    }

    return (
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Left: Recommended Matches */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-[#0f172a]">Recommended Matches</h3>
          {matches.length > 0 ? matches.map(m => (
            <MatchCard key={m.id} {...m} onConnect={() => handleConnect(m.id)} isConnected={connectedUserIds.includes(m.id)} />
          )) : <p className="text-slate-400">Finding reciprocal matches...</p>}
        </section>

        {/* Middle: Skills Marketplace */}
        <section className="space-y-6">
          <BubbleChart />
          <SkillMarketTable rows={localMarketRows} onPostSkill={handleAddMarketItem} />
        </section>

        {/* Right: Knowledge Ledger */}
        <section className="space-y-6">
          <LedgerView transactions={ledgerTransactions} stats={{ ...stats, credits: balance }} />
          <MapView />
        </section>
      </div>
    );
  };

  const renderDashboardMain = () => (
    <>
      <section className="space-y-6">
        <div className="rounded-[36px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-slate-950">Recommended Matches</h3>
              <p className="mt-2 text-sm text-slate-500">Curated skill exchange opportunities tailored to your profile.</p>
            </div>
            <button className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">View all</button>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {filteredMatches.map((match) => (
              <MatchCard 
                key={match.id}
                {...match} 
                onConnect={() => handleConnect(match.id)}
                isConnected={connectedUserIds.includes(match.id)}
              />
            ))}
          </div>
        </div>

        <div className="rounded-[36px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3 pb-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Skills Marketplace</p>
              <h3 className="text-xl font-semibold text-slate-950">Marketplace Trends</h3>
            </div>
            <button 
              onClick={() => setActiveView('Skill Market')}
              className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
            >Manage Skills</button>
          </div>
          <BubbleChart />
          <div className="mt-6">
            <SkillMarketTable rows={localMarketRows} onPostSkill={handleAddMarketItem} />
          </div>
        </div>
      </section>

      <div className="space-y-6">
        <div className="rounded-[36px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-2 pb-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Knowledge Ledger</p>
              <h3 className="text-xl font-semibold text-slate-950">Digital Balance</h3>
            </div>
            <button 
              onClick={() => setActiveView('Ledger')}
              className="rounded-3xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-400"
            >VIEW ALL</button>
          </div>
          <div className="rounded-3xl bg-slate-950 p-6 text-center text-white shadow-inner shadow-slate-950/30">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Digital Balance</p>
            <p className="mt-3 text-5xl font-bold">{balance}</p>
            <p className="mt-2 text-sm text-slate-400">Credits</p>
          </div>

          <div className="mt-6 space-y-4">
            <p className="text-sm font-semibold text-slate-900">Recent Transaction</p>
            <div className="space-y-3">
              {ledgerTransactions.map((item, index) => (
                <div key={index} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-500">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[36px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3 pb-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Active Sessions</p>
              <h3 className="text-xl font-semibold text-slate-950">Live Now</h3>
            </div>
            <span className="inline-flex items-center gap-2 rounded-3xl bg-rose-100 px-3 py-2 text-xs font-semibold text-rose-700">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500" /> LIVE
            </span>
          </div>
          <div className="space-y-4">
            {activeSessions.map((session) => (
              <div key={session.name} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-950">{session.name}</p>
                <p className="mt-1 text-sm text-slate-500">{session.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <MapView />
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans">
      <div className="flex min-h-screen">
        <aside className={`w-72 shrink-0 bg-slate-950 text-slate-100 pb-8 ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
          <div className="flex h-full flex-col px-6 pt-8">
            <div className="mb-10 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-cyan-400 text-slate-950 font-black">S</div>
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">SkillSwap</p>
                <h1 className="text-2xl font-bold">Dashboard</h1>
              </div>
            </div>

            <nav className="space-y-2 flex-1">
              <button 
                onClick={() => setActiveView('Dashboard')}
                className={`flex w-full items-center justify-between rounded-3xl px-4 py-4 text-left font-semibold shadow-sm transition ${activeView === 'Dashboard' ? 'bg-slate-900 text-white shadow-slate-950/10' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
              >
                <span>Dashboard</span>
                <span className="rounded-2xl bg-cyan-400 px-3 py-1 text-xs font-bold text-slate-950">New</span>
              </button>
              {['My Profile', 'Messages', 'Skill Market', 'Ledger', 'Community'].map((item) => (
                <button 
                  key={item} 
                  onClick={() => setActiveView(item)}
                  className={`flex w-full items-center rounded-3xl px-4 py-4 text-left transition ${activeView === item ? 'bg-slate-900 text-white' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto p-8">
          <button 
            className="md:hidden mb-4 p-2 bg-slate-950 text-white rounded-3xl"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <div className="mb-8 flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight text-[#0f172a]">Mentorship Dashboard</h2>
              <p className="mt-3 text-slate-600">You have <span className="font-bold text-brand-teal">{balance} Credits</span> available for exchange.</p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative w-full sm:w-[320px]">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
                <input
                  className="w-full rounded-3xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-slate-900 shadow-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button 
                className="inline-flex items-center justify-center rounded-3xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:bg-slate-800"
                onClick={handleStartLiveSession}
              >
                Start Live Session
              </button>
            </div>
          </div>

          {notification && (
            <div className="mb-6 rounded-3xl border border-brand-accent/30 bg-brand-accent/10 px-5 py-4 text-sm font-semibold text-brand-dark">
              {notification}
            </div>
          )}

          {loading ? (
            <div className="rounded-[36px] border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
              Loading dashboard...
            </div>
          ) : error ? (
            <div className="rounded-[36px] border border-rose-200 bg-rose-50 p-8 text-center text-rose-700 shadow-sm">
              {error}
            </div>
          ) : (
            renderContent()
          )}
        </main>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[40px] p-10 max-w-md w-full shadow-2xl">
            <div className="flex flex-col items-center text-center">
              <div className={`mb-6 flex h-20 w-20 items-center justify-center rounded-full ${sessionStatus === 'live' ? 'bg-rose-100 text-rose-600' : 'bg-cyan-100 text-cyan-600 animate-pulse'}`}>
                {sessionStatus === 'live' ? '🔴' : '🛰️'}
              </div>
              <h3 className="text-2xl font-bold text-slate-950 mb-2">
                {sessionStatus === 'connecting' ? 'Establishing Connection...' : 'Live Session Active'}
              </h3>
              <p className="text-slate-600 mb-8">
                {sessionStatus === 'connecting' 
                  ? 'Searching for available peers in your selected skill tracks.' 
                  : 'Connected to the SkillSwap stream. Peer: Alex (Product Design).'}
              </p>
              
              {sessionStatus === 'live' && (
                <div className="w-full mb-8 rounded-2xl bg-slate-50 p-4 border border-slate-100">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                    <span>Signal Strength</span>
                    <span className="text-cyan-500">Excellent</span>
                  </div>
                </div>
              )}

              <button 
                className="w-full bg-slate-950 text-white py-4 rounded-3xl font-bold shadow-xl transition hover:bg-slate-800"
                onClick={handleCloseModal}
              >
                {sessionStatus === 'live' ? 'End Session' : 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
