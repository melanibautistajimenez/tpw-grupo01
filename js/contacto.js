document.addEventListener('DOMContentLoaded', () => {
  // Referencias al DOM
  const formulario = document.getElementById('formulario-contacto') || document.querySelector('form');
  const inputNombre = document.getElementById('nombre');
  const inputEmail = document.getElementById('email');
  const selectSede = document.getElementById('sede');
  const selectServicio = document.getElementById('servicio');
  const inputMensaje = document.getElementById('mensaje');
  
  const resultado = document.getElementById('resultado');
  const enlaceCorreo = document.getElementById('enlace-correo') || document.querySelector('a[href^="mailto:"]');
  
  // Referencias para el historial con localStorage
  const listaSolicitudes = document.getElementById('lista-solicitudes');
  const mensajeVacio = document.getElementById('mensaje-vacio');
  const btnLimpiarHistorial = document.getElementById('btn-limpiar-historial');

  const STORAGE_KEY = 'finasNails_solicitudes';

  // Cargar estado inicial desde localStorage (Array de objetos)
  let solicitudes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  // Renderizar historial al cargar la página
  renderizarSolicitudes();

  // Validación en tiempo real (limpia mensajes de error al escribir)
  [inputNombre, inputEmail, selectSede, selectServicio].forEach((campo) => {
    campo.addEventListener('input', () => {
      campo.setCustomValidity('');
    });
  });

  // Evento principal de envío del formulario
  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nombre = inputNombre.value.trim();
    const email = inputEmail.value.trim();
    const sede = selectSede.value;
    const servicioTexto = selectServicio.options[selectServicio.selectedIndex]?.text || '';
    const mensaje = inputMensaje.value.trim();

    // Validaciones dinámicas
    if (nombre.length < 3) {
      inputNombre.setCustomValidity('Ingresa tu nombre completo (mínimo 3 caracteres).');
      formulario.reportValidity();
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      inputEmail.setCustomValidity('Ingresa un correo electrónico válido.');
      formulario.reportValidity();
      return;
    }

    if (!sede) {
      selectSede.setCustomValidity('Selecciona una sede de preferencia.');
      formulario.reportValidity();
      return;
    }

    if (!selectServicio.value) {
      selectServicio.setCustomValidity('Selecciona el servicio que deseas.');
      formulario.reportValidity();
      return;
    }

    // 1. Crear objeto de solicitud y guardar en localStorage
    const nuevaSolicitud = {
      id: Date.now(),
      nombre,
      email,
      sede,
      servicio: servicioTexto,
      idea: mensaje || 'Por coordinar',
      fecha: new Date().toLocaleDateString('es-PE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    };

    solicitudes.unshift(nuevaSolicitud); // Agrega al inicio del array
    guardarEnStorage();
    renderizarSolicitudes();

    // 2. Preparar enlace mailto (funcionalidad original)
    const asunto = `Solicitud de cita - ${servicioTexto}`;
    const contenido =
      `Hola, Finas Nails. Me gustaría solicitar una cita.\n\n` +
      `Nombre: ${nombre}\n` +
      `Correo: ${email}\n` +
      `Sede: ${sede}\n` +
      `Servicio: ${servicioTexto}\n` +
      `Mi idea: ${nuevaSolicitud.idea}\n\n` +
      `Quedo a la espera de su respuesta para confirmar la disponibilidad.`;

    if (enlaceCorreo) {
      enlaceCorreo.href = `mailto:finasnails1@gmail.com?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(contenido)}`;
    }
    if (resultado) {
      resultado.hidden = false;
    }

    formulario.reset();
  });

  // Evento para eliminar una solicitud individual (Delegación de eventos)
  listaSolicitudes.addEventListener('click', (evento) => {
    if (evento.target.classList.contains('btn-eliminar-cita')) {
      const idEliminar = Number(evento.target.dataset.id);
      solicitudes = solicitudes.filter((item) => item.id !== idEliminar);
      guardarEnStorage();
      renderizarSolicitudes();
    }
  });

  // Evento para limpiar todo el historial
  btnLimpiarHistorial.addEventListener('click', () => {
    solicitudes = [];
    guardarEnStorage();
    renderizarSolicitudes();
  });

  // Funciones auxiliares
  function guardarEnStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(solicitudes));
  }

  function renderizarSolicitudes() {
    listaSolicitudes.innerHTML = '';

    if (solicitudes.length === 0) {
      mensajeVacio.hidden = false;
      btnLimpiarHistorial.hidden = true;
      return;
    }

    mensajeVacio.hidden = true;
    btnLimpiarHistorial.hidden = false;

    solicitudes.forEach((cita) => {
      const tarjeta = document.createElement('article');
      tarjeta.className = 'tarjeta-cita';

      tarjeta.innerHTML = `
        <div class="cita-header">
          <span class="cita-badge">${cita.servicio}</span>
          <small class="cita-fecha">${cita.fecha}</small>
        </div>
        <p><strong>Cliente:</strong> ${cita.nombre}</p>
        <p><strong>Sede:</strong> ${cita.sede}</p>
        <p><strong>Detalle:</strong> ${cita.idea}</p>
        <button type="button" class="btn-eliminar-cita" data-id="${cita.id}">
          Eliminar registro
        </button>
      `;

      listaSolicitudes.appendChild(tarjeta);
    });
  }
});
