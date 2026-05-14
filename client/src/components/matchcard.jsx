import React from 'react';

const MatchCard = ({ name, role, tags, offers, seeks, avatar, onConnect, isConnected }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <img 
            src={avatar || "https://via.placeholder.com/150"} 
            alt={name} 
            className="w-14 h-14 rounded-full border-2 border-[#0d9488]"
          />
          <div>
            <h3 className="font-bold text-gray-800 text-lg">{name}</h3>
            <p className="text-xs text-gray-500 font-medium leading-tight">{role}</p>
          </div>
        </div>
        <button className="text-gray-300 hover:text-yellow-400">★</button>
      </div>

      {/* Tags (The small icons/badges in your image) */}
      <div className="flex gap-1 mb-4">
        {tags?.map((tag, i) => (
          <span key={i} className="px-2 py-1 bg-gray-100 text-[10px] rounded-md text-gray-600">
            {tag}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 border-t pt-4 text-sm">
        <div>
          <p className="text-[10px] uppercase text-gray-400 font-bold mb-1">Skills you have</p>
          <p className="text-gray-700 font-semibold">{offers}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase text-gray-400 font-bold mb-1">Skills you seek</p>
          <p className="text-[#0d9488] font-bold">{seeks}</p>
        </div>
      </div>

      <button 
        onClick={onConnect}
        disabled={isConnected}
        className={`w-full mt-5 py-2.5 rounded-lg font-bold text-sm transition ${isConnected ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-[#0d9488] text-white hover:bg-teal-700'}`}
      >
        {isConnected ? 'PENDING...' : 'CONNECT'}
      </button>
    </div>
  );
};

export default MatchCard;