const botonMenu = document.querySelector('.menu-boton');

botonMenu.addEventListener('click', () => {
    const abierto = botonMenu.getAttribute('aria-expanded') === 'true';
    botonMenu.setAttribute('aria-expanded', String(!abierto));
});

botonMenu.parentElement.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && botonMenu.offsetWidth && botonMenu.getAttribute('aria-expanded') === 'true') {
        botonMenu.setAttribute('aria-expanded', 'false');
        botonMenu.focus();
    }
});

botonMenu.hidden = false;
