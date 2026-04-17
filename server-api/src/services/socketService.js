const billingService = require("./billingService");

module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log(`[Socket] A client connected: ${socket.id}`);

    // Send history on new connection to dashboard
    socket.emit("history_update", billingService.getHistory());

    socket.on("register_client", (data) => {
      socket.join(data.computerId);
      console.log(`[Socket] PC Registered: ${data.computerId}`);
      io.emit("status_update", { computerId: data.computerId, status: "idle", socketId: socket.id });
    });

    socket.on("admin_start_session", (data) => {
      const { computerId, durationMinutes } = data;
      console.log(`[Socket] Admin memulai sesi untuk PC: ${computerId} selama ${durationMinutes} menit.`);
      const session = billingService.startSession(computerId, durationMinutes);
      
      io.to(computerId).emit("command_unlock", {
        message: "Sesi dimulai",
        durationMinutes,
        endTime: session.endTime
      });

      // Send endTime for accurate countdown
      io.emit("status_update", { computerId, status: "in_use", durationMinutes, endTime: session.endTime });
    });

    socket.on("admin_stop_session", (data) => {
      const { computerId } = data;
      console.log(`[Socket] Admin menghentikan sesi untuk PC: ${computerId}`);
      
      billingService.endSession(computerId);
      io.to(computerId).emit("command_lock", { message: "Sesi telah dihentikan oleh admin." });
      
      io.emit("status_update", { computerId, status: "idle" });
      io.emit("history_update", billingService.getHistory());
    });

    socket.on("disconnect", () => {
      console.log(`[Socket] Client disconnected: ${socket.id}`);
    });
  });

  // Backend auto-stop watchdog timer (checks every 5 seconds)
  setInterval(() => {
    const sessions = billingService.getAllSessions();
    const now = new Date();
    sessions.forEach(session => {
      if (now >= session.endTime) {
        console.log(`[Socket] Waktu habis untuk: ${session.computerId}. Auto-stopping...`);
        billingService.endSession(session.computerId);
        
        io.to(session.computerId).emit("command_lock", { message: "Waktu habis, sesi dihentikan otomatis." });
        io.emit("status_update", { computerId: session.computerId, status: "idle" });
        io.emit("history_update", billingService.getHistory());
      }
    });
  }, 5000);
};
