document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("btnNuevoTicket");
    const lblNuevoTicket = document.getElementById("lblNuevoTicket");
  
    const socket = io();
  
    btn.addEventListener("click", () => {
      socket.emit("siguiente-ticket", null, (siguienteTicket) => {
        if (siguienteTicket && siguienteTicket.numero !== undefined) {
          lblNuevoTicket.textContent = `Ticket ${siguienteTicket.numero}`;
        }
      });
    });
  
    socket.on("ticket-actual", (ticket) => {
      if (ticket !== undefined) {
        lblNuevoTicket.textContent = `Ticket ${ticket}`;
      }
    });
  });