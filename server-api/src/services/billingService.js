const activeSessions = new Map();
const transactionHistory = [];

exports.startSession = (computerId, durationMinutes) => {
  const startTime = new Date();
  const endTime = new Date(startTime.getTime() + durationMinutes * 60000);
  
  const sessionData = {
    computerId,
    durationMinutes,
    startTime,
    endTime,
    status: "active",
  };

  activeSessions.set(computerId, sessionData);
  return sessionData;
};

exports.calculateCost = (minutesUsed) => {
  // Rp. 10000 / 60 = 166.666...
  const ratePerMinute = 10000 / 60;
  return Math.ceil(minutesUsed * ratePerMinute);
};

exports.getSession = (computerId) => {
  return activeSessions.get(computerId);
};

exports.endSession = (computerId) => {
  const session = activeSessions.get(computerId);
  if (session) {
    const timePassed = Math.max(0, (new Date() - session.startTime) / 60000);
    const cost = exports.calculateCost(timePassed);
    
    // Save to history
    transactionHistory.push({
      id: Date.now().toString(),
      computerId,
      durationMinutes: session.durationMinutes,
      actualTimeUsed: Math.round(timePassed),
      cost,
      date: new Date().toISOString()
    });

    activeSessions.delete(computerId);
  }
};

exports.getAllSessions = () => {
    return Array.from(activeSessions.values());
}

exports.getHistory = () => {
  return transactionHistory;
};
