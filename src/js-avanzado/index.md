---
marp: true
theme: alo
paginate: true
---

<!-- _class: cover -->
<style scoped>
section {
  --cover: url(../assets/img_00021_.png);
}
</style>
# Javascript Avanzado
## Contenidos
- Transpilación (Vite)
- Lógica de Javascript
- Código limpio
- Patrones


> Inspirado en el bootcamp de <br><strong>Manz.dev</strong> todos los créditos a el.

---

## ¿Qué es la transpilación?

<split-slide>
<steps>
<step>

```bash
📁 project-name
 └── 📁 src
      ├── 🟧 index.html
      ├── 📁 css
      │    └── 🟪 global.css
      ├── 📁 modules
      │    ├── 🟨 getData.js      # Obtener datos
      │    └── 🟨 renderCard.js   # Pintar en web
      └── 🟨 index.js
```
</step>
<step>

```bash
📁 project-name
 ├── 📁 src
 │    ├── 🟧 index.html
 │    ├── 📁 css
 │    │    └── 🟪 global.css
 │    ├── 📁 modules
 │    │    ├── 🟨 getData.js      # Obtener datos
 │    │    └── 🟨 renderCard.js   # Pintar en web
 │    └── 🟨 index.js
 └── 📁 dist
      ├── 🟧 index.html
      ├── 🟪 index.css
      └── 🟨 index.js
```
</step>
<step>

```bash
📁 project-name
 ├── 📁 src
 │    ├── 🟧 index.html
 │    ├── 📁 css
 │    │    └── 🟪 global.css
 │    ├── 📁 modules
 │    │    ├── 🟨 getData.js      # Obtener datos
 │    │    └── 🟨 renderCard.js   # Pintar en web
 │    └── 🟨 index.js
 └── 📁 dist
      ├── 🟧 index.html
      ├── 🟪 index-34f7822e.css   # hash en CSS
      └── 🟨 index-1d901f84.js    # hash en JS
```
</step>
</steps>

<div>

- Hasta ahora, trabajamos directamente con nuestro código.
- Sin embargo, en el desarrollo web es muy habitual trabajar con transpiladores.
- Los transpiladores son herramientas que leen un lenguaje o formato, y lo convierten a otro lenguaje.
- Ejemplos de transpiladores (o herramientas que transpilan):

<div class="row">

 ![alt text](../assets/transpiladores.png)
</div>

- ➡ Normalmente el origen está en ``src/`` y el destino en ``dist/``.
- ➡ A veces añade un hash (por motivos de evitar caché).

</div>
</split-slide>


---

## Instalación de Vite

