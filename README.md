# Lenner Amaya Esquivel

Experiencia personal en español. React, TypeScript, Vite, Tailwind CSS y Framer Motion.

## Ejecutar

```sh
npm install
npm run dev
npm run build
npm run preview
```

## Editar el contenido

`src/data/profile.ts` contiene la biografía, el cargo, las frases, los ejes profesionales, los principios y `LINKEDIN_URL`. Configurar la URL real para habilitar el botón. No se han inventado fechas, resultados, clientes ni empleadores adicionales. Los elementos de `career` admiten `year` y `role` para incorporar una trayectoria documentada.

## Introducción

Los archivos originales `public/assets/lenner-intro.mp4` y `public/assets/lenner-final.png` se conservan sin cambios. El video mide 720 × 1280 y dura 4,01 segundos. El PNG mide 1024 × 1536 y tiene transparencia. El último fotograma del video tiene los brazos abajo: por eso se usa una pausa de 280 ms, una disolvencia de 450 ms y un velo atmosférico junto con la revelación escalonada del nombre.

La calibración de rostro y encuadre está en `.character-image` y `.character-video` en `src/styles/global.css`. La máquina de estados, bloqueo de reproducción y espera máxima están en `src/hooks/useIntro.ts`. La animación se omite si el dispositivo solicita movimiento reducido. Una conexión lenta muestra el retrato y permite saltar la introducción.

## Diseño y rendimiento

Mobile first; safe areas de iOS; fuentes incluidas localmente; sin fotografías externas, analítica ni servicios de terceros. El progreso de scroll usa MotionValues y no actualiza React en cada fotograma. Las revelaciones se activan al entrar en pantalla y se ejecutan una sola vez. Las escenas posteriores son ligeras y sus gráficos son SVG. Los originales multimedia suman aproximadamente 2,6 MB.
