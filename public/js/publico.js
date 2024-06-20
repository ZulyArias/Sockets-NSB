const socket = io();

socket.on('connect', () => {
  socket.on('estado-actual', (ultimos4) => {
    ultimos4.forEach((ticket, index) => {
      document.getElementById(`lblTicket${index + 1}`).textContent = `Ticket ${ticket.numero}`;
      document.getElementById(`lblEscritorio${index + 1}`).textContent = ticket.escritorio
        ? `Escritorio ${ticket.escritorio}`
        : 'En espera';
    });
  });
});
