.css{
    /* ==========================================================================
   1. ARQUITECTURA CSS & VARIABLES DE DISEÑO (:root)
   ========================================================================== */
:root {
  --color-primary: #c48b9f;
  --color-primary-dark: #a65b75;
  --color-secondary: #fcedf2;
  --color-bg: #faf7f8;
  --color-card-bg: #ffffff;
  --color-text: #333333;
  --color-text-muted: #666666;
  --border-color: #f0e6e8;
  --font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
/* ==========================================================================
   2. ESTILOS GLOBALES & RESET
   ========================================================================== */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: var(--font-family);
  background-color: var(--color-bg);
  color: var(--color-text);
  line-height: 1.6;
  overflow-x: hidden; /* Evita desbordamiento horizontal (scroll-x) */
}

/* ==========================================================================
   3. CABECERA & NAVEGACIÓN (Flexbox)
   ========================================================================== */
header {
  background-color: var(--color-card-bg);
  border-bottom: 1px solid var(--border-color);
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
}
header h1 {
  font-size: 2rem;
  color: var(--color-primary);
  margin-bottom: 15px;
  letter-spacing: 1px;
}
nav ul {
  list-style: none;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
}
nav a {
  text-decoration: none;
  color: var(--color-text-muted);
  font-weight: 600;
  font-size: 0.95rem;
  padding: 8px 16px;
  border-radius: 20px;
  transition: var(--transition-smooth);
}
nav a:hover,
nav a:focus {
  background-color: var(--color-secondary);
  color: var(--color-primary-dark);
  outline: none;
}
/* ==========================================================================
   4. ESTRUCTURA PRINCIPAL & PRESENTACIÓN
   ========================================================================== */
main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}
#presentacion-galeria {
  text-align: center;
  max-width: 750px;
  margin: 0 auto 50px auto;
}
#presentacion-galeria h2 {
  font-size: 2.2rem;
  color: var(--color-primary-dark);
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 1px;
}
#presentacion-galeria p {
  font-size: 1.1rem;
  color: var(--color-text-muted);
}
/* ==========================================================================
   5. CATÁLOGO DE DISEÑOS (CSS Grid )
   ========================================================================== */
#fotos-portafolio {
  margin-bottom: 60px;
}
#fotos-portafolio h3,
#videos-demostración h3 {
  font-size: 1.8rem;
  color: var(--color-text);
  margin-bottom: 30px;
  text-align: center;
  position: relative;
}
/* Aplicación de CSS Grid para el catálogo */
#fotos-portafolio {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 30px;
}
/* Estilo de Tarjetas con Acabado UI y Microinteracciones */
#fotos-portafolio article {
  background-color: var(--color-card-bg);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
  border: 1px solid var(--border-color);
  transition: var(--transition-smooth);
  display: flex;
  flex-direction: column;
}
#fotos-portafolio article:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(196, 139, 159, 0.2);
}
#fotos-portafolio h4 {
  padding: 20px 20px 0 20px;
  font-size: 1.2rem;
  color: var(--color-text);
}
#fotos-portafolio figure {
  margin: 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
#fotos-portafolio img {
  width: 100%;
  height: 230px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
  transition: transform 0.5s ease;
}
#fotos-portafolio article:hover img {
  transform: scale(1.03);
}
#fotos-portafolio figcaption {
  font-size: 0.95rem;
  color: var(--color-text-muted);
  line-height: 1.5;
}
/* ==========================================================================
   6. SECCIÓN DE DEMOSTRACIONES (Flexbox adaptativo para videos)
   ========================================================================== */
#videos-demostración {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  background-color: var(--color-card-bg);
  padding: 40px;
  border-radius: 16px;
  border: 1px solid var(--border-color);
}
#videos-demostración h3 {
  grid-column: 1 / -1;
}
#videos-demostración article {
  background: var(--color-bg);
  padding: 25px;
  border-radius: 12px;
  text-align: center;
  border: 1px solid var(--border-color);
  transition: var(--transition-smooth);
}
#videos-demostración article:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
}
#videos-demostración h4 {
  font-size: 1.15rem;
  color: var(--color-primary-dark);
  margin-bottom: 15px;
}
/* Contenedor responsivo para los iframes de YouTube */
#videos-demostración iframe {
  width: 100%;
  max-width: 320px;
  height: 569px; /* Proporción ideal para Shorts / Reels */
  border-radius: 10px;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
#videos-demostración p {
  margin-top: 15px;
  font-weight: 600;
  color: var(--color-text-muted);
}
/* ==========================================================================
   7. PIE DE PÁGINA (Footer)
   ========================================================================== */
footer {
  text-align: center;
  padding: 30px;
  background-color: #2c2c2c;
  color: #ffffff;
  font-size: 0.9rem;
  margin-top: 60px;
}
/* ==========================================================================
   8. DISEÑO ADAPTATIVO (Responsive Design - Media Queries)
   ========================================================================== */
@media (min-width: 768px) {
  #videos-demostración {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 480px) {
  header h1 {
    font-size: 1.6rem;
  }
  #presentacion-galeria h2 {
    font-size: 1.8rem;
  }
  main {
    padding: 20px 10px;
  }
  #videos-demostración {
    padding: 20px 10px;
  }
}

}
