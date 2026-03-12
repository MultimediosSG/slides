---
marp: true
theme: alo
paginate: true
---

<!-- _class: cover -->
<style scoped>
section {
  --cover: url(img_00027_.png);
}
</style>
# Lenguaje HTML
## Contenidos

- Bases de HTML
- Multimedia en HTML
- Formularios en HTML
- Semántica y mejora progresiva

> Inspirado en el bootcamp de <br><strong>Manz.dev</strong> todos los créditos a el.

---

## Etiquetas HTML

HTML  (hyper text markup language) fue creado para dar estructura y contenido.

Las etiquetas HTML tienen la siguiente estructura:
```html
<etiqueta atributo="valor">Contenido</etiqueta>
```

- los atributos HTML **siempre** son strings
- Los atributos más populares: ```id``` y ```class```







---
## Categorías

Estructura general: `<html>`, `<head>` y `<body>`
Etiquetas agrupación y texto: `<div>`, `<p>` ... / `<span>`, `<a>` ...
Etiquetas multimedia: `<img>`, `<video>`, `<audio>`, `<iframe>`...
Etiquetas de formularios: `<form>`, `<input>`, `<textarea>`, ...
Etiquetas de scripting + interactivas: `<script>`, `<details>`, `<dialog>` ...
Etiquetas semánticas: `<article>`, `<section>`, `<header>` ...
Etiquetas de metadatos: `<title>`, `<link>`, `<meta>` ...

