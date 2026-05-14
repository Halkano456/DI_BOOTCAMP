import React, { useState } from 'react';

const ProfileView = ({ profile, onUpdateProfile, stats }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  const handleSave = () => {
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="rounded-[40px] bg-white border border-slate-200 p-8 shadow-sm flex flex-col md:flex-row items-center gap-8 relative">
        <button 
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="absolute top-8 right-8 px-5 py-2 bg-slate-900 text-white rounded-3xl text-sm font-bold hover:bg-slate-800 transition"
        >
          {isEditing ? 'Save Profile' : 'Edit Account'}
        </button>

        <div className="h-32 w-32 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 p-1">
          <img src={profile.avatar} alt="Profile" className="h-full w-full rounded-full bg-white object-cover" />
        </div>

        <div className="text-center md:text-left flex-1">
          {isEditing ? (
            <div className="space-y-3">
              <input 
                className="text-2xl font-bold border-b border-cyan-400 outline-none w-full"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <input 
                className="text-slate-500 block w-full outline-none"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
              />
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-slate-950">{profile.name}</h2>
              <p className="text-slate-500 font-medium">{profile.role} • {profile.location}</p>
            </>
          )}
          <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
            {['Verified Expert', 'Top Contributor'].map(badge => (
              <span key={badge} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full border border-slate-200 uppercase tracking-wider">{badge}</span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
          <div className="bg-slate-50 p-4 rounded-3xl text-center border border-slate-100 min-w-[100px]">
            <p className="text-2xl font-bold text-slate-950">{stats.credits}</p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter">Credits</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-3xl text-center border border-slate-100 min-w-[100px]">
            <p className="text-2xl font-bold text-slate-950">12</p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter">Swaps</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-[36px] bg-white border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4">About Me</h3>
          {isEditing ? (
            <textarea 
              className="w-full h-24 border rounded-2xl p-3 outline-cyan-400"
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
            />
          ) : (
            <p className="text-slate-600 leading-relaxed">{profile.bio}</p>
          )}
        </div>

        <div className="rounded-[36px] bg-white border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4">Active Skills</h3>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map(s => (
              <span key={s} className="px-4 py-2 bg-cyan-50 text-cyan-700 rounded-2xl font-semibold text-sm">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;