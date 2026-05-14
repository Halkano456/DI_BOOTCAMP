import React from 'react';

const MessagesView = () => {
  const messages = [
    { id: 1, from: 'Sarah Chen', preview: 'The session yesterday was great! About the React hooks...', time: '2m ago', unread: true },
    { id: 2, from: 'Marcus Wright', preview: 'Can we move our SQL exchange to Thursday?', time: '1h ago', unread: false },
    { id: 3, from: 'System', preview: 'You earned 50 credits for completing the Python track.', time: '5h ago', unread: false },
  ];

  return (
    <div className="rounded-[36px] border border-slate-200 bg-white overflow-hidden shadow-sm animate-in fade-in duration-500">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-950">Inbox</h2>
        <button className="text-sm font-bold text-cyan-600 hover:text-cyan-500">Mark all as read</button>
      </div>
      <div className="divide-y divide-slate-100">
        {messages.map(msg => (
          <div key={msg.id} className={`p-6 flex items-center gap-4 cursor-pointer hover:bg-slate-50 transition ${msg.unread ? 'bg-cyan-50/30' : ''}`}>
            <div className="h-12 w-12 rounded-full bg-slate-200 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-bold text-slate-900 truncate">{msg.from}</h4>
                <span className="text-xs text-slate-400 whitespace-nowrap">{msg.time}</span>
              </div>
              <p className="text-sm text-slate-500 truncate">{msg.preview}</p>
            </div>
            {msg.unread && <div className="h-2 w-2 rounded-full bg-cyan-500" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagesView;