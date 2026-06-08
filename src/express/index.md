---
marp: true
theme: alo
paginate: true
---

<!-- _class: cover -->
<style scoped>
section {
  --cover: url(../assets/img_00046_.png);
}
</style>
#  APIs con NodeJS
## Contenidos
- Nociones básicas de HTTP
- Cabeceras HTTP
- Rutas en Express
- Ejercicio: API de videojuegos


> Inspirado en el bootcamp de <br><strong>Manz.dev</strong> todos los créditos a el.


---

## ¿Qué es Express?
- Un framework de NodeJS para crear y gestionar rutas
- ``pnpm init --init-type="module"``
- ``pnpm add express``
- ``pnpm add -D nodemon``

---

## Peticiones HTTP

- Instalar [httpie](https://httpie.io/) → sudo apt install httpie → Mejor aún: [xh](https://github.com/ducaale/xh) (soporte HTTP2)

<split-slide style="--left: 40%; --right: 60%; --font-size: 1rem;">
<steps>
<step>

```bash
$ http HEAD https://avotz.com/

HTTP/1.1 200 OK
Connection: keep-alive
Content-Encoding: gzip
Content-Type: text/html; charset=utf-8
Date: Mon, 27 Apr 2026 10:26:56 GMT
ETag: W/"69ef2a37-80b7"
Last-Modified: Mon, 27 Apr 2026 09:19:51 GMT
Server: nginx/1.22.1
X-Content-Type-Options: nosniff, nosniff
X-Frame-Options: DENY, SAMEORIGIN
X-Powered-By: PHP 9.0.1
X-XSS-Protection: 1; mode=block, 1; mode=block
```
</step>
<step>

```bash
$ xh HEAD https://avotz.com/

HTTP/2.0 200 OK
content-encoding: gzip
content-type: text/html; charset=utf-8
date: Mon, 27 Apr 2026 11:10:28 GMT
etag: W/"69ef2a37-80b7"
last-modified: Mon, 27 Apr 2026 09:19:51 GMT
server: nginx/1.22.1
x-content-type-options: nosniff
x-frame-options: DENY
x-frame-options: SAMEORIGIN
x-powered-by: PHP 9.0.1
x-xss-protection: 1; mode=block
```
</step>
</steps>
<div>

- Con ``http https://avotz.com/`` haces una petición a una URL
  - ...que es equivalente a ``http GET https://avotz.com/``
  - Esto te devuelve las cabeceras (head) y el cuerpo (body)
  - No confundir con el ``<head>`` y ``<body>`` del HTML
- Con ``http HEAD https://avotz.com/`` defines el método a usar
  - Permite usar otros métodos como HEAD, POST, etc...
- Con ``http --follow --all HEAD https://discord.avotz.com/``
  - ...puedes seguir redirecciones HTTP

</div>
</split-slide>

---
## Códigos HTTP de error
- ``200`` → **OK** (todo ha ido bien)
- ``404`` → **Not Found** (recurso o página no encontrada)
- ``301`` → **Redireccion permanente** (muy usada para SEO)
- ``302`` → **Redirección temporal** (provisional o temporal)
- ``403`` → **Acceso prohibido** (no puedes entrar aquí)
- ``500`` → **Error del servidor** (algo está mal en el servidor)
- ``4xx`` → **Error en el cliente** (problema a nivel de navegador)
- ``5xx`` → **Error en el servidor** (problema a nivel de máquina)
- [Otros códigos de error con gatos](https://http.cat/)


---
## Cabeceras HTTP

<steps>
<step>

- Cabeceras que puede enviar el cliente (navegador)

<table>
<thead>
<tr>
<th>Cabecera</th>
<th>Descripción</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>Accept</code></td>
<td>Tipos (MIME) que acepta el cliente. Comodines: <code>*/*</code> o <code>image/*</code></td>
</tr>
<tr>
<td><code>Accept-Encoding</code></td>
<td>Codificaciones/compresión aceptada por cliente</td>
</tr>
<tr>
<td><code>Accept-Language</code></td>
<td>Idioma preferido que acepta el navegador</td>
</tr>
<tr>
<td><code>Accept-Ranges</code></td>
<td>El servidor permite descargar partes (streaming, resumir descargas...)</td>
</tr>
<tr>
<td><code>Authorization</code></td>
<td>Credenciales del cliente. <code>Bearer</code>, <code>Basic</code>, <code>Digest</code>, <code>ApiKey</code>.</td>
</tr>
<tr>
<td><code>Host</code></td>
<td>Host al que quieres acceder. Obligatorio en HTTP1.</td>
</tr>
<tr>
<td><code>Referer</code></td>
<td>URL exacta desde donde procedes. Cuidado, no confiar.</td>
</tr>
<tr>
<td><code>User-Agent</code></td>
<td>Identificación del cliente o navegador. Cuidado, no confiar.</td>
</tr>
</tbody>
</table>
</step>
<step>

- Cabeceras que envía el servidor, relacionadas con el **contenido**
<table>
<thead>
<tr>
<th>Cabecera</th>
<th>Descripción</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>HTTP/1.1 200 OK</code></td>
<td>Protocolo usado y el código HTTP de error.</td>
</tr>
<tr>
<td><code>Connection</code> <img class="emoji" draggable="false" alt="1️⃣" src="https://cdn.jsdelivr.net/gh/jdecked/twemoji@17.0.2/assets/svg/31-20e3.svg" data-marp-twemoji=""></td>
<td>Gestión de la conexión <code>keep-alive</code> (la deja abierta) o <code>close</code> (la cierra).</td>
</tr>
<tr>
<td><code>Content-type</code></td>
<td>Define el tipo (MIME) de contenido (html, json...) y la codificación.</td>
</tr>
<tr>
<td><code>Content-encoding</code></td>
<td>Define la codificación/compresión. <code>identity</code> &lt; <code>deflate</code> &lt; <code>gzip</code> &lt; <code>br</code> (brotli) ~ <code>zstd</code></td>
</tr>
<tr>
<td><code>Content-length</code></td>
<td>Define el tamaño del body. Es el "opuesto" a <code>transfer-encoding: chunked</code>.</td>
</tr>
<tr>
<td><img class="emoji" draggable="false" alt="❌" src="https://cdn.jsdelivr.net/gh/jdecked/twemoji@17.0.2/assets/svg/274c.svg" data-marp-twemoji=""> <code>Transfer-encoding</code> <img class="emoji" draggable="false" alt="1️⃣" src="https://cdn.jsdelivr.net/gh/jdecked/twemoji@17.0.2/assets/svg/31-20e3.svg" data-marp-twemoji=""></td>
<td>Valor <code>chunked</code>. Envío por bloques. No necesita saber el tamaño <code>content-length</code>.</td>
</tr>
<tr>
<td><code>Location</code></td>
<td>Redirección en códigos HTTP 3xx.</td>
</tr>
<tr>
<td><code>Allow</code></td>
<td>Métodos permitidos para el recurso, separados por coma <code>GET, POST</code>.</td>
</tr>
</tbody>
</table>
</step>
<step>

- Cabeceras que envía el servidor, relacionadas con **caché**
<table>
<thead>
<tr>
<th>Cabecera</th>
<th>Descripción</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>Date</code></td>
<td>Fecha/hora del servidor.</td>
</tr>
<tr>
<td><code>ETag</code></td>
<td>Identificador del recurso. Usado para tareas de caché.</td>
</tr>
<tr>
<td><code>Last-Modified</code></td>
<td>Fecha de última modificación del recurso. Usado para tareas de caché.</td>
</tr>
<tr>
<td><code>Cache-Control</code></td>
<td>Directivas de caché. <code>no-cache</code>, <code>no-store</code>, <code>public</code>, <code>private</code>, <code>max-age=...</code>, <code>must-revalidate</code></td>
</tr>
<tr>
<td><img class="emoji" draggable="false" alt="❌" src="https://cdn.jsdelivr.net/gh/jdecked/twemoji@17.0.2/assets/svg/274c.svg" data-marp-twemoji=""> <code>Expires</code></td>
<td>Fecha en la que expira la caché. Obsoleta.</td>
</tr>
</tbody>
</table>
</step>
<step>

- Cabeceras que envía el servidor, relacionadas con **seguridad**
<table>
<thead>
<tr>
<th>Cabecera</th>
<th>Descripción</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>Server</code></td>
<td>Software del servidor. Texto libre, cuidado con dar información.</td>
</tr>
<tr>
<td><code>X-*</code></td>
<td>Cabecera personalizada. Puedes enviar tus propias cabeceras.</td>
</tr>
<tr>
<td><code>X-Powered-By</code></td>
<td>Tecnología del backend. Texto libre, cuidado con dar información.</td>
</tr>
<tr>
<td><code>X-Content-Type-Options</code></td>
<td>Seguridad. <code>nosniff</code> evita MIME sniffing.</td>
</tr>
<tr>
<td><code>X-Frame-Options</code></td>
<td>Seguridad. <code>DENY</code> controla iframes. Otro valor: <code>SAMEORIGIN</code></td>
</tr>
<tr>
<td><img class="emoji" draggable="false" alt="❌" src="https://cdn.jsdelivr.net/gh/jdecked/twemoji@17.0.2/assets/svg/274c.svg" data-marp-twemoji=""> <code>X-XSS-Protection</code></td>
<td>Filtro XSS legacy. Obsoleto.</td>
</tr>
</tbody>
</table>
</step>
</steps>

---
## Petición completa

<split-slide style="--left: 50%; --right: 50%; --font-size: 1rem;">

```bash
$ xh GET https://avotz.com/

HTTP/2.0 200 OK
content-length: 32949
content-type: text/html; charset=utf-8
...

<!DOCTYPE html><html lang="es" data-astro-cid-lg3izgkh> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="preload" href="/assets/fonts/montserrat-vf.woff2" as="font" crossorigin="anonymous"> ...
```
<div>

- Una petición ``HEAD`` sólo muestra cabeceras
- Una petición GET envía cabeceras + body
- El body es el cuerpo de la página (HTML, JSON, etc...)
</div>
</split-slide>

---
<!-- _class: cover -->
<style scoped>
section {
  --cover: url(../assets/express.png);
}
</style>
# NodeJS + Express

---
## Rutas simples con Express

<steps>
<step>
<split-slide style="--left: 50%; --right: 50%; --font-size: 1rem;">

```js
import express from "express";
const app = express();

app.enable("strict routing");

const HOST = "localhost";
const PORT = 4321;

app.get("/", (req, res) => res.send("HOME"));
app.get("/about", (req, res) => res.send("ABOUT"));

app.listen(PORT, HOST, () => {
  console.log(`Server at http://${HOST}:${PORT}/`)
});
```
<div>

- Con ``pnpx nodemon index.js`` ejecutamos el script
- Cuando guardemos, se recargan los cambios
- ``node --watch index.js`` (no compatible con WSL2)

- Normaliza las rutas ``/about`` != ``/about/`` → SEO
- Las variables ``HOST`` y ``PORT`` se externalizarán en ``.env``

- Con ``app.listen()`` escuchamos peticiones en IP y puerto
- Con ``app.get()``  ejecutamos funciones al recibir rutas

- Si accedes a ``http://localhost:4321/`` vas a HOME
- Si accedes a ``http://localhost:4321/about`` vas a ABOUT
- Otra ruta de acceso da un error 404
</div>
</split-slide>
</step>
<step>
<split-slide style="--left: 50%; --right: 50%; --font-size: 1rem;">

```js
app.get("/page/", (req, res) => {
  res.header("Content-type", "text/html");
  const html = /* html */`
    <style>
      body {
        background: #222;
        color: #fff;
      }
    </style>
    <h1>Página principal</h1>
    <p>Esta es la página
      principal de mi sitio web.</p>
  `;
  res.send(html);
});
```
```js
import { cwd } from "node:process";

