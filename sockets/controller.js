import TicketControl from '../models/ticket-control.js';

let ticketControl;

const socketController = (socket, io) => {

    // Inicializar ticketControl (solo una vez)
    if (!ticketControl) {
        ticketControl = new TicketControl(io);
    }

    // Emitir estado inicial al conectar un nuevo cliente
    socket.emit('ticket-actual', ticketControl.ultimo);
    socket.emit('estado-actual', ticketControl.ultimos4);
    socket.emit('tickets-pendientes', ticketControl.tickets.length);


    socket.on('siguiente-ticket', (payload, callback) => {
        const siguiente = ticketControl.siguiente();
        io.emit('ticket-actual', ticketControl.ultimo); // Emitir el último número de ticket a todos
        io.emit('tickets-pendientes', ticketControl.tickets.length);
        callback(siguiente);
    });

    socket.on('atender-ticket', ({ escritorio }, callback) => {
        if (!escritorio) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            });
        }

        const ticket = ticketControl.atenderTicket(escritorio);
        io.emit('estado-actual', ticketControl.ultimos4); // Emitir los últimos 4 tickets a todos
        io.emit('tickets-pendientes', ticketControl.tickets.length);

        if (!ticket) {
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            });
        } else {
            callback({
                ok: true,
                ticket
            });
        }
    });
};

export { socketController };