- Documentación de Vite → [Vite](https://vitejs.dev/)
- Creamos estructura de carpetas y un fichero ``vite.config.js``

<split-slide style="--left: 30%; --right: 70%;">

```bash
mkdir project-name
cd project-name
pnpm init --init-type module
pnpm add -D vite
touch vite.config.js
code .

pnpm add -D gh-pages
```
```js
import { defineConfig } from 'vite';

export default defineConfig({
  root: "/",                   /* index.html fuera de src/ */
  publicDir: "public",
  plugins: [],
  server: { port: 1234 },
  build: {
    outDir: "dist",
  }
});
```
</split-slide>

---
## Seguridad

- Evitar problemas de seguridad de tipo Supply chain (ataque a la cadena de suministro)
- Tu web es vulnerable al hacer un ``npm install`` porque una de tus dependencias fue comprometida
- Ejemplo de problema de seguridad: [paquete axios comprometido](https://www.stepsecurity.io/blog/axios-compromised-on-npm-malicious-versions-drop-remote-access-trojan) v1.14.1 (31-03-2026)

<split-slide>

```bash
minimumReleaseAge: 1440
minimumReleaseAgeExclude:
- vite
- lightningcss
```
<div>

## Seguridad
- Crea un fichero ``pnpm-workspace.yaml`` (necesita pnpm 10.16.0+)
- Añade el campo ``minimumReleaseAge`` con el tiempo ``1440`` (24h)
- Pnpm no instalará ninguna dependencia que haya sido publicada en menos de 24h
- Con ``minimumReleaseAgeExclude`` no influye a ciertas dependencias
</div>
</split-slide>

---
## Scripts de generación

- Creamos 3 scripts: desarrollo, generación de build y despliegue

<split-slide>

```bash
# Entorno de desarrollo
pnpm run dev

# Creamos producción en dist/
pnpm run build

# Revisamos la web de producción
pnpm run preview

# Desplegamos producción
pnpm run deploy
```
```json
{
  /* ... */
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "gh-pages -d dist"
  },
  /* ... */
}
```
</split-slide>

---
## Preparación para despliegue en GitHub Pages (varia en otros providers)

<split-slide style="--font-size: 1rem;">
<steps>
<step>

```js
import { defineConfig } from 'vite';

export default defineConfig({
  root: "src",
  base: "/repo-name/",
  publicDir: "../public",
  plugins: [],
  server: { port: 1234 },
  build: {
    outDir: "../dist",
  }
});
```
</step>
<step>

```js
import path from "node:path";
import { defineConfig } from 'vite';

const prod = process.env.NODE_ENV === "production";

export default defineConfig({
  root: "src",
  base: prod ? `/${path.basename(process.cwd())}/` : "/",
  mode: prod ? "production" : "development",
  publicDir: "../public",
  plugins: [],
  server: { port: 1234 },
  build: {
    outDir: "../dist",
  }
});
```
</step>
</steps>
<div>

- GitHub Pages requiere despliegue en ruta específica.
- La URL es ``https://user.github.io/repo-name/``
- Por lo tanto, la base es ``/repo-name/``
## ➡ Automatización:
- Esta configuración automatiza para que use ``/`` en local, y por otro lado ``/repo-name/`` en producción
- La variable ``prod``detecta si estás ejecutando ``vite`` en modo ``build`` (producción)
- En ese caso, hace el build usando el nombre de la carpeta como nombre de repo (mode)
</div>
</split-slide>

---
## ¡Ahora puedes usar ciertas tecnologías!
- Esto NO es posible en navegadores. Pero SI al transpilarlo Vite a ``dist/``

<split-slide>

```bash
📁 project-name
 ├── 📁 src
 │    ├── 🟧 index.html
 │    ├── 🟪 index.scss ⬅
 │    └── 🟦 index.ts ⬅
 └── 📁 dist
      ├── 🟧 index.html
      ├── 🟪 index-34f7822e.css
      └── 🟨 index-1d901f84.js
```
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <link rel="stylesheet" href="./index.scss">
  <script src="./index.ts"></script>
</head>
<body>
  <!-- ... -->
</body>
</html>
```
</split-slide>

---
## Reemplazar PostCSS por LightningCSS
- Documentación: [LightningCSS](https://lightningcss.dev/)
- Instalar LightningCSS → ``pnpm i -D lightningcss``
- Ejemplo: Drafts: [Custom Media Queries](https://lightningcss.dev/transpilation.html#custom-media-queries)

<split-slide>

```js
import { defineConfig } from 'vite';

export default defineConfig({
  /* ... */
  css: {
    transformer: "lightningcss", /* "postcss" */
    // lightningcss: {
    //   drafts: {
    //     customMedia: true
    //   }
    // }
  }
});
```
```css
@custom-media --modern (width <= 900px);

body {
  background: #111;
  color: #eee;

  @media (--modern) {
    background: indigo;
  }
}
```
</split-slide>

---
## Importaciones en Vite
- NO SON estándar: Sin Vite no te funcionarán (🟥 dependencia de Vite ⚡)

```js
import image from "../assets/image.png";        // URL producción: "/assets/image.2d8efhg.png"
import image from "../assets/image.png?inline"; // Obtiene como Base64 (inline)
import image from "../assets/image.svg?raw";    // Obtiene como texto (contenido)
import data from "./assets/file.json";          // Obtiene JSON y parsea directamente a objeto
import styles from "./assets/file.css";         // Obtiene CSS y parsea directamente a texto
```
- Consejo: Prefiere siempre que puedas la vía estándar (funcionará en proyectos sin Vite) → [Rolldown no soporta CSS modules aún](https://rolldown.rs/guide/notable-features#css-bundling)
```js
import data from "./assets/file.json" with { type: "json" }; // Actualmente compatible con Vite
import styles from "./assets/file.css" with { type: "css" }; // ❌ Actualmente, no compatible con Vite
```

---
## Plugins de Vite
- Vite se puede extender a base de plugins
- Busca en npmx por [vite-plugin-](https://npmx.dev/search?q=vite-plugin-)
- Ejemplo de plugin → [vite-plugin-standard-css-modules](https://npmx.dev/package/vite-plugin-standard-css-modules)
- Instalación → ``pnpm i -D vite-plugin-standard-css-modules``

```js
import { standardCssModules } from 'vite-plugin-standard-css-modules';
import { defineConfig } from 'vite';

export default defineConfig({
  /* ... */
  plugins: [
    standardCssModules()
  ]
});
```


---
<!-- _class: cover -->
<style scoped>
section {
  --cover: url(../assets/img_00022_.png);
}
</style>

# Lógica Javascript
- Array functions (continuación)
- Introducción a la complejidad
- Iteradores
- Iterator functions

---
<style scoped>
table{
  --width: 15%;
}
</style>
## Repaso: Array functions: ``.forEach()``

<table>
<thead>
<tr>
<th>'Gato'</th>
<th>'Pato'</th>
<th>'Oso'</th>
<th>'Topito'</th>
</tr>
</thead>
</table>

<split-slide>

```js
// No devuelve nada nunca (undefined)
animals.forEach((animal, index) => {
  console.log(`Elemento #${index}: ${animal}`);
});
```
<div>
El resultado sería el siguiente:


- Elemento #0: Gato
- Elemento #1: Pato
- Elemento #2: Oso
- Elemento #3: Topito
</div>
</split-slide>

---
<style scoped>
table{
  --width: 15%;
}
</style>
## Array functions: ``.forEach()`` vs ``.map()``



<split-slide>
<div>
<table>
<thead>
<tr>
<th>'Gato'</th>
<th>'Pato'</th>
<th>'Oso'</th>
<th>'Topito'</th>
</tr>
</thead>
</table>

```js
// No devuelve nada nunca (undefined)
animals.forEach((el, index) => {
  console.log(`Elemento #${index}: ${el}`);
});
```
</div>
<div>
<table>
<thead>
<tr>
<th>4</th>
<th>4</th>
<th>3</th>
<th>6</th>
</tr>
</thead>
</table>

```js
// Transforma el array original en uno derivado
const sizes = animals.map((el, index, array) => {
  return el.length;
});

// Versión abreviada
const sizes = animals.map((el) => el.length);
```
</div>
</split-slide>

---
<style scoped>
table{
  --width: 15%;
}
</style>
## Array functions: ``.every()`` vs ``.some()``



<split-slide>
<div>
<table>
<thead>
<tr>
<th>'Gato'</th>
<th>'Pato'</th>
<th>'Oso'</th>
<th>'Topito'</th>
</tr>
</thead>
</table>

```js
const all = animals.every((el) => {
  if (el.includes("a")) return true;
  else return false;
});

// Lo anterior es redundante:
animals.every(el => el.includes("a")); // F
animals.every(el => el.endsWith("o")); // T
```
</div>
<div>
<table>
<thead>
<tr>
<th>'Gato'</th>
<th>'Pato'</th>
<th>'Oso'</th>
<th>'Topito'</th>
</tr>
</thead>
</table>

```js
const all = animals.some((el) => {
  if (el.includes("a")) return true;
  else return false;
});

// Lo anterior es redundante:
animals.some(el => el.includes("a")); // T
animals.some(el => el.endsWith("o")); // T
```
</div>
</split-slide>

---

## Array functions: ``.find()`` vs ``.findIndex()`` vs ``.filter()``



<split-slide style="--left: 50%; --right: 50%; --font-size: 1rem;">
<div>

```js
const users = [
  { name: "Alons", life: 39 },
  { name: "felixicaza", life: 75 },
  { name: "krepssi", life: 99 },
  { name: "DHardySD", life: -5 },
];

users.find(el => el.life < 50);
// { name: "Alons", life: 39 }

users.findIndex(el => el.life < 50);
// 0
```
</div>
<div>

```js
const filteredUsers = users.filter(el => el.life > 50);
// [
//  { name: "felixicaza", life: 75 }
//  { name: "krepssi", life: 99 }
// ]

users.filter(el => el.life > 500);    // []
users.find(el => el.life > 500);      // undefined
users.findIndex(el => el.life > 500); // -1

users.findLast();      // Idem pero buscando desde el final
users.findLastIndex(); // Idem pero buscando desde el final
```
</div>
</split-slide>

---

## Array functions: ``.flat()`` vs ``.flatMap()``

<split-slide>
<div>

```js
const animals = [
  ["Gato", "Tigre"],
  ["Pato", [ "Ganso", "Gansa" ] ],
  "Oso"
];

animals.flat(1);
// ['Gato', 'Tigre', 'Pato', Array(2), 'Oso']

animals.flat(2);
animals.flat(Infinity);
// ['Gato', 'Tigre', 'Pato', 'Ganso', 'Gansa', 'Oso']
```
</div>
<div>

```js
animals.flatMap(el => /* ... */);

// Equivalente a:
animals.map(el => /* ... */).flat(1);

// ...pero más eficiente:

// → flatMap (1 bucle)
// → map + flat (2 bucles)
```
</div>
</split-slide>

---

## Array functions: ``.reduce()`` vs ``.reduceRight()``

<split-slide>
<div>

```js
const values = [25, 25, 25, 25];

values.reduce((acc, first) => acc + first);
// 25 + 25 + 25 + 25 = 100

values.reduce((acc, first) => acc - first);
// 25 - 25 - 25 - 25 = -50

// Último parámetro: Valor inicial
values.reduce((acc, first) => acc - first, 0);
// 0 - 25 - 25 - 25 - 25 = -100
```
</div>
<div>

```js
const values = [5, 10, 15, 20];

values.reduceRight((acc, first) => acc - first);
// 20 - 15 - 10 - 5 = -10

// Último parámetro: Valor inicial
values.reduceRight((acc, first) => acc - first, 0);
// 0 - 20 - 15 - 10 - 5 = -50
```
</div>
</split-slide>

---

## Notación Big O(N)

- Complejidad: [La notación Big O(N)](https://www.luisllamas.es/complejidad-algoritmica-big-o/#la-notaci%C3%B3n-big-on)
- Es una forma de medir la complejidad del código (tiempo de CPU o memoria) según aumenta el tamaño de la entrada.

<table>
<thead>
<tr>
<th>Complejidad</th>
<th>Denominación</th>
<th>Descripción</th>
</tr>
</thead>
<tbody>
<tr>
<td>O(1)</td>
<td>Constante</td>
<td>Acceso una carta concreta. Da igual cuantas sean. Inmediato.</td>
</tr>
<tr>
<td>O(log n)</td>
<td>Logarítmica</td>
<td>Cartas ordenadas. Búsqueda binaria. Eliminas la mitad y sigues buscando.</td>
</tr>
<tr>
<td>O(n)</td>
<td>Lineal</td>
<td>Buscas una carta concreta. Carta por carta hasta encontrarla.</td>
</tr>
<tr>
<td>O(n log n)</td>
<td>Lineal-logarítmica</td>
<td>Mazo desordenado. Divides en montones, ordenadas y combinas.</td>
</tr>
<tr>
<td>O(n²)</td>
<td>Cuadrática <img class="emoji" draggable="false" alt="⚠" src="https://cdn.jsdelivr.net/gh/jdecked/twemoji@16.0.1/assets/svg/26a0.svg" data-marp-twemoji=""></td>
<td>Ordenas mazo comparando cada carta con el resto.</td>
</tr>
<tr>
<td>O(2ⁿ)</td>
<td>Exponencial <img class="emoji" draggable="false" alt="⚠" src="https://cdn.jsdelivr.net/gh/jdecked/twemoji@16.0.1/assets/svg/26a0.svg" data-marp-twemoji=""><img class="emoji" draggable="false" alt="⚠" src="https://cdn.jsdelivr.net/gh/jdecked/twemoji@16.0.1/assets/svg/26a0.svg" data-marp-twemoji=""></td>
<td>Cada carta que añades, dobla el total.</td>
</tr>
<tr>
<td>O(n!)</td>
<td>Factorial <img class="emoji" draggable="false" alt="⚠" src="https://cdn.jsdelivr.net/gh/jdecked/twemoji@16.0.1/assets/svg/26a0.svg" data-marp-twemoji=""><img class="emoji" draggable="false" alt="⚠" src="https://cdn.jsdelivr.net/gh/jdecked/twemoji@16.0.1/assets/svg/26a0.svg" data-marp-twemoji=""><img class="emoji" draggable="false" alt="⚠" src="https://cdn.jsdelivr.net/gh/jdecked/twemoji@16.0.1/assets/svg/26a0.svg" data-marp-twemoji=""></td>
<td>Explora todas las combinaciones posibles.</td>
</tr>
</tbody>
</table>

---

## Complejidad

<split-slide style="--left: 50%; --right: 50%; --font-size: 1rem;">

```js
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "env": { "es2024": true },
  "ignorePatterns": ["**/node_modules/**"],
  "plugins": ["eslint", "unicorn", "oxc"],
  "jsPlugins": ["oxlint-plugin-complexity"],
  "rules": {
    "complexity/complexity": ["warn", {
      "cyclomatic": 4,
      "cognitive": 4
    }]
  }
}
```

<div>

- Complejidad ciclomática: Número de caminos independientes que puede seguir el código (matemático).
- Complejidad cognitiva: Mide lo difícil que es para un humano leer y entender el código.
## Recordemos:
- Debes tener instalado [oxlint](https://lenguajejs.com/javascript/calidad-de-codigo/oxlint/) para usar esta configuración
  - ``pnpm i -D oxlint``
  - ``pnpx oxlint --init``
- Instala dependencia [``oxlint-plugin-complexity``](https://npmx.dev/package/oxlint-plugin-complexity)
- Fichero de ejemplo para testear → [bad.js](../assets/bad.js)
</div>

</split-slide>

---

## Iteradores

- Iterar es avanzar por una estructura de forma eficiente (bajo demanda)

<steps>
<step>

```js
const data = ["One", "Two", "Three", "Four"];

// Sin iteradores
for (let i = 0; i < data.length; i++) {
  const number = data[i];
  console.log(number);
}
```
</step>
<step>

```js
const data = ["One", "Two", "Three", "Four"];

// Iterador implícito
data.forEach(number => console.log(number));

// En los arrays, tenemos un iterador "escondido"
data[Symbol.iterator]

// Veamos como funciona... ➡
```
</step>
<step>

```js
const data = ["One", "Two", "Three", "Four"];

data[Symbol.iterator] === data.values   // true
const iterator = data.values()  // Array Iterator {}

iterator.next() // { value: "One", done: false }
iterator.next() // { value: "Two", done: false }
// ...
iterator.next() // { value: undefined, done: true }

[...iterator]   // [] (Ya se han "consumido")
// Al usar .values(), creas una copia
```
</step>
</steps>

---

## Métodos de iteradores
- ``.take(n)`` → Toma los elementos desde el actual hasta el indicado
- ``.drop(n)`` → Descarta los ``n`` primeros elementos
- ``.toArray()`` → Convierte a Array (o usar spread ``[...]``)

```js
const data = ["One", "Two", "Three", "Four", "Five", "Six", "Seven"];

const iterator = data.values();

data.values()     // Hace copia
  .drop(3)        // Descarta los 3 primeros
  .take(2)        // Se queda sólo con los dos siguientes
  .toArray();     // Convierte a Array

// ["Four", "Five"]
```

---

## Array functions para Iteradores
- Podemos aplicar las clásicas array functions a los iteradores

```js
const messages = ["Hola a todos", "Estoy muy contento", "Adiós"];

const iterator = Iterator.from(messages);

iterator.values().forEach(...)  // Por cada elemento...
iterator.values().every(...)    // Si todas cumplen...
iterator.values().some(...)     // Si al menos una cumple...
iterator.values().filter(...)   // Filtrar elementos
iterator.values().find(...)     // Busca un elemento...
iterator.values().map(...)      // Transforma cada elemento...
iterator.values().flatMap(...)  // Transforma y aplana cada elemento...
iterator.values().reduce(...)   // Aplica función, acumulándola...
```

---

## Crear estructuras iterables
- Funciones pausables, con múltiples retornos → [Funciones generadoras](https://lenguajejs.com/javascript/funciones/generadores/)
- Valores únicos e irrepetibles → [Symbols](https://lenguajejs.com/javascript/tipos/symbols/)

<steps>
<step>

```js
const data = {
  from: 1,
  to: 5,
}

[...data]         // ❌ Uncaught TypeError: data is not iterable
```
</step>
<step>
<split-slide style="--left: 50%; --right: 50%; --font-size: 0.9rem;">

```js
function *generator() {
  yield 1;
  yield "a";
  yield 42;
}

const it = generator()
it.next()     // {value: 1, done: false }
it.next()     // {value: "a", done: false }
it.next()     // {value: 42, done: false }
it.next()     // {value: undefined, done: true }
```
```js
const data = {
  from: 1,
  to: 5,
  *[Symbol.iterator]() {
    for (let i = this.from; i <= this.to; i++) {
      yield i;
    }
  }
}

[...data]        // ✅ [1, 2, 3, 4, 5]
```
</split-slide>

---
<!-- _class: cover -->
<style scoped>
section {
  --cover: url(../assets/img_00024_.png);
}
</style>
# Código limpio


---
## Nombrado inteligente

<split-slide style="--left: 50%; --right: 50%; --font-size: 1rem;">

```js
const d = 42;                         // ❌
const days = 42;                      // 🟩
const daysSinceCreation = 42;         // ✅

const genymdhms = /* ... */           // ❌
const generateTimestamp = /* ... */   // ✅

const calculateTotal = () => { ... }
const sendEmail = () => { ... }
class User { ... }
class Invoice { ... }
const isValid = true;
```
<div>

- Buen nombre → código limpio, breve y sin explicaciones
- Verbos → funciones
- Sustantivos → clases
- Prefijos ``is``/``has`` → booleanos
- Evita tipos en nombres (ya los da el compilador/editor)
- Nombres de una letra, sólo en bucles
</div>

</split-slide>

---
## DRY (No te repitas)

<split-slide style="--left: 50%; --right: 50%; --font-size: 1rem;">

```js
// ❌ No te repitas
$product.textContent = `$${(product.price).toFixed(2)}`;
$cart.textContent = `$${(cart.total).toFixed(2)}`;
$summary.textContent = `$${(summary.amount).toFixed(2)}`;

// ✅ Generaliza
const formatPrice = (n) => `$${n.toFixed(2)}`;

$product.textContent = formatPrice(product.price);
$cart.textContent = formatPrice(cart.total);
$summary.textContent = formatPrice(summary.amount);
```
<div>

- Si detectas que repites la misma lógica... significa que podrías reutilizar.
- Extrae la lógica, generaliza si es necesario, y usa una función reutilizable.
- Más legible, más fácil de mantener si tienes que hacer cambios.
</div>

</split-slide>

---
## YAGNI (No lo necesitas)

<split-slide style="--left: 50%; --right: 50%; --font-size: 1rem;">

```bash
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣠⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣀⣀⣀⣠⠔⠊⠑⠒⣷⠆⢸⢳⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢀⠔⠋⠁⠀⠀⠉⠁⠒⠤⣄⠋⠀⠈⢧⡇⠀⠀⣰⣶⢆⠀
⠀⠀⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢉⣐⠒⠼⠿⠔⣊⣿⣿⢸⠀
⠀⠀⡇⠀⠀⠀⠀⢀⣤⡒⠋⣩⢉⠙⠛⢿⣿⡶⣾⣿⣿⣿⡌⠀
⠀⠀⠹⡄⠀⠀⢀⣾⣾⠁⢘⣭⣷⣶⠃⣿⣾⣷⣿⣿⣟⠝⠀⠀
⠀⠀⠀⠈⠢⣀⣸⢳⠛⡄⠀⠀⠀⠁⠀⣧⡀⢸⡽⠗⠁⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠈⠳⡄⠁⢠⠀⠀⠋⢱⢿⣷⡿⠁⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⡿⠀⢀⠐⠀⢭⣭⣽⣩⡇⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢀⣴⡇⠑⢬⣀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢀⠎⠹⡕⠠⢀⣈⠻⢿⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀
⠀⣀⠤⠒⠒⡇⠀⠀⠈⠢⣔⣭⣙⣛⣿⣽⣇⡏⣣⣀⠀⠀⠀⠀
⠉⠀⠀⠀⠀⠘⡄⠀⠀⣠⠴⡟⠍⡻⠟⣿⠘⣷⣇⢧⡉⠉⠉⠁
⠀⠀⠀⠀⠀⠀⣇⣠⠾⠃⠀⠓⠤⢔⣄⢣⠃⡇⣿⠚⠉
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⠉⢧⠁⡇
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠃⠀⠛
```
<div>

Busca el punto medio entre dos extremos:

- YAGNI → You Aren't Gonna Need It (evita el «por si acaso»)
- COWBOY → Estilo «llanero solitario» (no pensar NADA en el futuro)
- Evita construir cosas genéricas para problemas que aún no tienes.
- Abstracción prematura, añade complejidad sin beneficios.
- Pero tampoco vayas estilo libre, sin pensar más allá del futuro inmediato
</div>

</split-slide>

---
## Funciones puras

<split-slide style="--left: 50%; --right: 50%; --font-size: 1rem;">

```js
// Función pura: Misma entrada, siempre misma salida
const add = (a, b) => a + b;

// Función impura: Depende de algo externo (y lo modifica)
let total = 0;
const addToTotal = (n) => {
  total += n;
  return total;
}
```
<div>

- Una función que siempre produce el mismo resultado para los mismos argumentos.
- Una función que no modifica nada fuera de su ámbito.
- ✅ Son predecibles y fáciles de testear
- Una función aleatoria sería impura (no es predecible).
- Una función que consulta una API es impura (no es predecible).
- Efectos secundarios: Cambios fuera del alcance de la función.
- Ej: modificar variable global, escribir en disco, llamar API...
- No se trata de evitarlas, sino de aislarlas.
</div>

</split-slide>

---
## Tamaño de las funciones

<split-slide style="--left: 50%; --right: 50%; --font-size: 1rem;">

```js
// oxlint.json

{
  "rules": {
    "max-lines": ["warn", {
      "max": 300,
      "skipBlankLines": false,
      "skipComments": false
    }],
    "max-lines-per-function": ["warn", 50],
  }
}
```
<div>

- Si una función no cabe en tu pantalla... hace demasiadas cosas.
- Divídela y que tengan solo una responsabilidad cada una.
- No se trata de hacer literalmente una cosa, sino una tarea.
- Puedes configurar ``oxlint`` para que te ayude a detectarlo.
- Formato rápido (número), formato largo (objeto con opciones)
- Puedes limitar también el número de líneas por fichero.
</div>

</split-slide>

---
## Evita números y strings mágicos

<split-slide style="--left: 50%; --right: 50%; --font-size: 1rem;">

```js
// ❌ Números mágicos
if (user.role === 3) showAdminPanel();
if (password.length < 8) throw new Error('Muy corta');
setTimeout(logout, 900000); // 15 min

// ✅ Constantes descriptivas
const ROLE_ADMIN = 3;
const MIN_PASSWORD_LENGTH = 8;
const SESSION_TIMEOUT = 15 * 60 * 1000;

if (user.role === ROLE_ADMIN) showAdminPanel();
if (password.length < MIN_PASSWORD_LENGTH)
  throw new Error('Muy corta');
setTimeout(logout, SESSION_TIMEOUT);
```
<div>

- Un ``42`` o un ``"alonso"`` suelto no dice nada.
- Crea una constante ``MAX_VALUE ``o ``ADMIN_USER`` y ayudas a que se entienda mejor.
- Los números con separador:  ``900_000`` mejor que ``900000``.
- Pero aún mejor, ``15 * 60 * 1000`` (min x seg x ms)
</div>

</split-slide>

---

## Composición vs Herencia
- El problema no es usar herencia, es abusar de la herencia

<split-slide style="--left: 50%; --right: 50%; --font-size: 1rem;">

```js
class Bird {
  fly() { /* ... */ }
}

class Duck extends Bird {
  quack() { /* ... */ }
}

// 🚨 No vuela, pero hereda fly()
class RubberDuck extends Duck {
  fly() { throw new Error('Patito de goma y no hay nada mal'); }
}
```
```js
// Composición
const canQuack = { quack() {} };
const canFly   = { fly() {} };

const duck       = { ...canQuack, ...canFly };
const rubberDuck = { ...canQuack };
```

</split-slide>

---

## Cláusulas de guarda / Early returns
- Retorna lo antes posible cuando una condición no se cumple.
- Evita anidamiento excesivo y hace que el flujo del código sea más fácil de leer.

<split-slide style="--left: 50%; --right: 50%; --font-size: 1rem;">

```js
// ❌ Anidación excesiva, difícil de leer
function processOrder(user, cart) {
  if (user) {
    if (user.isActive) {
      if (cart.items.length > 0) {
        if (cart.total > 0) {
          return placeOrder(user, cart);
        }
      }
    }
  }
}
```
```js
// ✅ Uso de cláusulas de guarda / early return
function processOrder(user, cart) {
  if (!user)                  return null;
  if (!user.isActive)         return null;
  if (!cart.items.length)     return null;
  if (cart.total <= 0)        return null;

  return placeOrder(user, cart);
}
```

</split-slide>

---
<!-- _class: cover -->
<style scoped>
section {
  --cover: url(../assets/img_00025_.png);
}
</style>
# Patrones


---
## Patrones
- Patrones: Estrategias y formas de resolver problemas (que sabemos que funcionan muy bien)
- Patrones de diseño (Programación): Formas de resolver con código un problema concreto.
- Patrones de UI/UX (Diseño): Formas de ofrecer al usuario una interfaz para una tarea concreta.

[![alt text](../assets/patterns.png)](https://github.com/manzdev/design-patterns)

---
## Patrón Observador (Programación)

<split-slide style="--left: 50%; --right: 50%; --font-size: 1rem;">

```js
class EventEmitter {
  constructor() {
    this.listeners = {};  // Store de listeners
  }

  on(event, fn) {
    // Si no existe, inicializamos
    this.listeners[event] ??= [];
    this.listeners[event].push(fn);
  }
  emit(event, data) {
    this.listeners[event]?.forEach(fn => fn(data));
  }
}
```
```js
const emitter = new EventEmitter();

// Escuchar
emitter.on('login', user =>
  console.log(`Bienvenido ${user}`)
);
emitter.on('login', user =>
  console.log(`Notificando acceso de ${user}`)
);

// Emitir
emitter.emit('login', 'Alons');
```

---
## Patrón de Reactividad
- La reactividad es un patrón derivado del patrón «Observador».
- Es un patrón en el que los datos se «actualizan» de forma automática (muy usado en ciertos frameworks).
- Existe una [propuesta](https://github.com/tc39/proposal-signals) para añadirlo nativamente a Javascript


```js
import { Signal } from "https://cdn.jsdelivr.net/npm/signal-polyfill@0.2.2/dist/index.min.js";

const price = new Signal.State(100);
const quantity = new Signal.State(3);
const total = new Signal.Computed( () => price.get() * quantity.get() );

console.log(total.get()); // 300 (100 * 3)
price.set(150);
console.log(total.get()); // 450 (150 * 3)
```


---
## Patrón Breadcrumbs (Diseño)

<split-slide style="--left: 50%; --right: 50%; --font-size: 1.1rem;">

<div>

```html
<div class="breadcrumbs">
  <div class="part">Home</div>
  <div class="part">Articles</div>
  <div class="part">Temática</div>
</div>
```

```css
:root {
  --offset: 0.75rem;
  --shape-part: polygon(0 0,
    calc(100% - var(--offset)) 0, 100% 50%,
    calc(100% - var(--offset)) 100%, 0 100%,
    var(--offset) 50%
  );
}
```
</div>

```css
.breadcrumbs {
  display: flex;
  color: #ccc;
  font-family: "Victor Mono", sans-serif;
  font-weight: 600;
  filter: drop-shadow(0 0 2px #2229);
  cursor: pointer;

  .part {
    background: #222;
    padding: 0.5rem 2rem;
    clip-path: var(--shape-part);

    &:hover { background: indigo }
  }
}
```

</split-slide>


---

## Introducción a componentes
- Cambiar el enfoque global por un enfoque local
- Pequeños fragmentos de HTML/CSS/JS reutilizables, enfocados en una parte concreta

<split-slide style="--left: 50%; --right: 50%; --font-size: 1.1rem;">

```html
<body>
  <div class="user">
    <h1>Paco</h1>
    <img src="images/paco.webp" alt="Paco">
  </div>
  <div class="user">
    <h1>Sara</h1>
    <img src="images/sara.webp" alt="Sara">
  </div>
  <!-- ... -->
</body>
```
```html
<body>
  <user-component name="Paco"></user-component>
  <user-component name="Sara"></user-component>

  <script type="module">
    const user = document.querySelector("user-component");
    user.action();  // Su propio JS
    user.shadowRoot.adoptedStyleSheet // Su propio CSS
  </script>
</body>
```
</split-slide>


---
## Referencias

- [CheatSheet Javascript](https://lenguajejs.com/javascript/cheatsheets/)
- [bootcamp.manz.dev](https://bootcamp.manz.dev/)
- [Vite](https://vitejs.dev/)
- [Axios compromised on npm](https://www.stepsecurity.io/blog/axios-compromised-on-npm-malicious-versions-drop-remote-access-trojan)
- [LightningCSS](https://lightningcss.dev/)
- [Custom Media Queries - LightningCSS](https://lightningcss.dev/transpilation.html#custom-media-queries)
- [Rolldown - CSS bundling](https://rolldown.rs/guide/notable-features#css-bundling)
- [Búsqueda de plugins vite-plugin-](https://npmx.dev/search?q=vite-plugin-)
- [vite-plugin-standard-css-modules](https://npmx.dev/package/vite-plugin-standard-css-modules)
- [La notación Big O(N)](https://www.luisllamas.es/complejidad-algoritmica-big-o/#la-notaci%C3%B3n-big-on)
- [Oxlint](https://lenguajejs.com/javascript/calidad-de-codigo/oxlint/)



<script src="../assets/steps.js"></script>