const PATH = cwd();

app.get("/robots", (req, res) =>
  res.sendFile(`${PATH}/robots.txt`));

app.get("/youtube", (req, res) =>
  res.redirect("https://youtube.com/@manzdev"));

app.get("/forbidden/", (req, res) => {
  const data = { error: "403" };
  res.status(403).json(data);
});
```
</split-slide>
</step>
</steps>

---
## Rutas dinámicas
- Las rutas dinámicas son formas de crear múltiples rutas con una sola


<split-slide style="--font-size: 1rem;">

```js
app.get("/users", (req, res) =>
  res.send("Lista de usuarios"));

app.get("/user/:name", (req, res) => {
  const name = req.params.name; // ⚠ Cuidado
  res.send(`Usuario: ${name}`);
});

app.listen(PORT, HOST, () => {
  console.log(`Server at http://${HOST}:${PORT}/`)
});
```
<div>

- La ruta ``/users`` debería mostrar los usuarios existentes
- La ruta ``/user/:name`` es dinámica:
  - ``/user/alons`` da los datos de ``alons``
  - ``/user/manzdev`` da los datos de ``manzdev``

- En ``req.params.name`` tenemos los datos del ``:name``
  - ``:name`` proviene del usuario
  - ¡**NUNCA** confíes en los datos del usuario!
</div>
</split-slide>

---
<!-- _class: cover -->
<style scoped>
section {
  --cover: url(../assets/img_00053_node.png);
}
</style>
# API de videojuegos (aventuras gráficas clásicas)


---
## Empecemos por una API sencilla

<split-slide style="--left: 50%; --right: 50%; --font-size: 1rem;">

```js
[
  {
    "name": "The Secret of Monkey Island",
    "author": "Lucasfilm Games",
    "genre": "comedia",
    "characters": ["Guybrush Threepwood"],
    "enemies": ["LeChuck"],
    "year": 1990,
    "image": "monkey-island.avif",
    "slug": "monkey-island",
    "summary": "Un aspirante a pirata quiere ser leyenda.",
    "description": "Guybrush Threepwood intenta convertirse en un temido pirata enfrentándose al fantasma LeChuck usando ingenio, insultos y humor."
  },
  ...
]
```
<div>

- Lo primero, los datos
  - De momento, un fichero ``.json``
  - Y sus imágenes respectivas en ``covers/``
- Pueden existir múltiples protagonistas y enemigos
- La ``image`` y ``slug`` podría fusionarse en un dato
- Tenemos un ``summary`` (descripción corta)
- Tenemos un ``description`` (descripción larga)


- Nuestro ``.json`` tendrá varios objetos así
- Esa será **de momento** nuestra base de información
- Fichero con los datos: [data.json](../assets/api/data.json)
</div>
</split-slide>


---

## Ruta principal y de los juegos

<split-slide style="--left: 50%; --right: 50%; --font-size: 1rem;">

```js
import express from "express";
import data from "./data.json" with { type: "json" };

const app = express();

const HOST = "localhost";
const PORT = 4321;

app.get("/", (req, res) => res.send("Alo API 1.0"));

app.get("/games", (req, res) => {
  res.header("Content-type", "application/json");
  res.send(data.map(item => item.slug));
});
```
<div>

- Importamos el ``.json`` usando import attributes
- Recuerda que ``HOST`` y ``PORT`` deberían externalizarse
- La ruta ``/`` devuelve información sobre la API

- La ruta ``/games`` devuelve una lista de ``id`` de los juegos
  - Con un ``map`` nos quedamos sólo con los ``slugs``

- El ``header()`` con el ``Content-type`` es didáctico
  - Por ejemplo, usar ``json()`` ya lo hace por nosotros

- Evitar enviar demasiada información (sólo slugs)
  - ``["monkey-island", "loom", "toonstruck"]``

---

## Ruta de juego específico


<split-slide style="--font-size: .9rem;">

```js
const notFound = (res, message) => {
  return res.status(404).json({ error: message });
}

app.get("/game/:slug", (req, res) => {
  const game = data
    .find(item => item.slug === req.params.slug);

  if (!game)
    return notFound(res, "Game not found");

  res.json(game);
});
```
<div>

- La ruta ``/game/:slug`` se espera el ``slug`` de un juego
- Buscamos con ``find`` si hay juego que coincida con ``slug``

- 1️⃣ Si no hay, devolvemos un ``notFound``
  - Función que da un ``404`` y devuelve ¡JSON! de error
  - Somos una API, errores también devuelven ``.json``
- 2️⃣ Si existe, devolvemos los datos del juego (``game``)
  - En este caso si devolvemos datos extensos (es la idea)

- Recuerda: Si se entra en una ruta, debería procesarse
</div>

---

## Ruta de juegos por año y aleatorio



<split-slide style="--left: 55%; --right: 50%; --font-size: 1rem;">

```js
app.get("/year/:year", (req, res) => {
  const games = data
    .filter(item => item.year == req.params.year)
    .map(item => item.slug);

  res.json(games);
});

