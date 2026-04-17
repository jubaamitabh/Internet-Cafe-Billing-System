export default function PcModal({ isOpen, onClose, pc, type, onSubmit }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-dashboard-card border border-dashboard-border w-[400px] rounded-2xl shadow-2xl p-6 relative animate-in fade-in zoom-in duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-dashboard-muted hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        
        <h3 className="text-xl font-bold mb-2">
          {type === 'start' ? `Start Session: ${pc?.id}` : `Stop Session: ${pc?.id}`}
        </h3>
        <p className="text-sm text-dashboard-muted mb-6">
          {type === 'start' ? 'Enter the duration to unlock this terminal.' : 'Are you sure you want to stop this active session?'}
        </p>

        {type === 'start' ? (
          <form onSubmit={(e) => {
            e.preventDefault();
            const duration = e.target.elements.duration.value;
            onSubmit(pc.id, duration);
          }}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-dashboard-muted mb-2">Duration (Minutes)</label>
              <input 
                name="duration"
                type="number"
                min="1"
                defaultValue="60"
                className="w-full bg-[#0a0a0b] border border-dashboard-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-dashboard-accent focus:ring-1 focus:ring-dashboard-accent/50 transition-all font-medium"
                required
              />
            </div>
            <button type="submit" className="w-full bg-dashboard-accent hover:bg-dashboard-accentHover text-dashboard-bg font-bold py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(233,245,89,0.3)]">
              Unlock Terminal
            </button>
          </form>
        ) : (
          <div>
            <div className="bg-[#0a0a0b] border border-dashboard-border rounded-xl p-4 mb-6">
               <div className="flex justify-between items-center mb-3">
                 <span className="text-sm text-dashboard-muted">Duration Left</span>
                 <span className="font-medium text-white">{pc?.timeRemaining} mins</span>
               </div>
               <div className="h-px w-full bg-dashboard-border mb-3"></div>
               <div className="flex justify-between items-center">
                 <span className="text-sm text-dashboard-muted">Total Cost</span>
                 <span className="font-bold text-dashboard-accent text-xl">Rp. {pc?.cost.toLocaleString('id-ID')}</span>
               </div>
            </div>
            <button onClick={() => onSubmit(pc.id)} className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 font-bold py-3 rounded-xl transition-all">
              Confirm Stop & Pay
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
