export default function MembersView({ computers }) {
  const activePCs = computers.filter(c => c.status === 'in_use');
  
  return (
    <div className="p-8 max-w-5xl">
      <h1 className="text-3xl font-bold text-dashboard-text tracking-tight mb-8">Active Members</h1>
      {activePCs.length === 0 ? (
        <p className="text-dashboard-muted">No active members online right now.</p>
      ) : (
        <div className="bg-dashboard-card border border-dashboard-border rounded-xl overflow-hidden shadow-lg">
          <table className="w-full text-left">
            <thead className="bg-[#0a0a0b] border-b border-dashboard-border text-dashboard-muted text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Terminal</th>
                <th className="px-6 py-4">Total Time Allocated</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dashboard-border">
              {activePCs.map(pc => (
                <tr key={pc.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-4 font-bold text-dashboard-text">{pc.id}</td>
                  <td className="px-6 py-4 text-dashboard-muted">{pc.durationMinutes} mins</td>
                  <td className="px-6 py-4 text-right">
                    <span className="bg-dashboard-accent/20 text-dashboard-accent px-3 py-1 rounded-full text-xs font-bold uppercase">Online</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