app.get("/random", (req, res) => {
  const i = Math.floor(Math.random() * data.length);
  res.json(data[i]);
});
```

<div>

- En las rutas por año...
  - Filtramos por el año en cuestión ``req.params.year``
  - Nos quedamos sólo con el ``slug``
- Si no existe ningún juego por año indicado:
  - Devolvemos un array vacío ``[]``
  - El año si existe, la ruta es correcta
  - ...sólo que no tiene juegos
- En la ruta ``random``:
  - Obtenemos número al azar entre ``0`` y el número de juegos
  - Devolvemos la información
</div>
</split-slide>


---
## Parámetros, estáticos y catch-all

<split-slide style="--left: 50%; --right: 50%; --font-size: 1rem;">

```js
app.get("/games", (req, res) => {
  const isFull = req.query.include === "full";
  const contents = isFull
    ? data
    : data.map(item => item.slug);

  res.json(contents);
});

app.use(express.static("public"));

app.use((req, res) => {
  res.status(404).json({ error: "Path not found" });
});
```
<div>

- Si el usuario añade ``?include=full`` a /games...
  - Devolvemos la información detallada
  - Puede ser útil para no hacer muchas peticiones
  - Valorar si el contenido es demasiado extenso

- Con ``app.use`` usamos un middleware
  - ``express.static()`` permite devolver ficheros estáticos
  - Ej: Responde a ``/covers/monkey-island.avif``
  - Cuidado: No incluyas más que ficheros estáticos

- **Catch-all**: Si no entras en ninguna otra ruta, entra aquí
  - Devolvemos un ``404`` con ruta no encontrada

</div>

</split-slide>

---
## Buscador
<split-slide style="--left: 50%; --right: 50%; --font-size: 1rem;">

```js
app.get("/search/:text", (req, res) => {
  const query = req.params.text.toLowerCase();

  const results = data
    .filter(game => {
      const json = JSON.stringify(game).toLowerCase();
      return json.includes(query);
    })
    .map(game => game.slug);

  res.json(results);
});
```
<div>

- En la ruta ``/search/`` podemos realizar una búsqueda
- Pasamos los datos a minúsculas
- Filtramos por juego, pasamos a texto toda su info
- Comprobamos si existe el texto buscado

- De los encontrados, devolvemos su ``slug``

- Convendría poner un tamaño mínimo → ``/search/a``
- Convendría asegurar y validar la entrada de datos
</div>

---
<!-- _class: cover -->
<style scoped>
section {
  --cover: url(../assets/img_00054_node.png);
}
</style>
# Separar y organizar lógica


---
## Controladores y módulos
- Obtenemos información sensible al entorno en el .env

<split-slide style="--left: 50%; --right: 50%; --font-size: 1rem;">
<steps>
<step>

```js
import express from "express";

