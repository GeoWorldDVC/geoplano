GEOPLANO — Paquete para Netlify  /  Netlify package
====================================================

SUBIR (2 min) / DEPLOY:
1. Ve a:  https://app.netlify.com/drop   (no necesitas cuenta / no account needed)
2. Arrastra ESTA CARPETA "geoplano" completa a la pagina.
   Drag THIS WHOLE "geoplano" FOLDER onto the page.
3. Netlify te da una URL https://xxxxx.netlify.app

EN EL IPHONE / ON IPHONE:
1. Abre esa URL en Safari / Open the URL in Safari.
2. Comparte (Share) -> "Agregar a pantalla de inicio" / "Add to Home Screen".
3. Abre la app desde el icono. / Open it from the icon.
4. Para GPS: toca Activar GPS -> "Permitir" ubicacion. / For GPS: tap Start GPS -> "Allow".

OFFLINE:
- Tras abrirla una vez con internet, la app, el motor de PDF y tus proyectos
  funcionan sin senal. Usa "Guardar mapa de esta zona (offline)" con cobertura
  ANTES de ir a campo para cachear los mosaicos.
- After opening once online, the app, PDF engine and your projects work offline.
  Use "Save this area's map (offline)" while you have coverage BEFORE the field.

ARCHIVOS / FILES:
  index.html              la app / the app
  manifest.webmanifest    config PWA (instalable)
  sw.js                   service worker (cache offline)
  icon-192/512, apple-touch-icon  iconos

Nota: roles Admin/Solo-Ver es un candado de interfaz, no seguridad real.
Note: Admin/View-only is a UI gate, not real security.
