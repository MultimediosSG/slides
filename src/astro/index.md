---
marp: true
theme: alo
paginate: true
---

<!-- _class: cover -->
<style scoped>
section {
  --cover: url(../assets/img_00057_astro.png);
}
</style>
#  Astro
## Contenidos
- Instalación de Astro
- FrontMatter
- Rutas en Astro
- Componentes Astro
- Props / Slots


> Inspirado en el bootcamp de <br><strong>Manz.dev</strong> todos los créditos a el.


---

## ¿Qué es Astro?
- Arquitectura de navegación: **MPA**, **SPA**
- Modalidad de renderizado: **SSG**, **SSR**, **CSR** → [Modalidades](../assets/ssr-ssg-csr.png)
- Ejemplos:
  - **React** = SPA + CSR (HTML casi vacío + JS lo hace todo en cliente)
  - **NextJS** = SPA + SSR (aunque también puede otros como SSG o CSR)
  - **Astro** = MPA + SSG (aunque también puede SPA con frameworks UI y SSR)
  - **Laravel** = MPA + SSR (apps con backends más tradicionales, como PHP o Java)
  - **HTML/JS vanilla** = MPA/SPA + CSR/SSR/SSG (puede ser cualquiera)

---

## Instalación de Astro

<split-slide style="--left: 60%; --right: 40%; --font-size: 1rem;">

```bash
# Asistente (elegir nombre carpeta, "minimal", y "yes" a todo)
$ pnpm create astro@latest
$ cd webgames
$ pnpm install

# Manual
$ mkdir webgames
$ pnpm init
$ pnpm add -D astro

# En ambos casos, durante la instalación...
✓ Lockfile passes supply-chain policies (328 entries in 2.1s)
[ERR_PNPM_IGNORED_BUILDS] Ignored build scripts: esbuild@0.27.7, sharp@0.34.5
$ pnpm approve-builds
```
<div>

- 1️⃣ Forma automática
  - 🤖 Asistente

- 2️⃣ Forma manual
  - 🏆 Mayor control


- 🛑 La instalación puede dar error
- 👀 Aprobar los «builds»

</div>
</split-slide>

---
## Estructura de carpetas de Astro

<split-slide style="--left: 50%; --right: 50%; --font-size: 1rem;">

```bash
📁 webgames
  ├─📁 components
  ├─📁 src
  │  └─📁 pages
  │     └─ index.astro
  ├─📁 public
  │  └─📃 favicon.svg
  ├─📁 node_modules
  │  └─ ...
  ├─📃 .gitignore
  ├─📃 README.md
  ├─📃 astro.config.mjs
  ├─📃 tsconfig.json
  ├─📃 package.json
  ├─📃 pnpm-workspace.yaml
  └─📃 pnpm-lock.yaml
```
<steps>
<step>

```js
// package.json
{
  "name": "webgames",
  "type": "module",
  "version": "0.0.1",
  "engines": {
    "node": ">=22.12.0"
  },
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  },
  "dependencies": {
    "astro": "^6.3.8"
  }
}
```
</step>
<step>

```js
// astro.config.mjs
// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  /* Configuración */
});
```
<div>

- De momento, vacío.
- 🎲 Más adelante añadiremos ciertas configuraciones
</div>
</step>
<step>

```js
// pnpm-workspace-yaml
allowBuilds:
  esbuild: true
  sharp: false
minimumReleaseAgeExclude:
  - astro@6.3.8
```
<div>

- Aquí podemos ver:
  - Lo que hemos aprobado con ``pnpm approve-builds``
  - Protección de ataques **supply chain** por defecto
  - Excepciones para saltarse la protección
</div>
</step>
<step>

```js
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```
<div>

- Astro usa Typescript internamente
- El fichero ``tsconfig.json`` permite configurarlo
- Viene con esto por defecto
</div>
</step>
<step>

```js
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
    }
  }
}
```
<div>

- Esto nos permite utilizar el alias ``@``
- Ahora, en los import podemos usar aliases
  - En lugar de ``import "../../modules/file.js";``
  - Usaremos ``import "@/modules/file.js";``
</div>
</step>
</steps>
</split-slide>

---
<!-- _class: cover -->
<style scoped>
section {
  --cover: url(../assets/img_00058_astro.png);
}
</style>
# FrontMatter

