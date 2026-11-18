document.addEventListener('DOMContentLoaded', () => {
  // Referencias al DOM
  const formulario = document.getElementById('formulario-reserva');
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
  const avisoAlmacenamiento = document.getElementById('aviso-almacenamiento');

  const STORAGE_KEY = 'finasNails_solicitudes';

  // Cargar estado inicial desde localStorage (Array de objetos)
  let solicitudes = cargarSolicitudes();

  // Renderizar historial al cargar la página
  renderizarSolicitudes();

  // Validación en tiempo real (limpia mensajes de error al escribir)
  [inputNombre, inputEmail, selectSede, selectServicio].forEach((campo) => {
    campo.addEventListener('input', () => {
      campo.setCustomValidity('');
    });
  });

  // Una solicitud preparada deja de ser vigente cuando se editan los datos.
  formulario.addEventListener('input', () => {
    resultado.hidden = true;
    enlaceCorreo.removeAttribute('href');
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
  function cargarSolicitudes() {
    try {
      const guardadas = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (!Array.isArray(guardadas) || !guardadas.every((cita) =>
        cita && typeof cita === 'object' && Number.isFinite(cita.id) &&
        ['nombre', 'email', 'sede', 'servicio', 'idea', 'fecha'].every((campo) =>
          typeof cita[campo] === 'string')
      )) {
        throw new Error('Historial no válido');
      }
      return guardadas;
    } catch {
      mostrarAvisoAlmacenamiento();
      return [];
    }
  }

  function mostrarAvisoAlmacenamiento() {
    avisoAlmacenamiento.textContent = 'No pudimos recuperar o guardar tu historial. Puedes preparar tu correo; los cambios del historial podrían perderse al cerrar o recargar esta página.';
    avisoAlmacenamiento.hidden = false;
  }

  function guardarEnStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(solicitudes));
      avisoAlmacenamiento.hidden = true;
    } catch {
      mostrarAvisoAlmacenamiento();
    }
  }

  function renderizarSolicitudes() {
    listaSolicitudes.replaceChildren();

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

      // Los datos del visitante se muestran como texto, nunca como HTML.
      const cabecera = document.createElement('div');
      cabecera.className = 'cita-header';
      const servicio = document.createElement('span');
      servicio.className = 'cita-badge';
      servicio.textContent = cita.servicio;
      const fecha = document.createElement('small');
      fecha.className = 'cita-fecha';
      fecha.textContent = cita.fecha;
      cabecera.append(servicio, fecha);
      tarjeta.appendChild(cabecera);

      [['Cliente:', cita.nombre], ['Sede:', cita.sede], ['Detalle:', cita.idea]].forEach(([etiqueta, valor]) => {
        const parrafo = document.createElement('p');
        const titulo = document.createElement('strong');
        titulo.textContent = etiqueta;
        parrafo.append(titulo, document.createTextNode(' ' + valor));
        tarjeta.appendChild(parrafo);
      });

      const botonEliminar = document.createElement('button');
      botonEliminar.type = 'button';
      botonEliminar.className = 'btn-eliminar-cita';
      botonEliminar.dataset.id = String(cita.id);
      botonEliminar.textContent = 'Eliminar registro';
      tarjeta.appendChild(botonEliminar);

      listaSolicitudes.appendChild(tarjeta);
    });
  }
});
