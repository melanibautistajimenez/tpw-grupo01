// Prepara un correo; el visitante lo revisa y lo envía desde su aplicación.
const formulario = document.getElementById('formulario-reserva');
const resultado = document.getElementById('resultado');
const enlaceCorreo = document.getElementById('enlace-correo');

formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const sede = document.getElementById('sede').value;
    const listaServicios = document.getElementById('servicio');
    const servicio = listaServicios.options[listaServicios.selectedIndex].text;
    const mensaje = document.getElementById('mensaje').value.trim();

    if (nombre === '') {
        document.getElementById('nombre').setCustomValidity('Escribe tu nombre.');
        formulario.reportValidity();
        return;
    }

    const asunto = 'Solicitud de cita - ' + servicio;
    const contenido = 'Hola, Finas Nails. Me gustaría solicitar una cita.\n\n'
        + 'Nombre: ' + nombre + '\n'
        + 'Correo: ' + email + '\n'
        + 'Sede: ' + sede + '\n'
        + 'Servicio: ' + servicio + '\n'
        + 'Mi idea: ' + (mensaje || 'Por coordinar') + '\n\n'
        + 'Quedo a la espera de su respuesta para confirmar la disponibilidad.';

    enlaceCorreo.href = 'mailto:finasnails1@gmail.com?subject='
        + encodeURIComponent(asunto) + '&body=' + encodeURIComponent(contenido);
    resultado.hidden = false;
});

// Si cambian los datos, hay que preparar de nuevo el correo.
formulario.addEventListener('input', function () {
    document.getElementById('nombre').setCustomValidity('');
    resultado.hidden = true;
    enlaceCorreo.removeAttribute('href');
});