import { search } from "./routes/games/search.js";
import { random } from "./routes/games/random.js";
import { getBySlug } from "./routes/games/getBySlug.js";
import { getByYear } from "./routes/games/getByYear.js";
import { getAll } from "./routes/games/getAll.js";

const app = express();

app.get("/", (req, res) => res.send("Alo API 1.0"));
app.get("/games", getAll);
app.get("/game/:slug", getBySlug);
app.get("/year/:year", getByYear);
app.get("/search/:text", search);
app.get("/random", random);
```
</step>
<step>

```js
import data from "../../data.json" with { type: "json" };

export const search = (req, res) => {
  const query = req.params.text.toLowerCase();

  const results = data
    .filter(game => {
      const json = JSON.stringify(game).toLowerCase();
      return json.includes(query);
    })
    .map(game => game.slug);

  res.json(results);
}
```
</step>
</steps>
<div>

- Vamos a separar las funciones en controladores
- La carpeta ``/routes/games/`` contendrá los controladores
  - ``search.js`` contendrá la lógica de búsqueda
  - ``random.js`` contendrá la lógica de juego al azar
  - etc...

- La función ``search`` está exportada en el ``search.js``
- De momento, se trae los datos de ../../data.json
</div>
</split-slide>

---
## Validaciones con zod
- Instalamos [zod](https://zod.dev/) con ``pnpm add zod`` → [API de zod](https://zod.dev/api)

<split-slide style="--left: 60%; --right: 40%; --font-size: 1rem;">
<steps>
<step>

```js
import { z } from "zod";