---
## FrontMatter de Astro


<split-slide style="--left: 50%; --right: 50%; --font-size: 1rem;">
<div>

- Los ``.astro`` provienen de los FrontMatter → [Front Matter](https://jekyllrb.com/docs/front-matter/)
- Front Matter de **Jekyll** → ``YAML`` + ``.md`` (markdown)
- Front Matter de **Astro** → ``NodeJS`` + ``.html``

- Puedes empezar en ``src/pages/index.astro``
- Cuando haces ``pnpm run dev``...
  - Se ejecuta node, y se manda HTML al browser
- Cuando haces ``pnpm run build``...
  - Se ejecuta node, y se genera el HTML en ``dist/``
</div>
<steps>
<step>

```js
---
# frontmatter.md
title: "Presentación"
author: "ManzDev"
date: "2026-06-30"
---

Hola a **todos**, ¿Cómo se encuentran? Echa un vistazo a mi nueva página de [Inteligencia Artificial local](https://ai.manz.dev/).
```
</step>
<step>

```js
---
// index.astro
console.log("Hola, yo soy NodeJS");
---

<h1>¡Hola, amigos!</h1>
<p>¿Qué tal están?</p>
<script>
  console.log("Yo soy JS del browser.");
</script>
```
</step>
</steps>
</split-slide>


---
## La filosofía de Astro
- 🟥 **Problema:** Las webs tienen cada vez más **Javascript cliente**
- 🟥 **Problema:** Los developers tienden a usar **Javascript innecesario** por comodidad
  - 🟩 ...cuando lo lógico sería utilizar **HTML** antes que **Javascript**

- 🚀 **Astro** sabe esto, así que plantea la filosofía **Zero JS**
- 🟩 Si quieres hacer algo con Javascript, lo haces en la parte de **Node** (fenced)
- 🟩 **Astro** ejecuta ese Javascript y lo «reduce a HTML»
- 🟩 **Astro** envía al navegador todo lo posible **reducido** a HTML, sin Javascript

- ⚠ **Nota:** Si usas un ``<script>`` **sí** estás enviando Javascript a cliente


---
## Ejemplo sencillo de página con Astro
- Así puedes usar Javascript, pero con los beneficios de tenerlo todo estático en HTML


```js
---
const title = "Mi página web";
const description = "Esta es la página principal de mi página web."
---

<html>
<head>
  <title>{title}</title>
  <meta name="description" content={description}>
</head>
<body>
  <h1>ManzDev Website</h1>
</body>
</html>
```


---

## Rutas (páginas)

- 📁 Las rutas en Astro viven en ``/src/pages/``
  - Se acceden a ellas por el nombre que pongas
  - ``/src/pages/index.astro`` es ``/`` o ``/index.html``
  - ``/src/pages/about.astro`` es ``/about/`` o ``/about/index.html``
  - ``/src/pages/about/index.astro`` es ``/about/`` o ``/about/index.html``

- 👀 Páginas especiales ``/src/pages/404.astro``
  - Cuando ocurre un **error 404** (página no encontrada)

- 🧩 Se aconseja separar partes pequeñas en **componentes**
- 🧱 Más adelante separaremos en **Layouts** (de momento, simplificaremos)

---

## Componentes de Astro
- 🟪 Idea principal: Separar lógica relacionada en ficheros individuales

<split-slide style="--font-size: .9rem;">

```js
---
const title = "Mi pequeño componente";
---

<style>
  /* Estilos CSS */
</style>

<div class="container">
  <!-- El HTML del componente -->
</div>
```
<div>

```js
---
/* Fichero: /src/pages/index.astro */
import Componente from "@/components/Componente.astro
---

<Componente></Componente>
<Componente />
```

- 🚀 En ``PascalCase`` para Astro
  - → ``<Componente></Componente>``
  - → Se pueden autocerrar: ``<Componente />``
- 🚀 En ``kebab-case`` para WebComponents
  - → ``<small-component></small-component>``
</div>

---

## Props
- ✈ Enviar datos a través de «atributos» en Astro
- Si tenemos muchos datos, se puede enviar desestructurando ``<Componente {...data} />`` (más cómodo)


<split-slide style="--left: 55%; --right: 50%; --font-size: 1rem;">

```js
---
import Componente from "@/components/Componente.astro";
const title = "Título de la página";
---

<!-- Enviamos los datos al componente -->
<Componente title={title} />
```
```js
---
const { title } = Astro.props;  // Recibe los datos de los props
---

Información recibida: {title}
```
</split-slide>


---
## Slots
- ✈ Si tenemos que enviar HTML a un componente, es más apropiado hacerlo por slots
- Los slots son «ranuras» que creamos en los componentes para enviar información extensa desde fuera
- ➡ También se pueden usar múltiples ``<slots>`` (slots nombrados)

<steps>
<step>
<split-slide style="--left: 50%; --right: 50%; --font-size: 1rem;">
<div>

```js
---
import Componente from "@/components/Componente.astro";
---
<Componente>
  <h1>Hola amigo mío</h1>
  <p>¿Cómo te encuentras?</p>
</Componente>

<Componente></Componente>  <!-- o <Componente /> -->
```
Componente 1: muestra el contenido interior. Componente 2: texto por defecto.

</div>

```js
---
---
<slot>Contenido por defecto</slot>
```

</split-slide>
</step>
<step>
<split-slide style="--left: 50%; --right: 50%; --font-size: 1rem;">

```js
---
import Componente from "@/components/Componente.astro";
---
<Componente />
  <h1 slot="name">ManzDev</h1>
  <p slot="text">Streamer de programación en español.</p>
</Componente>

<Componente></Componente>  <!-- o <Componente /> -->
```

```js
---
---
<slot name="name">Nombre desconocido</slot>
<slot name="text">El personaje no tiene descripción.</slot>
```
</split-slide>
</step>
</steps>

---
<!-- _class: cover -->
<style scoped>
section {
  --cover: url(../assets/img_00059_astro.png);
}
</style>
# CSS y Javascript en Astro


---
## CSS en Astro
- 1️⃣ Forma preferida: Coloca un ``<style></style>`` en cada componente
  - Es local (los estilos solo afectan al fichero donde están)
  - Astro se encarga de ponerlo en un fichero ``.css`` a parte
  - Nosotros lo tenemos organizado en el componente donde afecta

- 💠 Otras formas:
  - 2️⃣ ``<style is:global>`` o ``:global(...) { ... }`` si queremos estilos globales (a toda la app)
  - 3️⃣ ``import "./styles.css"`` → El estilo es global a toda la app (útil para reutilizar)
  - 4️⃣ ``import styles from "./Component.module.css"`` → si quieres usar [Javascript CSS Modules](https://lenguajecss.com/herramientas-css/css-in-js/css-modules/)
  - 5️⃣ Con ``<style is:inline>`` puedes decirle a Astro que inserte los estilos tal cual sin procesarlos

---
## Javascript en Astro
- 1️⃣ Forma preferida: Con ``<script>``
- Astro lo procesa y lo pone en un fichero ``.js`` a parte

- 💠 Otras formas:
  - 2️⃣ Con ``<script type="module">`` → Astro no lo procesa, se usa tal cuál
  - 3️⃣ Con ``<script is:inline>`` → Astro lo coloca en el HTML (sin procesarlos)

🛑 CUIDADO: No hay scope por componentes del DOM o Javascript → WebComponents
WebComponents en un componente Astro → [https://lenguajejs.com/astro/scripts/webcomponents/](https://lenguajejs.com/astro/scripts/webcomponents/)
Aquí la [diferencia entre imports en Astro](https://lenguajejs.com/astro/scripts/javascript/#soporte-de-import-en-astro)


---
## Pasar información de node a cliente
- Con ``class:list={list}`` puedes pasar arrays de strings de nodeJS a clases en HTML
- Con ``define:vars={list}`` puedes enviar datos de nodeJS a JS/CSS (sólo usar en último caso)

```js
---
const classList = ["container", "title"];
---

<div class:list={classList}>
  <h1>Título de página</h1>
  {classList}
</div>

<script define:vars={{ classList }}>
  console.log(classList);
</script>
```

---
## Utilizando plugins: SVG con supersvg

<split-slide style="--left: 50%; --right: 50%; --font-size: 1rem;">

```bash
📁 webgames
 ├─📃 astro.config.mjs
 ├─📁 src
 │  └─📁 pages
 │     └─ index.astro
 ├─📁 icons
 │  ├─📁 social
 │  │  ├─📃 twitter.svg
 │  │  ├─📃 youtube.svg
 │  │  └─📃 twitch.svg
 │  └─📁 logos
 │     ├─📃 manzdev.svg
 │     ├─📃 nvidia.svg
 │     └─📃 google.svg
 ├─📁 public
 │  └─ ...
 :
 ```
 <div>

- 🧊 ¿Necesitas utilizar iconos? ¡Vamos a usar SuperSVG!
- 🎷 Instalación → ``pnpm install -D vite-plugin-supersvg``
- 📁 En ``/src/icons/`` creamos carpetas con iconos ``.svg``
  - 📁 Por cada carpeta, fichero **multiSVG** con ese nombre
  - 📁 Se guardará en ``public/assets/icons/``
- 💼 Se usa con ``<svg><use href="/assets/icons/social.svg#youtube" /></svg>``

```js
import { defineConfig } from "astro/config";
import supersvgPlugin from "vite-plugin-supersvg";

export default defineConfig({
  vite: { plugins: [ supersvgPlugin() ] }
});
```
</div>
</split-slide>

---
## Utilizando paquetes de NPM para nodejs

<split-slide style="--left: 50%; --right: 50%; --font-size: 1rem;">

```js
---
import markdownIt from "markdown-it";

const text = `
# Tema 1

En este *fragmento de texto* vamos a hablar de un tema **muy importante**: la pizza.
`;
const md = markdownIt();
const result = md.render(text);

---

<div class="content" set:html={result}></div>
 ```
 <div>

- Paquete de node: ``markdown-it``
- Lo necesitamos sólo en local
  - Astro lo usa y renderiza el HTML estático
  - Ese HTML estático es el que se sube a la web
  - Por lo tanto, ``markdown-it`` es dependencia de desarrollo
- Se instala con ``pnpm install -D markdown-it``


- La librería ``markdown-it`` pasa markdown a HTML
- Una vez tenemos el resultado (``result``) renderizado...
  - Lo insertamos en el HTML con un ``set:html``
  - Es equivalente a un ``innerHTML``

</div>
</split-slide>

---
## Utilizando paquetes de NPM para cliente

<split-slide style="--left: 50%; --right: 50%; --font-size: 1rem;">
<steps>
<step>

```html
<style>
  .box {
    width: 200px;
    height: 200px;
    background: linear-gradient(indigo, deeppink);
    color: white;
    font-size: 2.25rem;
    display: grid;
    place-items: center;
    font-weight: 600;

    transform-style: preserve-3d;
    span { transform: translateZ(25px); }
  }
</style>
 ```
</step>
<step>

```html
<!-- El paquete en cliente se usa en <script> -->
<div class="box">
  <span>ManzDev</span>
</div>

<script>
  import Tilt from "vanilla-tilt";

  const box = document.querySelector(".box");
  Tilt.init(box, {
    glare: true,
    perspective: 500,
    max: 35,
    /* Más opciones */
  });
</script>
```
</step>
</steps>

<div>

- Primero, añadimos un CSS para un HTML sencillo
- Estilos CSS simples
- Preservamos 3D y desplazamos en **eje Z**
- Ejemplo ``vanilla-tilt``

- ➡ Añadimos el elemento en HTML
- En un ``<script>`` importamos ``vanilla-tilt``
  - 🟩 Debe usarse en un ``<script>`` (procesado por Astro)
  - 🟥 No lo uses en el **fenced code** (node)
  - 🟥 No funciona en ``<script type="module">``
  - 🟥 No funciona en ``<script is:inline>``
  - 🟥 No funciona en ``<script defer>``
  - 🟨 En estos 3 últimos se puede cargar desde CDN

</div>
</split-slide>

---
<!-- _class: cover -->
<style scoped>
section {
  --cover: url(../assets/img_00055_.png);
}
</style>
# App de videojuegos
## Contenidos
- Utilizar la API de Node
- Añadirle front con Astro
- Iterar el ejemplo
- Añadir rutas dinámicas


---
## App de videojuegos
- 1️⃣ Paso 1: Crear proyecto de Astro
  - 🚀 Lo arrancaremos con un ``pnpm run dev``
  - 📁 Temporalmente, en ``public/`` metemos imágenes de ``covers/`` y el ``.json``

- 2️⃣ Paso 2: La API (backend) lo tenemos a parte
  - 📁 Podemos crear una carpeta ``server`` (dentro del raíz de Astro)
  - 🟩 Ahí colocamos la API de Node (index.js, games.json y dependencias npm)
  - 🐈 Esto se podría hacer en otro repo (para simplificar trabajaremos en ``server/``)
  - 🚀 La arrancamos con un → ``node server/index.js`` → ``pnpm run server``

---
## App (sin mentalidad Astro)

<steps>
<step>
<split-slide style="--left: 60%; --right: 40%; --font-size: 1rem;">

```js
---
import SiteLogo from "@/components/SiteLogo.astro";
import SiteFooter from "@/components/SiteFooter.astro";
---

<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="/index.css">
</head>
<body>
  <SiteLogo />
  <div class="page">
    <main class="games"></main>
  </div>
  <SiteFooter />
</body>
</html>
```
<div>

- 1️⃣ Crear un ``src/pages/index.astro``
- 2️⃣ Creamos la estructura del HTML
- 3️⃣ Enlazamos un ``index.css`` (CSS global)
- 4️⃣ Creamos componentes ``<SiteLogo />`` y ``<SiteFooter />``.
- 5️⃣ Estructura de ``.page`` y ``main.games``.
</div>
</split-slide>
</step>
<step>
<split-slide style="--left: 50%; --right: 50%; --font-size: 1rem;">

```css
body {
  margin: 0;
  background: repeating-linear-gradient(135deg,
    #121212 0 20px,
    #080808 20px 40px
  );
  color: #fff;

  &::after {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    background: url("noise.png");
    mix-blend-mode: soft-light;
    opacity: 0.25;
  }
}
```
<div>

- 1️⃣ Creamos bandas con gradientes de fondo.
- 2️⃣ Con ``&::after`` y ``noise.png`` añadimos una textura de ruido
  - Posicionamos ``fixed`` y usamos ``inset: 0`` para extenderla
  - Mezclamos con ``mix-blend-mode`` y bajamos opacidad.
  - Con ``pointer-events`` ignoramos interacción en esa capa.
</div>
</split-slide>
</step>
<step>
<split-slide style="--left: 50%; --right: 50%; --font-size: 1rem;">

```js
 <!-- ... -->
  <SiteFooter />

  <script>
    const $main = document.querySelector("main.games");
    const games = await fetch("/games.json").then(res => res.json());
    games.forEach(game => {
      const { name, image } = game;
      const html = /* html */`<img class="poster"
        src="/covers/${image}"
        alt="${name}">`;
      $main?.insertAdjacentHTML("beforeend", html);
    });
  </script>
```
<div>

- 1️⃣ Hacemos ``fetch``
  - Recuperamos el ``games.json`` (íntegro)

- 2️⃣ Por cada ``game:``
  - Desestructuramos ``name`` e ``image``
  - Creamos una imagen desde ``image``
    - Imagen ``/covers/NOMBRE-JUEGO.avif``
  - La añadimos al ``$main``
</div>
</split-slide>
</step>
<step>
<split-slide style="--left: 50%; --right: 50%; --font-size: 1rem;">

```css
.page {
  max-width: 1280px;
  margin: auto;

  main.games {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
}
```
<div>

- 1️⃣ Creamos una estructura de página
  - Con un máximo y un centramos con ``margin: auto``
- 2️⃣ Creamos un flex multilinea (wrap)
</div>
</split-slide>
</step>
<step>
<split-slide style="--left: 50%; --right: 50%; --font-size: 1rem;">

```css
img.poster {
  width: 225px;
  height: 325px;
  object-fit: cover;
  border: 3px solid white;
  corner-shape: bevel;
  border-radius: 15px;
  transition: scale 0.15s ease;

  &:hover { scale: 1.25; z-index: 5 }
  &:active { border-color: gold }
}
```
<div>

- 1️⃣ Le damos forma a los títulos de los juegos
  - Con ``object-fit`` ajustamos a mismo tamaño los covers
  - Con ``corner-shape`` le damos forma a las esquinas
  - Con ``transition`` suavizamos la animación
- 2️⃣ Con ``&:hover`` y ``scale`` ampliamos el cover
  - Con ``z-index`` aseguramos que siempre esté por delante
</div>
</split-slide>
</step>
</steps>

---
## STOP ¿Problemas?
- 📒 Trabajamos en Javascript cliente (¿necesario?)
  - Los posters se pueden construir en local
  - ...y subirlos a la web ya construidos (no cambian)
  - Al ser estático, es más eficiente

- 📃 Descargamos toda la info (JSON) al navegador (la necesitemos o no)
  - Se podría descargar sólo la info necesaria (imagen y name)
  - ...reduciendo el tamaño del json a descargar

- 🟨 Hay partes que **DEBEN** ser Javascript cliente
  - Por ejemplo, el sonido no puedes hacerlo en Node
  - ...debe crearse con Javascript cliente

- 🟥 Hacer páginas individuales con JS (SPA, tedioso y anti-SEO-friendly)

---
## App (con mentalidad Astro)

<steps>
<step>
<split-slide style="--left: 50%; --right: 50%; --font-size: 1rem;">

```js
---
import GAMES from "@/data/games.json";
// ...
---

  <main class="games">
    {GAMES.map(game => (
      <img class="poster"
           src={"/covers/" + game.image}
           alt={game.name}
      />))}
  </main>
```
<div>

- 🟨 En lugar de hacerlo en Javascript cliente...
  - Vamos a crearlo en local con Astro
  - ...para que el navegador lo reciba ya construído

- 🟩 Movemos el ``games.json`` de ``public/`` a ``src/data``
  - El JSON no va a llegar al cliente, solo en local

- 🟩 Utilizamos un ``.map()`` para recorrer la estructura
  - ...se renderiza el HTML en local
  - ...se envía ya construído al navegador
</div>
</split-slide>
</step>
<step>
<split-slide style="--left: 50%; --right: 50%; --font-size: 1rem;">

```js
---
import GAMES from "@/data/games.json";
import GamePoster from "@/components/GamePoster.astro";
// ...
---

  <main class="games">
    {GAMES.map(game => (<GamePoster {...game} />))}
  </main>
```
<div>

- 🟩 Una buena práctica: dividir en componentes
- Creamos/importamos componente ``GamePoster.astro``

- 🟩 En el ``.map()`` en lugar de poner todo el HTML...
  - ...ponemos el componente (más simple y separamos)
  - ...pasamos los datos de cada item del ``.map()``
  - En lugar de pasarlas una por una, desestructuramos
</div>
</split-slide>
</step>
<step>
<split-slide style="--left: 50%; --right: 50%; --font-size: 1rem;">

```js
 ---
const { name, image } = Astro.props;
---
<img class="poster" src={"/covers/" + image} alt={name} />
<style>
img.poster {
  width: 225px;
  height: 325px;
  object-fit: cover;
  border: 3px solid white;
  corner-shape: bevel;
  border-radius: 15px;
  transition: scale 0.15s ease;

  &:hover { scale: 1.25; z-index: 5 }
  &:active { border-color: gold }
}
</style>
```
<div>

- 🟩 Tenemos un componente con todo lo relacionado
  - Más organizado y fácil de leer.
  - Fácil de mantener y modificar.

- 🎲 Desestructuramos los datos desde ``Astro.props``
  - Al usarlos, siempre dentro de ``{ ... }`` (expresión JS)
  - Sacamos del CSS global, ya que solo lo queremos para este

</div>
</split-slide>
</step>
<step>
<split-slide style="--left: 50%; --right: 50%; --font-size: 1rem;">

```html
<script>
  const $main = document.querySelector("main.games");
  const hover = new Audio("/sounds/hover.mp3");

  $main?.addEventListener("pointerover", (ev) => {
    const poster = ev.target.closest(".poster");
    if (!poster) return;
    if (poster.contains(ev.relatedTarget)) return;

    hover.currentTime = 0;
    hover.play();
  });
</script>
```
<div>

- Seleccionamos el elemento ``<main>``
- Usamos delegación de eventos
- Cargamos el sonido en ``hover``
- Cada vez que te muevas (pointerover) por ``<main>``
  - Descartamos cuando no haya un elemento padre ``.poster``
  - Descartamos cuando estes en el mismo elemento ``.poster``
- Reproducimos sonido
</div>
</split-slide>
</step>
<step>
<split-slide style="--left: 50%; --right: 50%; --font-size: 1rem;">

```js
---
const { name, image, slug } = Astro.props;
---
<a href={"/games/" + slug}>
  <img class="poster" src={"/covers/" + image} alt={name} />
</a>

<style>
  /* ... */
</style>

<script>
  /* ... */
</script>
```
<div>

- ✅ Ahora envolvemos la imagen con un enlace ``<a>``
  - Dirige a ``/games/`` + nombre del juego (slug)
  - Creamos carpeta ``src/pages/games/``
  - Creamos fichero ``index.astro`` en su interior
    - ❌ No nos sirve una ruta estática

- 🏆 Podemos añadir el ``<script>`` del sonido a este componente
  - Tiene relación con el poster → ✅ debería estar ahí
  - ✅ Añadido con ``<script>``, Astro lo procesa (sólo una vez)
  - ❌ ...con ``<script type="module">``, Astro no lo procesa
    - ❌ Lo añade tal cual, se repite varias veces
</div>
</split-slide>
</step>
</steps>

---
## Rutas dinámicas en Astro
- ✅ Hasta ahora hemos creado **rutas estáticas** → Accedes a una ruta directamente
- ❌ No vamos a crear todas las rutas de cada juego (¿y si tengo 300 juegos?)
- ✅ Lo que haremos es indicarle a Astro:
  - ...todos los juegos que hay
  - ...una plantilla dinámica
  - ✅ El revisará todos los juegos y la plantilla, y creará una página por cada uno

- Si intentamos hacer una ruta estática con los juegos, nos aparecerá...
  - ❌ ERROR: ``getStaticPaths()`` function required for dynamic routes.

---

## Las rutas dinámicas: ``getStaticPaths()``

<steps>
<step>
<split-slide style="--left: 50%; --right: 50%; --font-size: 1rem;">

```js
---
export function getStaticPaths() {
  return [
    { params: { slug: "beneath-steel-sky" }},
    { params: { slug: "gabriel-knight" }}
  ];
}

const { slug } = Astro.params;

---

{slug}
```
<div>

- 📁 Vamos a la carpeta ``src/pages/games/``
- 📄 Renombramos ``index.astro`` a ``[slug].astro``
  - Los corchetes indican que es página dinámica
  - El nombre del interior es la variable implicada
  - Para la URL ``/games/monkey-island``...
    - ``slug`` va a contener ``monkey-island``

- 🟩 Exportamos la función ``getStaticPaths()``
  - Devolvemos un ``Array`` donde tiene un objeto por página
  - ``/games/beneath-steel-sky`` → ✅
  - ``/games/gabriel-knight`` → ✅
  - ``/games/monkey-island`` → ❌
  - ``/games/broken-sword`` → ❌
</div>
</split-slide>
</step>
<step>
<split-slide style="--left: 50%; --right: 50%; --font-size: 1rem;">

```js
---
import GAMES from "@/data/games.json";

export function getStaticPaths() {
  return GAMES.map(game => ({ params: { slug: game.slug } }));
}

// Procesamiento por página
const { slug } = Astro.params;
const data = GAMES.find(game => game.slug === slug);
---

<pre>{JSON.stringify(data)}</pre>
```
<div>

- 📁 Importamos desde ``@/data/games.json``
- 🟩 En la función ``getStaticPaths()``
  - Recorremos ``GAMES`` y devolvemos el objeto...
  - ➡ ``{ params: { slug: "SLUG-DEL-JUEGO" } }``
- 🟪 En cada página, ``data``...
  - Guarda los datos del juego en cuestión

- Ahora podemos acceder a todos los juegos:
  - ``/games/beneath-steel-sky`` → ✅
  - ``/games/gabriel-knight`` → ✅
  - ``/games/monkey-island`` → ✅
  - ``/games/broken-sword`` → ✅
</div>
</split-slide>
</step>
</steps>


---
## Referencias

- [CheatSheet Javascript](https://lenguajejs.com/javascript/cheatsheets/)
- [bootcamp.manz.dev](https://bootcamp.manz.dev/)
- [Documentación oficial de Astro](https://docs.astro.build/)
- [Astro: Routing dinámico](https://docs.astro.build/en/guides/routing/#dynamic-routes)
- [Astro: getStaticPaths()](https://docs.astro.build/en/reference/routing-reference/#getstaticpaths)
- [MDN: JSON.stringify()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)








<script src="../assets/steps.js"></script>
<script src="../assets/image-modal.js"></script>
