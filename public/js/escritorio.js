// escritorio.js
import io from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js';
const socket = io();

document.addEventListener('DOMContentLoaded', () => {
    const lblEscritorio = document.querySelector('#lblEscritorio');
    const divAlerta = document.querySelector('.alert');
    const lblPendientes = document.querySelector('#lblPendientes');
    const lblTicket = document.querySelector('small');
    const btnAtender = document.querySelector('button');

    const searchParams = new URLSearchParams(window.location.search);

    if (!searchParams.has('escritorio')) {
        window.location = 'index.html';
        throw new Error('El escritorio es obligatorio');
    }

    const escritorio = searchParams.get('escritorio');
    lblEscritorio.innerText = escritorio;
    divAlerta.style.display = 'none';

    socket.on('connect', () => {
        btnAtender.disabled = false;
    });

    socket.on('disconnect', () => {
        btnAtender.disabled = true;
    });

    socket.on('tickets-pendientes', (length) => {
        lblPendientes.innerText = length;
    });

 const audio = new Audio('./../audio/new-ticket.mp3'); 

    btnAtender.addEventListener('click', () => {
        socket.emit('atender-ticket', { escritorio }, ({ ok, ticket, msg }) => {

            if (!ok) {
                lblTicket.innerText = 'Nadie.';
                divAlerta.style.display = '';
                mostrarAlerta()
            } else {
                audio.play();
            }
            lblTicket.innerText = 'Ticket ' + ticket.numero;
        });
    });

    function mostrarAlerta() {
        var alerta = document.getElementById('alerta');
        alerta.style.display = 'block'; // Mostrar el elemento

        setTimeout(function () {
            alerta.style.display = 'none'; // Ocultar después de 5 segundos
        }, 2000);
    }


});