const schema = z.object({
  text: z.string()
    .trim()
    .nonempty("Búsqueda no puede estar vacía")
    .min(3, "Debe tener al menos 3 carácteres")
    .max(50, "No puede tener más de 50 carácteres")
    .transform(value => value.toLowerCase())
});

export default schema;
```
</step>
<step>

```js
z.string();                    z.number()
    .length(5)                     .gt(5)
    .regex(/A.+/)                  .lt(5)
    .uppercase()                   .positive()
    .lowercase()                   .multipleOf(5)
    .includes()
    .email()                     z.set()
    .url()                         .min(5)
    .emoji()                       .max(5)
    .ipv4()                        .size(5)
    .hash("sha256")
    .iso.datetime()              z.array()
    .iso.duration()              z.date()
  /* ... */
```
</step>
<step>

```js
import schema from "./search.schema.js";

const DEFAULT = "Búsqueda inválida";

export const search = (req, res) => {
  const parsed = schema.safeParse(req.params);

  if (!parsed.success) {
    const error = parsed.error.issues[0].message ?? DEFAULT;
    return res.status(400).json({ error });
  }
  const query = parsed.data.text;
  /* ... */
}
```
</step>
</steps>
<div>

- 1️⃣ Creamos un ``routes/games/search.schema.js``
- Importamos ``z``, la librería ``zod``
- Creamos un esquema para validar
  - Objeto ``query`` → ``{ text: "..." }``
  - 2️⃣ El parámetro ``text`` es un ``string``
  - Limpiamos con ``trim()`` y validamos
  - Transformamos a minúsculas

- 3️⃣ Usamos ``safeParse()`` con ``req.params``
- Después obtenemos ``parsed.data.text``
</div>
</split-slide>

---
## Cambiar Express por Fastify
- Se estarán preguntando **¿Y por qué no Fastify?**... (u otra) → [Fastify](https://fastify.dev/)


<split-slide style="--font-size: 1rem;">

```js
import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
const app = Fastify({ logger: true });

app.register(fastifyStatic, {
  root: join(cwd(), "public"),
  prefix: "/",
});

app.setNotFoundHandler((req, res) => {
  res.code(404).send({ error: "Path not found" });
});

