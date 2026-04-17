export default function Header({ computers }) {
  // Demo stats
  const activePCs = computers.filter(pc => pc.status === 'in_use').length;
  const totalPCs = computers.length;
  const totalRevenue = computers.reduce((acc, pc) => acc + (pc.cost || 0), 0);

  return (
    <header className="h-20 border-b border-dashboard-border bg-dashboard-bg/80 backdrop-blur-sm sticky top-0 z-10 flex items-center justify-between px-8">
      <div>
        <h2 className="text-xl font-semibold mb-1">Overview</h2>
        <p className="text-sm text-dashboard-muted">Real-time status of all terminals</p>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-xs text-dashboard-muted uppercase tracking-wider mb-1">Current Session Revenue</p>
          <p className="text-xl font-bold text-dashboard-accent">Rp. {totalRevenue.toLocaleString('id-ID')}</p>
        </div>
        <div className="w-px h-8 bg-dashboard-border"></div>
        <div className="text-right">
          <p className="text-xs text-dashboard-muted uppercase tracking-wider mb-1">Active PCs</p>
          <p className="text-xl font-bold text-white">{activePCs} / {totalPCs}</p>
        </div>
      </div>
    </header>
  );
}
