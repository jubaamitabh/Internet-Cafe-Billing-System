import { useState, useEffect } from 'react';

export default function PcCard({ pc, onOpenModal }) {
  const isIdle = pc.status === 'idle';
  const isInUse = pc.status === 'in_use';

  const [timeLeftStr, setTimeLeftStr] = useState('-');
  const [currentCost, setCurrentCost] = useState(0);

  useEffect(() => {
    let interval;
    if (isInUse && pc.endTime) {
      updateTimer();
      interval = setInterval(updateTimer, 1000);
    } else {
      setTimeLeftStr('-');
      setCurrentCost(0);
    }
    
    function updateTimer() {
      const now = new Date();
      const end = new Date(pc.endTime);
      const diffMs = end - now;
      
      if (diffMs <= 0) {
        setTimeLeftStr('00:00');
        return;
      }
      
      const totalSeconds = Math.floor(diffMs / 1000);
      const m = Math.floor(totalSeconds / 60);
      const s = totalSeconds % 60;
      setTimeLeftStr(`${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
      
      // Cost: 166.67 per minute passed
      const startTime = new Date(end.getTime() - (pc.durationMinutes * 60000));
      const passedMs = now - startTime;
      const passedMinutes = Math.max(0, passedMs / 60000);
      const cost = Math.ceil(passedMinutes * (10000/60));
      setCurrentCost(cost);
    }

    return () => clearInterval(interval);
  }, [isInUse, pc.endTime, pc.durationMinutes]);

  return (
    <div className={`glass-card p-6 flex flex-col justify-between ${isInUse ? 'glow-active relative overflow-hidden' : ''}`}>
      {isInUse && (
        <div className="absolute top-0 left-0 w-full h-1 bg-dashboard-accent animate-pulse-slow"></div>
      )}
      
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold tracking-tight">{pc.id}</h2>
          <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${
            isIdle ? 'bg-dashboard-border text-dashboard-muted' :
            isInUse ? 'bg-dashboard-accent/20 text-dashboard-accent border border-dashboard-accent/30' :
            'bg-red-500/20 text-red-400'
          }`}>
            {isInUse ? 'Active' : pc.status}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div>
            <p className="text-xs text-dashboard-muted mb-1 uppercase tracking-wider">Time Left</p>
            <p className="text-2xl font-semibold font-mono text-white">
              {timeLeftStr}
            </p>
          </div>
          <div>
            <p className="text-xs text-dashboard-muted mb-1 uppercase tracking-wider">Cost</p>
            <p className="text-lg font-medium text-white mt-1">
              {isInUse ? `Rp ${currentCost.toLocaleString('id-ID')}` : '-'}
            </p>
          </div>
        </div>
      </div>

      <div>
        {isIdle && (
          <button 
            onClick={() => onOpenModal(pc, 'start')}
            className="w-full bg-dashboard-border hover:bg-gray-700 text-white py-2.5 rounded-lg text-sm font-medium transition-colors border border-gray-700">
            Start Session
          </button>
        )}
        {isInUse && (
          <button 
            onClick={() => onOpenModal(pc, 'stop')}
            className="w-full bg-dashboard-bg border border-dashboard-border text-white hover:border-red-500/50 hover:text-red-400 py-2.5 rounded-lg text-sm font-medium transition-colors">
            Stop Terminal
          </button>
        )}
      </div>
    </div>
  );
}