app.listen({ port: PORT });
```
<div>

- Instalar con ``pnpm add fastify @fastify/static``
- Importamos y cambiamos instancia inicial con ``Fastify()``
- Usamos ``app.register()`` en lugar del ``app.use()``
- Usamos ``app.setNotFoundHandler()`` en lugar del ``app.use()``
- Usamos otra sintaxis en ``app.listen()``
- Usamos ``.send()`` en lugar de ``.json()``

- Algunos cambios más y tendremos **Fastify** funcionando
  - Lo importante es entender lo que estamos haciendo
  - La sintaxis es algo menor, es sólo buscar la alternativa
</div>
</split-slide>

---
<!-- _class: cover -->
<style scoped>
section {
  --cover: url(../assets/img_00055_.png);
}
</style>
# Organizar y gestionar datos


---
## Patrón Repositorio


<split-slide style="--left: 60%; --right: 40%; --font-size: 1rem;">
<steps>
<step>

```js
import data from "./data.json" with { type: "json" };

export const getAll = () => data;
export const getBySlug = slug => data.find(item => item.slug === slug);
export const getByYear = year => data.filter(item => item.year == year);

export const getRandom = () => {
  const index = Math.floor(Math.random() * data.length);
  return data[index];
};

export const search = (text) => {
  const query = text.toLowerCase();
  return data.filter(item =>
    JSON.stringify(item).toLowerCase().includes(query)
  );
};
```
</step>
<step>

```js
// /router/games/getBySlug.js
import * as game from "../../data/games.js";

export const getBySlug = (req, res) => {
  const selectedGame = game.getBySlug(req.params.slug);

  if (!selectedGame)
    return notFound(res, "Game not found");

  res.json(selectedGame);
}
```
</step>
</steps>
<div>

- 1️⃣ Creamos carpeta ``/data/`` y movemos ``data.json``
- Creamos un ``/data/games.js``
- Nos traemos la lógica de las funciones
  - Cada función debe devolver sus datos
  - Exportamos cada función

- 2️⃣ Actualizamos los endpoints
  - Importamos como namespace ``* as game``
  - Actualizamos usando ``game.getBySlug()``

- Ahora, **no nos importa** que tecnología usamos.
</div>
</split-slide>

---
## SQLite

<steps>
<step>
<split-slide style="--left: 60%; --right: 40%; --font-size: 1rem;">

```js
import { DatabaseSync } from "node:sqlite";
import data from "./data.json" with { type: "json" };
import { cwd } from "node:process";
import { readFileSync } from "node:fs";

const DATABASE_FILE = `${cwd()}/data/games.db`;
const CREATE_SCRIPT = `${cwd()}/data/CREATE.SQL`;

// Establecemos acceso a la base de datos
const db = new DatabaseSync(DATABASE_FILE);

// Lee script, lo ejecuta y crea tablas en SQLite
const sql = readFileSync(CREATE_SCRIPT, "utf-8");
db.exec(sql);
```
<div>

- Node 22+ → soporte nativo de [SQLite](https://nodejs.org/api/sqlite.html)
- Instala [Extensión VSCode SQLite](https://marketplace.visualstudio.com/items?itemName=alexcvzz.vscode-sqlite)

- Vamos a pasar los datos del ``.json`` a SQLite
- Creamos un script ``data/createdb.js``
- Creamos un ``data/games.db`` (BD SQLite)
- Leemos el fichero ``data/CREATE.SQL`` (Script SQL)
- Ejecutamos la consulta del script SQL
</div>
</split-slide>
</step>
<step>
<split-slide style="--left: 50%; --right: 50%; --font-size: 1rem;">

```sql
CREATE TABLE games (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  author TEXT NOT NULL,
  genre TEXT,
  year INTEGER,
  characters TEXT,      /* ⚠ NO RELACIONAL */
  enemies TEXT,         /* ⚠ NO RELACIONAL */
  image TEXT,
  slug TEXT UNIQUE NOT NULL,
  summary TEXT,
  description TEXT
);
```
<div>

- Creamos una tabla SQL llamada ``games``
  - Un ``id`` con un valor numérico autoincremental
  - Campos ``name``, ``author``, ``genre`` y ``year``
  - ⚠ ``characters`` y ``enemies`` **deberían** ser tablas
  - Campo ``image`` es el nombre de la ``imagen.ext``
  - Campo ``slug`` es el valor de la URL
  - Campo ``summary`` y ``description`` textos largos

- SQLite tiene campos básicos: ``TEXT``, ``INTEGER``...
</div>
</split-slide>
</step>
<step>
<split-slide style="--left: 50%; --right: 50%; --font-size: 1rem;">

```js
// Preparar inserción de datos de juegos
const games = db.prepare(/* SQL */`INSERT INTO games (name,
  author, genre, year, characters, enemies, image, slug,
  summary, description) VALUES (:name, :author, :genre, :year,
  :characters, :enemies, :image, :slug, :summary, :description)`);

