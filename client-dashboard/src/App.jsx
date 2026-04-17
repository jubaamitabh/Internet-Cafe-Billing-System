import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import PcCard from './components/PcCard';
import PcModal from './components/PcModal';
import MembersView from './components/MembersView';
import ReportsView from './components/ReportsView';
import SettingsView from './components/SettingsView';

function App() {
  const [computers, setComputers] = useState([
    { id: 'PC-01', status: 'idle', durationMinutes: 0 },
    { id: 'PC-02', status: 'idle', durationMinutes: 0 },
    { id: 'PC-03', status: 'idle', durationMinutes: 0 },
    { id: 'PC-04', status: 'idle', durationMinutes: 0 },
    { id: 'PC-05', status: 'idle', durationMinutes: 0 },
    { id: 'PC-06', status: 'idle', durationMinutes: 0 },
    { id: 'PC-07', status: 'idle', durationMinutes: 0 },
    { id: 'PC-08', status: 'idle', durationMinutes: 0 },
  ]);

  const [history, setHistory] = useState([]);
  const [socket, setSocket] = useState(null);
  
  // Navigation State
  const [activeView, setActiveView] = useState('dashboard');

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPc, setSelectedPc] = useState(null);
  const [modalType, setModalType] = useState('start');

  useEffect(() => {
    // Connect to Node.js Backend
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    // Receive status updates (now includes endTime)
    newSocket.on('status_update', (data) => {
      setComputers((prev) => 
        prev.map((pc) => 
          pc.id === data.computerId 
            ? { ...pc, status: data.status, durationMinutes: data.durationMinutes || pc.durationMinutes, endTime: data.endTime || null } 
            : pc
        )
      );
    });

    newSocket.on('history_update', (data) => {
       setHistory(data);
    });

    return () => newSocket.close();
  }, []);

  const openModal = (pc, type) => {
    setSelectedPc(pc);
    setModalType(type);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPc(null);
  };

  const handleStartSession = (id, duration) => {
    if(!duration || isNaN(duration)) return;
    
    if(socket) {
       socket.emit('admin_start_session', { computerId: id, durationMinutes: parseInt(duration) });
    }
    // Note: Removed optimistic UI so we wait for server to send accurate endTime.
    closeModal();
  };

  const handleStopSession = (id) => {
    if(socket) {
       socket.emit('admin_stop_session', { computerId: id });
    }
    closeModal();
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-dashboard-bg text-dashboard-text font-sans selection:bg-dashboard-accent selection:text-black">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header computers={computers} />
        
        <div className="flex-1 overflow-y-auto">
          {activeView === 'dashboard' && (
             <div className="p-8">
               <div className="flex justify-between items-end mb-8">
                 <div>
                   <h1 className="text-3xl font-bold text-dashboard-text tracking-tight">Terminals</h1>
                   <p className="text-dashboard-muted mt-1">Manage and monitor active sessions</p>
                 </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                 {computers.map((pc) => (
                   <PcCard key={pc.id} pc={pc} onOpenModal={openModal} />
                 ))}
               </div>
             </div>
          )}

          {activeView === 'members' && <MembersView computers={computers} />}
          {activeView === 'reports' && <ReportsView history={history} />}
          {activeView === 'settings' && <SettingsView />}
        </div>
      </main>

      <PcModal 
        isOpen={modalOpen} 
        onClose={closeModal} 
        pc={selectedPc} 
        type={modalType}
        onSubmit={modalType === 'start' ? handleStartSession : handleStopSession}
      />
    </div>
  );
}

export default App;
