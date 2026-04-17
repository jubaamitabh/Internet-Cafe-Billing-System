export default function ReportsView({ history }) {
  const totalRevenue = history.reduce((acc, entry) => acc + entry.cost, 0);

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dashboard-text tracking-tight">Reports & Earnings</h1>
        <p className="text-dashboard-muted mt-1">Transaction history for today</p>
      </div>

      <div className="bg-dashboard-card border border-dashboard-border rounded-2xl p-6 mb-8 w-fit shadow-lg">
        <p className="text-dashboard-muted uppercase tracking-wider text-xs mb-2">Total Revenue Recorded</p>
        <p className="text-4xl font-bold text-dashboard-accent">Rp {totalRevenue.toLocaleString('id-ID')}</p>
      </div>

      <div className="bg-dashboard-card border border-dashboard-border rounded-xl overflow-hidden shadow-lg">
        <table className="w-full text-left">
          <thead className="bg-[#0a0a0b] border-b border-dashboard-border text-dashboard-muted text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Time</th>
              <th className="px-6 py-4">Terminal</th>
              <th className="px-6 py-4">Duration</th>
              <th className="px-6 py-4 text-right">Cost</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dashboard-border text-sm">
            {history.length === 0 ? (
              <tr><td colSpan="4" className="px-6 py-8 text-center text-dashboard-muted">No transactions yet.</td></tr>
            ) : (
              history.map(entry => (
                <tr key={entry.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-4 text-dashboard-muted">{new Date(entry.date).toLocaleTimeString()}</td>
                  <td className="px-6 py-4 font-bold text-dashboard-text">{entry.computerId}</td>
                  <td className="px-6 py-4 text-dashboard-muted">{entry.actualTimeUsed} mins used</td>
                  <td className="px-6 py-4 text-right font-medium text-dashboard-text">Rp {entry.cost.toLocaleString('id-ID')}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