for (const game of data) {
  games.run({
    ...game,
    characters: JSON.stringify(game.characters),
    enemies: JSON.stringify(game.enemies)
  });
}

console.log("Base de datos creada y poblada con éxito.");
```
<div>

- Otra forma es incluir la consulta ``SQL`` en línea
- Utilizamos ``db.prepare()`` para preparar la consulta
  - Permite anticiparse a sus parámetros
  - Evita SQL Injection
  - Mejor rendimiento
- Recorremos json ``data`` → obtenemos cada juego en ``game``
- Ejecutamos la consulta ``games.run()`` y le pasamos ``game``
- ⚠️ ``JSON.stringify()`` guarda en texto plano arrays
  - ❌ NO HACER Es sólo para simplificar ejercicio
  - ✅ Crear más tablas y normalizar

- Ejecutar con ``node`` y comprobar con extensión ``SQLite``
</div>
</split-slide>
</step>
<step>
<split-slide style="--left: 50%; --right: 50%; --font-size: 1rem;">

```js
import { DatabaseSync } from "node:sqlite";
import { cwd } from "node:process";

const db = new DatabaseSync(`${cwd()}/data/games.db`);

export const getAll = () => {
  const query = db.prepare("SELECT slug FROM games");
  return query.all();
};

export const getBySlug = slug => {
  const query = db.prepare("SELECT * FROM games WHERE slug = ?");
  return query.get(slug);
};
```
<div>

- En ``/data/games.js`` Cambiamos repositorio
  - Conectamos a la base de datos ``/data/games.db``

- Modificamos nuestros métodos para obtener datos
- En ``getAll()`` obtenemos todos los juegos
  - ``db.prepare()`` prepara consulta
  - ``query.all()`` devuelve todos los datos
  - 👀 Sólo queremos los ``slug``
- En ``getBySlug()`` obtenemos info de un juego
  - ``db.prepare()`` prepara consulta
  - ``query.get()`` le pasa el parámetro ``slug`` a ``?``
</div>
</split-slide>
</step>
<step>
<split-slide style="--left: 50%; --right: 50%; --font-size: 1rem;">

```js
export const getByYear = year => {
  const query = db.prepare("SELECT slug FROM games WHERE year = ?");
  return query.all(year);
};

export const getRandom = () => {
  const query = db.prepare("SELECT * FROM games ORDER BY RANDOM() LIMIT 1");
  return query.all();
};

export const search = (text) => {
  const query = db.prepare("SELECT * FROM games WHERE name LIKE ? OR description LIKE ?");
  return query.all(`%${text}%`, `%${text}%`);
};
```
<div>

- El método ``getByYear()`` similar a los anteriores
  - Recuperamos todo ``query.all()``
- El método ``getRandom()`` da un juego al azar
  - Utilizamos ``ORDER BY RANDOM() LIMIT 1``
- El método ``search()`` busca textos
  - Concretamente en ``name`` o ``description``
</div>
</split-slide>
</step>
</steps>


---
## Referencias

- [CheatSheet Javascript](https://lenguajejs.com/javascript/cheatsheets/)
- [bootcamp.manz.dev](https://bootcamp.manz.dev/)
- [NodeJS](https://lenguajejs.com/nodejs/)
- [NodeJS API](https://nodejs.org/api/)
- [Express](https://expressjs.com/)
- [Express API](https://expressjs.com/en/4x/api.html)
- [SQLite](https://www.sqlite.org/docs.html)







<script src="../assets/steps.js"></script>
<script src="../assets/image-modal.js"></script>
