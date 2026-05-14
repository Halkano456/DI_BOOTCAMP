import React from 'react';

const LedgerView = ({ transactions = [], stats }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="rounded-[36px] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-950 mb-4">Knowledge Ledger</h2>
        <div className="rounded-3xl bg-slate-950 p-6 text-center text-white shadow-inner shadow-slate-950/30">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Current Digital Balance</p>
          <p className="mt-3 text-5xl font-bold">{stats.credits}</p>
          <p className="mt-2 text-sm text-slate-400">Credits</p>
        </div>
      </div>

      <div className="rounded-[36px] border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-slate-950 mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {transactions.length === 0 ? (
            <p className="text-slate-500 text-center">No recent transactions.</p>
          ) : (
            transactions.map((item, index) => (
              <div key={index} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-500">{item.detail}</p>
                </div>
                <span className={`font-bold ${item.type === 'credit' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {item.type === 'credit' ? '+' : '-'}{item.value}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* You can add more ledger-specific content here */}
    </div>
  );
};

export default LedgerView;