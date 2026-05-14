import React, { useState } from 'react';

const SkillMarketTable = ({ rows = [], onPostSkill }) => {
  const [isPosting, setIsPosting] = useState(false);
  const [newSkill, setNewSkill] = useState({ request: '', skills: '', credits: 10, offer: 'Offer' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newSkill.request || !newSkill.skills) return;
    onPostSkill(newSkill);
    setIsPosting(false);
    setNewSkill({ request: '', skills: '', credits: 10, offer: 'Offer' });
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <span className="rounded-full border border-slate-200 px-3 py-2">Marketplace Live Feed</span>
        </div>
        <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">Filter by category</div>
      </div>

    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm leading-6 text-slate-700">
        <thead>
          <tr className="border-b border-slate-200 text-slate-500">
            <th className="pb-3 pt-2 font-medium">REQUEST</th>
            <th className="pb-3 pt-2 font-medium">SKILLS</th>
            <th className="pb-3 pt-2 font-medium">REQUESTS</th>
            <th className="pb-3 pt-2 font-medium">OFFER</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {rows.length === 0 ? (
            <tr>
              <td colSpan="4" className="py-6 text-center text-slate-400">
                No market rows available.
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr key={index} className="hover:bg-slate-50 transition-colors">
                <td className="py-4 font-semibold text-slate-800">{row.request}</td>
                <td className="py-4">{row.skills}</td>
                <td className="py-4 text-slate-500">{row.credits}</td>
                <td className="py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${row.offer === 'Offer' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {row.offer}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>

      {isPosting ? (
        <form onSubmit={handleSubmit} className="mt-6 p-6 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 animate-in fade-in zoom-in-95">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              placeholder="Request title (e.g. Build a logo)" 
              className="p-3 rounded-xl border outline-cyan-400"
              value={newSkill.request}
              onChange={(e) => setNewSkill({...newSkill, request: e.target.value})}
            />
            <input 
              placeholder="Skills needed (e.g. Photoshop)" 
              className="p-3 rounded-xl border outline-cyan-400"
              value={newSkill.skills}
              onChange={(e) => setNewSkill({...newSkill, skills: e.target.value})}
            />
            <select 
              className="p-3 rounded-xl border outline-cyan-400"
              value={newSkill.offer}
              onChange={(e) => setNewSkill({...newSkill, offer: e.target.value})}
            >
              <option value="Offer">I am offering</option>
              <option value="Request">I am seeking</option>
            </select>
            <button type="submit" className="bg-cyan-500 text-white font-bold rounded-xl hover:bg-cyan-600">Publish Now</button>
          </div>
        </form>
      ) : (
        <button 
          onClick={() => setIsPosting(true)}
          className="mt-5 w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition"
        >
          POST A NEW SKILL OFFER/REQUEST
        </button>
      )}
    </div>
  );
};

export default SkillMarketTable;
