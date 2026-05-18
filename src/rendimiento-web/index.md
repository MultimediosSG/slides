---
marp: true
theme: alo
paginate: true
---

<!-- _class: cover -->
<style scoped>
section {
  --cover: url(../assets/img_00035_.png);
}
</style>
#  Rendimiento Web
## Contenidos
- Dev Tools
- Optimización de código
- Minificación de recursos
- Testing


> Inspirado en el bootcamp de <br><strong>Manz.dev</strong> todos los créditos a el.

---

## ¿Qué es la optimización?
- Un sistema **debe** funcionar. Es el primer paso.
- Hay varios **niveles** a los que puede funcionar: 🟥 mal, 🟧 regular, 🟨 normal, 🟩 muy bien, 🟩🟩 excelente...
- Normalmente esto no preocupa... hasta que **falla** y se vuelve un problema **grave**.
- No siempre hay que aplicarlo. Pero anticiparse suele ser una buena forma de prevenir problemas graves.

### Optimización
- **Memoria**: Cuanta menos RAM se use, mejor. Evitar páginas lentas o «congelamiento».
- **Tiempo**: Reducir el tiempo que tarda en realizar tareas. Evitar páginas lentas.
- **Transferencia**: Reducir el tiempo que tarda en descargar recursos. Evitar páginas lentas.
- **Paquetes**: Reducir la cantidad de dependencias que usamos. Más código que procesar, más lentitud.
- **Medición**: Sin datos, no sabes que optimizar, donde está fallando o si lo que cambias está funcionando.

**Resumen**: Evitar páginas lentas.

---

## Chrome Dev Tools

- Una etiqueta HTML propia, de la forma más sencilla

<split-slide style="--left: 60%; --right: 40%;">
<div>

![w:700 contain](../assets/devtools.png)
</div>
<div>

### Puntos clave
- Inspección del DOM en tiempo real
- **Icono flecha**: Seleccionar un elemento
- **Icono devices**: Modo responsive
- **Elements**: Ver o editar el HTML
- **Styles**: Ver o editar el CSS
  - Forzar ``:hover``, ``:focus``, ``:active``
  - Widgets interactivos
  - **Computed**: CSS computado
- **Console**: Abrir consola de Javascript
</div>
</split-slide>

---
## Network Dev Tools

<split-slide style="--left: 60%; --right: 40%;">
<div>

![w:700 contain](../assets/devtools-network.png)
</div>
<div>

