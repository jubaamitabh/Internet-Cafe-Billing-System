import { useState } from 'react';

export default function SettingsView() {
  const [theme, setTheme] = useState(document.documentElement.classList.contains('light-theme') ? 'light' : 'dark');

  const toggleTheme = () => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('light-theme');
      setTheme('light');
    } else {
      root.classList.remove('light-theme');
      setTheme('dark');
    }
  };

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-3xl font-bold tracking-tight mb-8 text-dashboard-text">Settings</h1>
      
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-6 border-b border-dashboard-border pb-4 text-dashboard-text">Appearance</h2>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-lg text-dashboard-text">Theme Mode</h3>
            <p className="text-dashboard-muted text-sm mt-1">Toggle between dark and light appearance.</p>
          </div>
          
          <button 
            onClick={toggleTheme}
            className="bg-dashboard-bg border border-dashboard-border px-6 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-colors hover:border-dashboard-accent text-dashboard-text"
          >
            {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </button>
        </div>
      </div>
    </div>
  );
}
