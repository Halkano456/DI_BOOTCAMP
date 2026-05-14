import React from 'react';
import MatchCard from './matchcard';

const CommunityView = ({ matches = [], onConnect, connectedIds = [] }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="rounded-[36px] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-950 mb-4">Community Hub</h2>
        <p className="text-slate-600 mb-6">Explore and connect with other SkillSwap members.</p>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {matches.length === 0 ? (
            <p className="col-span-full text-slate-500 text-center">No community members found.</p>
          ) : (
            matches.map((match) => (
              <MatchCard
                key={match.name + match.seeks}
                {...match}
                onConnect={() => onConnect(match.name)}
                isConnected={connectedIds.includes(match.name)}
              />
            ))
          )}
        </div>
      </div>

      {/* You can add more community-specific content here, e.g., filters, search, etc. */}
      <div className="rounded-[36px] border border-slate-200 bg-white p-6 shadow-sm text-center">
        <h3 className="text-xl font-semibold text-slate-950">Expand Your Network</h3>
        <p className="mt-2 text-slate-600">Discover new skills and opportunities by connecting with more members.</p>
        <button className="mt-4 inline-flex items-center justify-center rounded-3xl bg-cyan-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-cyan-400">
          Browse All Members
        </button>
      </div>
    </div>
  );
};

export default CommunityView;