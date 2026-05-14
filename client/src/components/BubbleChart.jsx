import React from 'react';

const BubbleChart = () => {
  const nodes = [
    { label: 'PostgreSQL', size: 'w-36 h-36', top: 'top-8 left-10', color: 'bg-cyan-500' },
    { label: 'React.js', size: 'w-28 h-28', top: 'top-10 left-44', color: 'bg-sky-500' },
    { label: 'Cybersecurity', size: 'w-32 h-32', top: 'top-32 left-16', color: 'bg-teal-500' },
    { label: 'AWS', size: 'w-24 h-24', top: 'top-24 left-52', color: 'bg-emerald-500' },
    { label: 'Figma', size: 'w-24 h-24', top: 'top-44 left-44', color: 'bg-indigo-500' }
  ];

  return (
    <div className="relative h-[360px] overflow-hidden rounded-3xl bg-slate-950 p-6 text-slate-100 shadow-lg shadow-slate-200/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.16),_transparent_22%),radial-gradient(circle_at_bottom_right,_rgba(52,211,153,0.16),_transparent_18%)]" />
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="relative h-full w-full">
          {nodes.map((node) => (
            <div
              key={node.label}
              className={`absolute ${node.top} ${node.size} rounded-full ${node.color} bg-opacity-90 shadow-2xl shadow-slate-950/40 flex items-center justify-center text-sm font-semibold text-white`}>
              <span className="text-center px-3">{node.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="relative z-10 mt-4 flex items-center justify-between text-sm text-slate-300">
        <span className="rounded-full bg-slate-900/75 px-4 py-2">Skills Marketplace</span>
        <span className="rounded-full bg-slate-900/75 px-4 py-2">All remaining</span>
      </div>
    </div>
  );
};

export default BubbleChart;
