import React, { useState } from 'react';

const MapView = () => {
  const [selected, setSelected] = useState(null);

  const locations = [
    { id: 1, x: 52, y: 180, name: 'New York', connections: 45 },
    { id: 2, x: 132, y: 130, name: 'London', connections: 32 },
    { id: 3, x: 210, y: 116, name: 'Tokyo', connections: 28 },
    { id: 4, x: 308, y: 88, name: 'Sydney', connections: 19 },
    { id: 5, x: 354, y: 100, name: 'Berlin', connections: 24 }
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Map viza connections in real time</p>
          <h3 className="text-base font-semibold text-slate-900">Global Connection Flow</h3>
        </div>
        <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Live</span>
      </div>
      <div className="h-72 overflow-hidden rounded-3xl bg-slate-950/95 p-3 relative">
        <svg viewBox="0 0 400 240" className="h-full w-full">
          <rect width="400" height="240" rx="28" fill="#0f172a" />
          <path d="M44 178C90 143 138 112 204 126C266 140 314 157 357 84" stroke="#0af5c5" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M80 56C124 86 151 132 213 114C266 98 316 82 354 98" stroke="#38bdf8" strokeWidth="2" fill="none" strokeLinecap="round" />
          {locations.map(loc => (
            <circle 
              key={loc.id} 
              cx={loc.x} 
              cy={loc.y} 
              r="6" 
              fill={selected === loc.id ? "#22d3ee" : "#7dd3fc"} 
              className="cursor-pointer hover:fill-cyan-400"
              onClick={() => setSelected(loc.id)}
            />
          ))}
          <g opacity="0.6" fill="#ffffff">
            <ellipse cx="160" cy="70" rx="40" ry="12" />
            <ellipse cx="240" cy="210" rx="55" ry="14" />
          </g>
        </svg>
        {selected && (
          <div className="absolute top-4 left-4 bg-white rounded-lg p-3 shadow-lg">
            <p className="font-semibold">{locations.find(l => l.id === selected)?.name}</p>
            <p className="text-sm text-slate-600">{locations.find(l => l.id === selected)?.connections} active connections</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapView;