- Nombre de ficheros
- Método (GET, POST, HEAD...)
- Estado HTTP → [HTTP.Cat](https://http.cat/)
- Protocolo → ``HTTP1.1`` < ``h2`` < ``h3``
- Tipo y donde se inicia la petición
- Tamaño del fichero / cacheado
- Tiempo de descarga + Prioridad
- Abajo: Peticiones, tamaño y tiempos
- ``Disable cache`` / ``Throttling``
</div>
</split-slide>

---
<!-- _class: cover -->
<style scoped>
section {
  --cover: url(../assets/img_00036_.png);
}
</style>
# Uso de memoria
- Garbage Collector
- Memory leaks
- Listeners huérfanos
- Windowing

---

## Garbage Collector
- Es un proceso automático del lenguaje que **libera memoria**

<split-slide style="--left: 60%; --right: 40%;">

<steps>
<step>

```js
const data = [/* Array con muchos datos */];

function method() {
  /* ... */
}

// ANTES: Memoria ocupada -→ 🟩🟩🟥🟥
method(); // Memoria ocupada 🟩🟩🟥🟥
// LUEGO: Memoria ocupada -→ 🟩🟩🟥🟥

// data es global, ocupa durante todo el programa
```
</step>
<step>

```js
function method() {
  const data = [/* Array con muchos datos */];
  /* ... */
}

// ANTES: Memoria libre ---→ 🟩🟩🟩🟩
method(); // Memoria ocupada 🟩🟩🟥🟥
/* Si no quedan referencias a data */
// LUEGO: Memoria libre ---→ 🟩🟩🟩🟩

// data es local, ocupa sólo durante función
```
</step>
</steps>
<div>

- El GC decide **cuando** liberar memoria (no lo decides tú)
- El GC elimina cuando no son **alcanzables** (sin referencias)
### Recuerda:

- ``const a = b`` → Esto es una referencia, no una copia

- El objeto nace
- Si el objeto no tiene **ninguna** referencia a él...
- El motor lo marca como **inalcanzables** (0 ref)
- El **Garbage Collector** los recolecta para borrarlos
</div>
</split-slide>

---

## Memory leaks
- Si existen referencias a un objeto que **ya no necesitas**, GC **no puede liberar su memoria**
- Esa memoria no podrá reutilizarse hasta cerrar la aplicación o web (que se liberan sus recursos)

<steps>
<step>
<split-slide style="--font-size: 1rem;">

```js
// main.js
import { moduleVar } from "./module.js";

const global = []; // ❌ Global: siempre viva

function method() {
  const local = [];   // ✅ Local: Se limpia al terminar fx
}

// module.js
const moduleVar = []; // ❌ Global: Siempre viva
window.noRemove = []; // ❌ Global: Siempre viva
globalThis.same = []; // ❌ Global: Siempre viva
```
<div>

### 1️⃣ Variables globales / de módulo → 💧 leak
- ❌ Evita variables globales muy grandes
- ❌ Evita meter vars en ``window`` o ``globalThis``
- ⚠️ Variables de módulos ESM → son singletons
  - Se cargan una vez y viven toda la sesión

- 🗑 Cualquier objeto asignado así **nunca será recolectado**
</div>
</split-slide>
</step>
<step>
<split-slide style="--font-size: 1rem;">

```js
const cache = new Map();
cache.set(id, value); // LEAK: Nunca se elimina ❌

// LRU: Max. 500 (más antiguo sale) ✅
const cache = new QuickLRU({ maxSize: 500 });
cache.set(id, value);

// TTL: Expira por tiempo de vida ✅
const cache = new Map();
cache.set(id, { value, expires: Date.now() + 60_000 });
// Añadir lógica para comprobar TTL y borrar

// WeakMap: Autoborrado si "domNode" muere ✅
const cache = new WeakMap();
cache.set(domNode, value);
```
<div>

### 2️⃣ Caché sin límite → 💧 leak
- Un Map o Array que no se limita → leak (silencioso)
- No da error, simplemente consume más y más
- ✅ Un caché debería tener límite
### Soluciones:

- **LRU** → Least Recently Used → [lru-cache](https://isaacs.github.io/node-lru-cache/) o [quick-lru](https://github.com/sindresorhus/quick-lru)
- **TTL** → Revisa si supera tiempo de vida [ttlcache](https://github.com/isaacs/ttlcache) o [tiny-lru](https://github.com/avoidwork/tiny-lru)
- [WeakMap](https://lenguajejs.com/javascript/set-map/que-es-map-weakmap/#qu%C3%A9-son-los-weakmap) → Si key es objeto (DOM, clase...), la entrada desaparece cuando es recolectado
</div>
</split-slide>
</step>
<step>
<split-slide style="--font-size: 1rem;">

```js
// ❌ Leak clásico
let btn = document.querySelector(".button");  // global
btn.remove();
// Se elimina el .button del DOM (HTML)
// "btn" sigue referenciado por la variable global
// ❌ El GC no puede recolectarlo

// ✅ Correcto
{
  let btn = document.querySelector(".button");  // local
  btn.remove();
}
btn = null  // Si es global, fuerza a eliminar la referencia
// ✅ Ahora el GC puede recolectarlo
```
<div>

### 3️⃣ Detached node → 💧 leak
- Detached: Nodos eliminados **pero aún referenciados**
- ⚠️ Sigue referenciado → **GC** no puede recolectarlo
- ❌ Puede retener nodos hijos, listeners...

### Cómo buscarlos:
- Dev Tools / Memory / Buscar "Detached"
- Variables globales o de módulo
- Stores globales (montar componentes sin desmontarlos)
- Nodos globales en array "para procesar luego"
</div>
</split-slide>
</step>
</steps>

---
## Listeners huérfanos
- Un ``listener`` huérfano → Continua escuchando eventos desde un elemento que se ha eliminado del DOM
Como no se eliminó el evento, sigue escuchando y el **GC** no puede recolectarlo


<split-slide style="--left: 55%; --right: 50%; --font-size: 1rem;">
<steps>
<step>

```js
const mountModal() {
  const btn = document.querySelector(".close");
  /* ... */

  document.addEventListener("keydown", ev => {
    if (e.key === "Escape") closeModal();
  });
}

```
</step>
<step>

```js
function mountModal() {
  /* ... */

  const controller = new AbortController();
  const { signal } = controller;

  document.addEventListener("keydown", () => { ... }, { signal })
  document.addEventListener("click", () => { ... }, { signal })
  globalThis.addEventListener("resize", () => { ... }, { signal })

  return () => controller.abort() // elimina los tres de golpe
}
```
</step>
<step>

```js
// ❌ Se añade un listener por botón
const buttons = document.querySelectorAll(".button");
buttons.forEach(btn =>
  btn.addEventListener("click", () => { ... })
);

// ✅ Un listener padre para gobernarlos a todos 💍
const parent = document.querySelector(".parent");
parent.addEventListener("click", ev => {
  const btn = ev.target.closest(".button");
  if (btn) () => { ... }
});
```
</step>
</steps>
<div>

- 👁‍🗨 Cada vez que se monta, se añade listener nuevo
- 🔥 Si se monta/desmonta 10 veces → 10 listeners

### Soluciones:

- 1️⃣ ¿Puedes resolverlo sin Javascript? → ``<dialog>``
- 2️⃣ Añade un ``removeEventListener``
- 3️⃣ Usa ``AbortController`` para cancelar todos
- 4️⃣ Usa delegación de eventos en el padre
</div>
</split-slide>


---
## Windowing: Listas virtuales
- 📋 Tenemos una web con una tabla con MUCHOS datos/elementos (nodos) → [Windowing](../assets/virtual-scroll.png)


<split-slide style="--left: 50%; --right: 50%; --font-size: 1rem;">
<div>

### El problema
- 🧠 Aparentemente simple, pero problema complejo.
- Renderizar y mantener MUCHOS nodos vivos es costoso
- Cada elemento requiere tareas de renderización
- AL FINAL: El usuario sólo ve ~10-15 nodos
- ¿Cuando optimizar?
  - ☁️ ``< 100 nodos`` → ✅ No hace falta optimizar
  - ⚖️ ``100-500 nodos`` → ❌ Si son complejos, optimizar
  - 🧱 ``> 500 nodos`` → ❌ Optimizar siempre

</div>
<div>

### Soluciones
- Sólo renderizar los nodos en pantalla
- Añadir unos nodos «offset» (para evitar FOUC/saltos)
- JS: ``IntersectionObserver``
  - ❌ Rompe posición scroll, sólo es lazy rendering
- CSS: ``content-visibility``
  - ❌ Ahorra rendering, pero los nodos siguen en memoria
- Librerías:
  - [TanStack Virtual](https://tanstack.com/virtual/latest)
  - [virtua](https://github.com/inokawa/virtua)
  - [vlist](https://vlist.io/examples/)
</div>

</split-slide>

---
<!-- _class: cover -->
<style scoped>
section {
  --cover: url(../assets/img_00036_.png);
}
</style>
# Uso de ancho de banda (Transferencia)
- Resource Hints
- Lazy loading
- Tree shaking
- Sistemas de caché

---
## Resource Hints
- Etiquetas ``<link>`` que indican recursos que vas a necesitar
- Con ellas preparas al navegador antes de se soliciten y tengas que esperar a que se descarguen.

<steps>
<step>
<split-slide style="--font-size: 1rem;">

```html
<!-- Mejora conexión a otros dominios -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://api.dominio.com">
<!-- Úsalo para APIs, CDNs de fuentes, analytics -->
<!-- Máx: 4-6 (cada conexión consume recursos) -->

<!-- Precargar script que va a ser usado (baja prioridad) -->
<link rel="prefetch" href="/chunks/dashboard.js" as="script">
```
<div>

### 1️⃣ preconnect
- Realiza **Búsqueda DNS** + **Negocicación TCP/TLS**
  - **Cuando**: Antes de que se solicite el primer recurso
- 💡 Ahorras ``100–500ms`` en la primera petición a ese origen
### 2️⃣ prefetch
- Descarga un recurso con baja prioridad
  - **Cuando**: Descarga en **idle** + lo guarda en caché
- 💡 Úsalo si lo necesitas en la sig. navegación (no en la actual)
</div>
</split-slide>
</step>
<step>
<split-slide style="--font-size: 1rem;">

```html
<!-- Fuente crítica (dales siempre prioridad) -->
<link rel="preload" href="/fonts/outfit.woff2" as="font"
      type="font/woff2" crossorigin>

<!-- Imagen principal (en primer impacto visual) -->
<link rel="preload" href="/hero.webp" as="image">

<!-- Algo que sabes que se necesitará inmediatamente -->
<link rel="preload" href="/critical.js" as="script">

<!-- ⚠ Si precargas algo y no lo usas en 3s, warning -->
```
<div>

### 3️⃣ preload
- Descarga un recurso lo antes posible (precarga)
- **Cuando**: Descarga inmediatamente, ejecuta cuando lo necesite
- 💡 Sólo si lo necesitas inmediatamente
</div>
</split-slide>
</step>
<step>
<split-slide style="--font-size: 1rem;">

```html
<!-- Precarga el módulo y sus dependencias -->
<link rel="modulepreload" href="/js/app.js">
<link rel="modulepreload" href="/modules/vendor-react.js">
<link rel="modulepreload" href="/modules/router.js">
```
<div>

### 4️⃣ modulepreload
- Como ``preload`` pero para módulos (ESM).
- Descarga, parsea y procesa el módulo
- Crea grafo de dependencias (evita "efecto cascada")
- 💡 Efecto cascada → Cada ``import`` "descubre" el siguiente
</div>
</split-slide>
</step>
</steps>

---
## Lazy loading
- Técnica que no carga un recurso **hasta que se necesita**
- ...pero "necesita" puede tener significados distintos según el caso

<steps>
<step>
<split-slide style="--font-size: 1rem;">

```html
<!-- Carga la imagen al procesar este HTML -->
<img loading="eager" src="foto.jpg" alt="...">

<!-- Precarga. Dentro del <head> -->
<link rel="preload" href="/img/foto.jpg" as="image">
<link rel="preconnect" href="https://cdn.manz.dev/">
<link rel="dns-prefetch" href="https://cdn.manz.dev/">

<!-- Bloquea render. Dentro del <head> -->
<link rel="expect" href="#nombre" blocking="render">
```
<div>

### 1️⃣ Eager (Acceso crítico)
- El atributo ``loading="eager"`` indica que realice la petición
- Es el valor por defecto

- El ``preload`` da [prioridad absoluta](https://lenguajehtml.com/html/recursos-externos/etiquetas-precarga-html/#por-recurso) → 💡 [Tipos](https://lenguajehtml.com/html/recursos-externos/etiquetas-precarga-html/#tipos-de-recursos) fonts
- El ``dns-prefetch`` [precarga dominios](https://lenguajehtml.com/html/recursos-externos/etiquetas-precarga-html/#por-dominio) → solo dns
- El ``preconnect`` → dns + tcp + tls (lo vimos antes)

⚠ El ``expect`` bloquea render hasta que un ``id`` se haya cargado
</div>
</split-slide>
</step>
<step>
<split-slide style="--font-size: 1rem;">

```html
<!-- Imágenes: Buen soporte -->
<img loading="lazy" src="foto.jpg" alt="...">

<!-- Iframe: Buen soporte -->
<iframe loading="lazy" src="https://manz.dev/"></iframe>

<!-- Video/Audio: Soporte reducido aún -->
<video loading="lazy" src="video.mp4"></video>
<audio loading="lazy" src="audio.mp3"></audio>
```
<div>

### 2️⃣ Lazy por viewport
- El atributo ``loading="lazy"`` pospone carga fuera del viewport
- El atributo ``width`` y ``height`` son obligatorios con lazy loading
  - Sin tamaño, navegador no sabe calcular y produce **CLS**
- No uses ``loading="lazy"`` en elementos por encima del «FOLD»
</div>
</split-slide>
</step>
<step>
<split-slide style="--font-size: 1rem;">
<div>

```html
<!-- Prefetch. Dentro del <head> -->
<link rel="prefetch" href="/img/foto.jpg" as="image">
```
```js
// Carga cuando el hilo está libre
requestIdleCallback(() => import(`/pages/dashboard.js`));
```
</div>
<div>

### 3️⃣ Lazy por idle
- El ``prefetch`` carga recurso cuando está en idle (lo vimos antes)
  - Indica en ``as`` el [tipo de recurso](https://lenguajehtml.com/html/recursos-externos/etiquetas-precarga-html/#tipos-de-recursos) del que se trata

- El ``requestIdleCallback()`` se llama cuando tiene tiempo libre
- En la función de callback se pueden realizar acciones como:
  - Añadir ``<link>`` al ``document.head``
  - Importar ficheros o recursos con ``import()``
</div>
</split-slide>
</step>
<step>
<split-slide style="--font-size: 1rem;">
<div>

```js
// Añade el <link rel="modulepreload"> cuando "hover"
button.addEventListener("mouseenter", () => {
  const link = document.createElement("link");
  link.rel = "modulepreload";
  link.href = `/pages/dashboard.js`;
  document.head.append(link);
}, { once: true });

// Se hace "click", importa recurso y ejecuta render()
button.addEventListener("click", async (ev) => {
  ev.preventDefault();
  const { render } = await import("/pages/dashboard.js");
  render();
});
```
</div>
<div>

### 4️⃣ Lazy por interacción
- Al hacer ``hover``, se añade el **resource hint**
  - El ``modulepreload`` → Descarga + parsea módulo ``.js``
  - Procesa las dependencias (``import``)
  - Lo deja listo para ejecutar

- Cuando se hace ``click``...
  - Se invalida la acción por defecto
  - Se importa el ``render`` ya descargado y parseado
  - Se ejecuta ``render()```
</div>
</split-slide>
</step>
</steps>

---
## Tree shaking
- El **bundler** (vite, webpack...) es capaz de eliminar código que se importa pero nunca se usa.
``El nombre viene de "sacudir el árbol" para que caigan las hojas muertas``

<steps>
<step>
<split-slide style="--font-size: 1rem;">

```js
// ✅ Usar ESM (necesario para saber que se usa)
import { format } from "date-fns";
import * as utils from "./utils.js";

// Si importas todo, no uses keys
utils.format();    // ✅ Hace tree-shaking
utils["format"](); // ❌ No tree-shakeable

// ❌ No usar CommonJS (no puede analizar)
const { format } = require("date-fns");
```
<div>

### 1️⃣ Tree Shaking
- ✅ Requisito fundamental: ESM puro → ``import`` / ``export``
- ✅ Preferir ``import`` nombrados selectivos con ``{`` y ``}``
- ❌ No usar keys si importas todo el módulo
- ❌ No sirve con CommonJS → ``require()`` / ``module.exports``
</div>
</split-slide>
</step>
<step>
<split-slide style="--font-size: 1rem;">

```js
// ❌ index.js re-exporta todo
export * from "./Button";      // Puede ser un archivo
export * from "./components";  // Es una carpeta
export * from "./Table";       // Pesa 50KB
// Bundler ve `export *` → incluye todo "por si acaso"

// ✅ Importa directamente del archivo fuente
import { Button } from "./components";        // ❌ No
import { Button } from "./components/Button"; // ✅ Sí

// ✅ O usa re-exports nombrados (sin comodines)
export * from "./Modal";            // ❌ No
export { Modal } from "./Modal";    // ✅ Sí
```
<div>

### 2️⃣ Evitar barrels
- Barrel: Entrypoint único que re-exporta todo desde otro lugar
- ❌ Evita re-exportaciones (o hazlas con cuidado)
- ❌ Un problema grave → re-exportar carpetas (común en TS)
- ✅ Si no usas bundler, no hay problema de tamaño del bundle
- ✅ Si usas barrels → directos y sin wildcards

Más información sobre los [Barrels](https://lenguajejs.com/javascript/modulos/barrel-imports/)
</div>
</split-slide>
</step>
</steps>

---
## Referencias

- [CheatSheet Javascript](https://lenguajejs.com/javascript/cheatsheets/)
- [bootcamp.manz.dev](https://bootcamp.manz.dev/)






<script src="../assets/steps.js"></script>
<script src="../assets/image-modal.js"></script>