[Tabla periódica de los elementos HTML](https://lenguajehtml.com/html/introduccion/tabla-periodica-html5/)


---
## HTML Estructura y Sintaxis

Todos los documentos HTML tienen una estructura con los siguientes elementos

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Título de la página</title>
    <meta charset="utf8">
    <link rel="stylesheet" href="index.css"> <!-- Añade estilos, sin cierre -->
    <script src="index.js"></script>         <!-- Añade Javascript -->
  </head>
  <body>
    <div class="page">
      <h1>Título visual de la página</h1>
      <p>Párrafo de texto donde colocamos información.</p>
    </div>
  </body>
</html>
```

---
## Agrupación y texto

- Etiquetas de bloque: `<div>`, `<p>`, `<ul>`, `<ol>`... (agrupan) → Tabla
- Etiquetas en línea: `<span>`, `<strong>`, `<a>`, `<em>`... (fragmentos de texto)

```html
<p>
  Esto es un párrafo de texto donde estamos
  <strong>agrupando</strong> el <em>contenido</em>.
</p>
```

---
## Enlaces

- Contenido de la etiqueta: Texto, imagen o contenido a enlazar.
- Atributo `href`: Recurso o dirección URL a donde nos envía el enlace.
- Atributo `target`: Donde se abre el enlace.
- Atributo `download`: El recurso se descarga en lugar de abrirse.

```html
<a href="https://www.google.com">Google</a>
<a href="https://www.google.com" target="_blank">Google</a>
<a href="documento.pdf" download>Documento</a>
<a href="a837b21.jpg" download="imagen.jpg">Desrcargar Imagen</a>
```

---
<!-- _class: cover -->
<style scoped>
section {
  --cover: url(img_00033_.png);
}
</style>
# Multimedia

---
## Multimedia (Imagenes)

- Etiqueta `<img>` (en línea, sin cierre)
- Atributo `src`: URL de la imagen
- Atributo `alt`: Texto alternativo (accesibilidad)
- Atributo `width` y `height`: Tamaño de la imagen
- El atributo `loading`: para hacer lazy load del contenido
eager, lazy

```html
<img src="imagen.webp"
     alt="Descripción breve de la imagen"
     loading="lazy"
     fetchpriority="low"
     decoding="async">
```
---
## Multimedia (Imagenes)

- Etiquetas modernas para imágenes: `<picture>` y `<source>`
- Permiten ofrecer diferentes formatos y resoluciones de imagen para mejorar el rendimiento y la compatibilidad.

```html
<picture>
  <source srcset="imagen.avif">
  <source srcset="imagen.webp">
  <img src="imagen.jpg" alt="Descripción breve de la imagen">
</picture>
```

```html
<figure>
  <picture>
    <source srcset="imagen.avif">
    <source srcset="imagen.webp">
    <img src="imagen.jpg" alt="Descripción breve de la imagen">
  </picture>
  <figcaption>Descripción detallada a pie de imagen.</figcaption>
</figure>
```

---
## Multimedia (Video)

- Etiqueta `<video>` (en línea, con cierre)
- Atributo `src`: URL del video
- Atributo `controls`: Muestra los controles de reproducción
- Atributo `autoplay`: Reproduce el video automáticamente
- Atributo `loop`: Reproduce el video en bucle
- Atributo `muted`: Reproduce el video sin sonido

```html
<video src="video.mp4"
       width="640" height="360"
       preload="metadata"
       poster="imagen.webp"
       controls loop muted playsinline>
</video>
```

---
## Multimedia (Video)

- Etiqueta `<source>` y `<track>` 

```html
<video width="640" height="360" controls loop muted playsinline
       preload="metadata" poster="imagen.webp">
  <source src="video.webm" type="video/webm">
  <source src="video.mp4" type="video/mp4">
  <track src="subs-es.vtt" srclang="es">
  <track src="subs-en.vtt" srclang="en">
  <img src="fallback.webp" alt="Descripción de imagen de fallback">
  Fallback de texto.
</video>
```

---
## Multimedia (Audio)
- Etiqueta `<audio>` (en línea, con cierre)
- Atributo `src`: URL del audio
- Atributo `controls`: Muestra los controles de reproducción
- Atributo `autoplay`: Reproduce el audio automáticamente
- Atributo `loop`: Reproduce el audio en bucle
- Atributo `muted`: Reproduce el audio sin sonido
```html
<audio src="audio.mp3" controls loop autoplay muted></audio>
```
```html
<audio controls loop muted preload="metadata">
  <source src="audio.opus">
  <source src="audio.ogg">
  <source src="audio.mp3">
</audio>
```

---
## Multimedia (Iframes)
- Etiqueta `<iframe>` (en línea, con cierre)
- Atributo `src`: URL del recurso a mostrar
- Atributo `width` y `height`: Tamaño del iframe

```html
<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" width="560" height="315"></iframe>
```

---
<!-- _class: cover -->
<style scoped>
section {
  --cover: url(img_00048_.png);
}
</style>
# Formularios

---
## Formularios HTML
- Etiqueta `<form>` (con cierre)
- Atributo `action`: URL a donde se envían los datos del formulario
- Atributo `method`: Método de envío (GET o POST)
- Atributo `enctype`: Tipo de codificación de los datos (por ejemplo, `multipart/form-data` para archivos)
```html
<form action="/submit" method="POST" enctype="multipart/form-data">
  <!-- Campos del formulario -->
   <input name="q" value="lenguajehtml">
   <button>Enviar</button>
</form>
```

---
## Campos de formulario

```html
<input value="texto">
<input type="text" placeholder="Placeholder">
<input type="hidden">
<input type="password">
<input type="search"> <!-- También tel, url, email -->

<input type="number"> <input type="range">
<input type="color" value="#458855">
<input type="file">
<input type="date"> <!-- También time, week, month -->
<input type="checkbox" checked>
<input type="radio" checked name="group">

<input type="submit">
<input type="image" src="manzdev.png" width="32">
<input type="reset">
<input type="button"> <!-- Equivalente a <button> -->
```

---
## ¿Qué es la semántica en HTML?
- Usar la etiqueta más adecuada y mínima posible.
- Preferir estructura más lógica, clara y entendible.
- Más accesible y fácil de mantener (No sólo para humanos, también para máquinas)

```html
<!-- ✅ Opción 1: HTML -->
<a href="/indice.html">Acceder al índice</a>

<!-- ❌ Opción 2: Javascript -->
<button>Acceder al índice</button>
<script> button.onclick = () => (location.href = "/indice.html") </script> <!-- Simplificación -->

<!-- ❌ Opción 3: HTML + Javascript -->
<button onClick="location.href='/indice.html'">Acceder al índice</button>
```

---
## Campos de formulario(II)

```html
<input type="radio" name="a">

<select>
  <option value="1">HTML</option>
  <option value="2">CSS</option>
  <option value="3">Javascript</option>
</select>

<datalist id="data">
  <option value="HTML">Lenguaje HTML</option>
  <option value="CSS">Estilos CSS</option>
  <option value="JS">Programación Javascript</option>
</datalist>
<input list="data">

<textarea cols="30" style="field-sizing: content"></textarea>
```

---
## Campos de formulario(III)

```html
<meter max="100"
       optimum="100" high="75"
       value="25"></meter>
<meter max="100"
       optimum="100" high="75"
       value="90"></meter>

<progress max="100" value="50"></progress>
<progress></progress>

<div>
  Texto sin label:
  <input type="checkbox">
</div>
<label>
  Texto usando label:
  <input type="checkbox">
</label>
```

---
<!-- _class: cover -->
<style scoped>
section {
  --cover: url(img_00044_.png);
}
</style>
# Semántica

---
## Etiquetas semánticas en HTML
- Etiquetas de agrupación semántica: `<article>`, `<section>`, `<nav>`, `<aside>`, `<header>`, `<footer>`...
- Etiquetas de texto semántico: `<main>`, `<figure>`, `<figcaption>`, `<mark>`, `<time>`...
- Etiquetas de scripting e interactivas: `<details>`, `<dialog>`, `<summary>`...

```html
<div>
  <h2>Título</h2>
  Esta es una descripción para la card.
  Aquí puedes agregar datos relevantes.
</div>
```
```html
<div class="card-content">
  <h2 class="card-title">Título</h2>
  <p class="card-description">
    Esta es una descripción para la card.
    Aquí puedes agregar datos relevantes.
  </p>
  <button class="card-button">Más</button>
</div>
```

---
## Etiquetas semánticas en HTML

```html
<article class="card-content">
  <header>
    <h2 class="card-title">Título</h2>
  </header>
  <p class="card-description">
    Esta es una descripción para la card.
    Aquí puedes agregar datos relevantes.
  </p>
  <footer>
    <button class="card-button">Más</button>
  </footer>
</article>
```
- Mitos: No usar más de un ``<h1>`` por página
- Mitos: No usar más de un ``<header>`` o ``<footer>``
- Etiquetas dentro de otras: [CanIInclude](https://caniuse.com/mdn-html_elements)
- Información de compatibilidad: [Baseline](https://lenguajehtml.com/baseline/)

---
## HTML-first + Mejora progresiva

- Se basa en asegurar lo mínimo en HTML (y ampliarlo/mejorarlo con Javascript)
- Ejemplo: Formulario HTML envía a backend + Se mejora con Javascript
```html
<form action="/search" method="get">
  <!-- ... --->
  <input type="search" name="q">
  <button>Buscar</button>
</form>

<div id="results">
  <!-- Aquí resultados -->
</div>
```
```html
<style>
  /* Código CSS para hacerlo bonito */
</style>

<script>
  /* Código Javascript que MEJORA el HTML */
</script>

```

---
## Acordeones con ``<details>``

- La etiqueta ``<details>`` y el atributo open
- La etiqueta ``<summary>``
- El atributo name (acordeón exclusivo)
- El pseudoelemento CSS ::details-content
- Personalizar flecha summary::marker

```html
<details>
  <summary>Día 1: HTML</summary>
  <ul>
    <li>Bases de HTML</li>
    <li>Multimedia en HTML</li>
    <li>Formularios en HTML</li>
    <li>Semántica y HTML progresivo</li>
  </ul>
</details>
```

---
## Ventanas de diálogo con ``<dialog>``

- Etiqueta ``<dialog>`` y el atributo open
- Cerrar diálogo con ``<form method="dialog">...</form>``
- Cerrar con  o fuera con ``<dialog closedby="any">``
- Diálogos vs Diálogos modales
- Abrir/cerrar modales con ``command="show-modal"`` 
- El pseudoelemento CSS ::backdrop en modales
- Animar ventanas modales sin Javascript

```html
<dialog open>
  <h3>Título del diálogo</h3>
  <p>Mensaje de descripción del diálogo...</p>
  <footer>
    <button>Ok</button>
    <button>Cancelar</button>
  </footer>
</dialog>
```


---
## Popovers emergentes

- El atributo ``popover``
- El atributo ``popovertarget`` para definir el popover
- El atributo ``popovertargetaction`` define la acción
- Acciones disponibles: ``toggle``, ``hide`` o ``show``
- El pseudoelemento CSS ``::backdrop``
- Light Dismiss (descartar auto) se desactiva con el atributo ``popover`` a "manual"

```html
<div id="message" popover>
  <p>
    <strong>¡Alerta!</strong>:
    Esto es un <strong>mensaje emergente</strong>
  </p>
</div>

<button popovertarget="message"
        popovertargetaction="toggle">
  Mostrar
</button>
```
```css
[popover] {
  background: #222;
  border: 0;
  border-bottom: 5px solid steelblue;
  color: white;
  font-family: Jost;
  font-size: 1.2rem;
  padding: 0.05rem 1.25rem;
}
```

---
## Etiquetas como ``<search>`` o ``<hgroup>``

- La etiqueta ``<search>`` se usa como wrapper
- La etiqueta ``<hgroup>`` se usa para agrupar información de encabezado
Casos como encabezados ``<h1>`` con subtítulo ``<h2>`` no representan lo mismo

```html
<!-- Búsqueda o filtrado -->
<search>
  <!-- ... -->
</search>

<!-- Encabezado agrupado -->
<hgroup>
  <h1>Títular o título</h1>
  <p>Texto de acompañamiento.</p>
</hgroup>
```
---
## Referencias
- [Documentación oficial de HTML](https://developer.mozilla.org/es/docs/Web/HTML)
- [Tabla periódica de los elementos HTML](https://lenguajehtml.com/html/introduccion/tabla-periodica-html5/)
- [CanIInclude](https://caniuse.com/mdn-html_elements)
- [bootcamp.manz.dev](https://bootcamp.manz.dev/)


