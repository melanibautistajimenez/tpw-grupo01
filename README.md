# Finas Nails

Sitio web de Finas Nails para presentar sus servicios, diseños y medios de contacto.
Incluye Inicio, Servicios y tarifas, Galería, Nosotros y Contacto y Reservas.

## Tecnologías

- HTML5 para el contenido y la navegación.
- CSS3 con variables compartidas, Flexbox, Grid y consultas de medios para el diseño responsive.
- JavaScript sin frameworks para preparar las solicitudes de cita por correo.

Es un sitio estático: no utiliza PHP, backend, base de datos, gestor de paquetes ni proceso de compilación.

## Estructura

```text
tpw-grupo01/
├── assets/
│   └── img/
│       └── logo.jpg
├── css/
│   ├── variables.css
│   ├── cabecera.css
│   ├── estilos.css
│   ├── servicios.css
│   ├── galeria.css
│   ├── nosotros.css
│   └── contacto.css
├── js/
│   └── contacto.js
├── pages/
│   ├── servicios.html
│   ├── galeria.html
│   ├── nosotros.html
│   └── contacto.html
├── index.html
└── README.md
```

## Ejecución local

Desde la carpeta del repositorio, si tienes Python 3 instalado:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Abre [Inicio en el servidor local](http://127.0.0.1:8000/) y utiliza el menú para recorrer las páginas.
Detén el servidor con `Ctrl+C`. También puedes abrir `index.html` directamente en el navegador;
el sitio no requiere instalar dependencias.

Las fotografías de la galería se cargan desde Pinterest y los vídeos se insertan desde YouTube;
su disponibilidad depende de la conexión y del proveedor externo. El logo sí está en `assets/img/`.

El formulario valida los campos y genera un enlace `mailto:` con los datos de la solicitud.
El visitante abre su aplicación de correo, revisa y envía el mensaje. El sitio no envía correos
automáticamente ni registra reservas: la cita se confirma al recibir la respuesta del salón.

## Variables CSS

Todas las páginas cargan `css/variables.css` antes de su hoja específica y, al final,
`css/cabecera.css`. El bloque `:root` reúne la paleta compartida, fuentes, espaciados por función,
radios, sombra de tarjetas y transición de la galería.

Se conservan los nombres que ya utilizaba Galería, como `--color-text-muted`,
`--color-card-bg` y `--transition-smooth`. Por ejemplo, modifica `--color-primary-dark`
para ajustar el acento de las páginas internas o `--radius-card` para cambiar sus tarjetas.

Los colores propios de Inicio permanecen en el selector `body` de `css/estilos.css`
con el prefijo `--color-home-`. Así se mantiene su apariencia diferenciada. Los valores
específicos de un componente que no se comparten permanecen en su hoja.

Las rutas de navegación y recursos son relativas para funcionar también dentro de un
subdirectorio. Desde `pages/` se utiliza `../` para volver a la raíz. Cualquier futuro
`url(...)` de CSS debe resolverse desde `css/`, por ejemplo `../assets/img/logo.jpg`.

## Web pública

[Visitar Finas Nails](https://melanibautistajimenez.github.io/tpw-grupo01/).
URL confirmada mediante la configuración de GitHub Pages y una respuesta HTTP 200 con
el contenido de Finas Nails el 15 de octubre de 2026. La publicación existente utiliza
la rama `main` y la raíz del repositorio.

## Descripción de GitHub (About)

La cuenta disponible tiene permiso para enviar cambios, pero no permisos de administración
para editar los metadatos del repositorio. Una persona con esos permisos puede abrir
[el repositorio](https://github.com/melanibautistajimenez/tpw-grupo01), pulsar el engranaje
de **About** y guardar:

- **Description:** Sitio web de Finas Nails para presentar sus servicios, diseños y medios de contacto.
- **Website:** `https://melanibautistajimenez.github.io/tpw-grupo01/`

## Comprobaciones locales

El repositorio no incluye una suite de pruebas ni herramientas de compilación.
La sintaxis del script puede comprobarse con Node.js, si está instalado:

```sh
node --check js/contacto.js
```

Al revisar cambios, recorre las cinco páginas en escritorio y móvil, comprueba enlaces,
recursos y consola, y prepara una solicitud de prueba sin abrir ni enviar el correo.
Al modificar variables compartidas, revisa también los estados de navegación y de los botones.
