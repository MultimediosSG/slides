---
marp: true
theme: alo
paginate: true
---

<!-- _class: cover -->
<style scoped>
section {
  --cover: url(../assets/img_00057_.png);
}
</style>
# Javascript
## Contenidos
- Metodos de ``String``
- Metodos de ``Array``
- Metodos de ``Object``
- Metodos avanzados


> Inspirado en el bootcamp de <br><strong>Manz.dev</strong> todos los créditos a el.

---
## Metodos

- Si sabemos el tipo de dato, sabemos que métodos (funciones) tiene
- Busca el bloque String de la [CheatSheet de Javascript](https://lenguajejs.com/javascript/cheatsheets/)

```js
const text = "Alonso";     // Es un string

text.length       // 5
text.at(2)        // "o"  → también text[2]
text.at(-1)       // ???
text.repeat(3);   // "AlonsoAlonsoAlonso"

String(Number(text)).repeat(4) + " " + text
```


---

## Metodos

- Si sabemos el tipo de dato, sabemos que métodos (funciones) tiene
- Busca el bloque String de la [CheatSheet de Javascript](https://lenguajejs.com/javascript/cheatsheets/)

```js
const text = "Alonso";     // Es un string

typeof text;            // "string"
text.constructor.name   // "String"

text.length             // ✅
text.repeat(5)          // ✅
```

---
## Metodos

- Si sabemos el tipo de dato, sabemos que métodos (funciones) tiene
- Busca el bloque String de la [CheatSheet de Javascript](https://lenguajejs.com/javascript/cheatsheets/)

```js
const number = 42;

typeof number;          // "number"
number.constructor.name // "Number"

number.length           // ❌
number.repeat(5)        // ❌

number.toExponential()  // ✅ "4e+0"
number.toPrecision(4)   // ✅ "4.000"
```


---

## String templates

- Puedes usar ambas opciones, pero se prefiere ser consistente
- Strings template permite: Interpolación de variables y multilinea
- Extensión [ES6 String HTML](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html)



```js
// En general, las Strings en JS se escriben con doble comilla:
const name = "Alonso";
const text = "Hola";

// También se pueden escribir con comilla simple:
const text = 'Hola';

// En general, se usan comillas dobles, pero hay un caso más interesante
```

---

## String templates

- Puedes usar ambas opciones, pero se prefiere ser consistente
- Strings template permite: Interpolación de variables y multilinea
- Extensión [ES6 String HTML](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html)



```js
// Sin string templates:
const name = "Alonso";
const text = "Hola, soy " + name;   // "Hola, soy Alonso"

// Con string templates:
const text = `Hola, soy ${name}`;   // "Hola, soy Alonso"
```

---

## String templates

- Puedes usar ambas opciones, pero se prefiere ser consistente
- Strings template permite: Interpolación de variables y multilinea
- Extensión [ES6 String HTML](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html)



```js
// Esto es especialmente interesante, porque nos permitirá crear cosas más complejas:
const message = "¡Hola a todos!";
const html = `<div class="container"><p>${message}</p></div>`;

// O incluso colocarlo más legible:
const html = /* html */`<div class="container">
  <p>${message}</p>
</div>`;
```

---
## Posición y fragmentos
- Los métodos ``.search()``, ``.indexOf()`` e ``.lastIndexOf()`` buscan posiciones (index)
- Los métodos ``.substring()`` e ``.slice()`` buscan y devuelven fragmentos
- Los métodos ``.replace()`` y ``.replaceAll()`` buscan y reemplazan fragmentos

```js
//            ↓0   ↓5        ↓15           ↓29
const text = "Estamos en el curso de Multimedios";

text.search("curso");    // 14
text.indexOf("o");          // 5
text.indexOf("u", 6);       // 15
text.lastIndexOf("e");      // 29
text.lastIndexOf("z", 28);  // -1 (no se encuentra)

```

---
## Posición y fragmentos
- Los métodos ``.search()``, ``.indexOf()`` e ``.lastIndexOf()`` buscan posiciones (index)
- Los métodos ``.substring()`` e ``.slice()`` buscan y devuelven fragmentos
- Los métodos ``.replace()`` y ``.replaceAll()`` buscan y reemplazan fragmentos

```js
//            ↓0   ↓5        ↓15           ↓29
const text = "Estamos en el curso de Multimedios";

text.substring(14, 22);     // "curso"
text.substring(14);         // "curso de Multimedios"
text.slice(14, 22);         // Igual a substring
text.slice(14, -2);         // ✅ "curso de Multimedi"

// Los métodos .match() también buscan (más avanzados)

```

---
## Posición y fragmentos
- Los métodos ``.search()``, ``.indexOf()`` e ``.lastIndexOf()`` buscan posiciones (index)
- Los métodos ``.substring()`` e ``.slice()`` buscan y devuelven fragmentos
- Los métodos ``.replace()`` y ``.replaceAll()`` buscan y reemplazan fragmentos

```js
//            ↓0   ↓5        ↓15           ↓29
const text = "Estamos en el curso de Multimedios";

// Ojo, no reemplaza, devuelve una copia (esto es importante)
text.replace("curso", "clase");   // Reemplaza sólo el primero
text.replaceAll("a", "i");            // Reemplaza todas las "a"
text.replaceAll(/[aeiou]/, "i");      // Con expresiones regulares

```

---
## Separar y unir
- Los métodos ``.split()`` / ``.join()`` separar o unen (String → Array, y viceversa)

```js
const text = "Estamos en el curso de Multimedios";

const words = text.split(" ");      // (6) ['Estamos', 'en', 'el', 'curso', 'de', 'Multimedios']
const fragments = text.split("o");  // (4) ['Estam', 's en el b', '', 'tcamp de Multimedios']

words.push("todos", "juntos");      // (8) ['Estamos', 'en', ..., 'de', 'Multimedios', 'todos', 'juntos']
const newText = words.join(" ");    // 'Estamos en el bootcamp de Multimedios todos juntos'

```

---
## Comprobaciones
- Comprueba si un texto empieza/acaba por algo ``.startsWith()`` / ``.endsWith()``
- Comprueba si un texto incluye un fragmento ``.includes()``

```js
const firstMessage = "yes";
const secondMessage = "no";
const thirdMessage = "yes, of course";

const isPositive = firstMessage.startsWith("yes");    // true
const isPositive = secondMessage.startsWith("yes");   // false
const isPositive = thirdMessage.startsWith("yes");    // true

// Ojo: mayúsculas/minúsculas, espacios, variaciones, etc...

```

---
## Comprobaciones
- Comprueba si un texto empieza/acaba por algo ``.startsWith()`` / ``.endsWith()``
- Comprueba si un texto incluye un fragmento ``.includes()``

```js
const text = "Estamos en el curso de Multimedios";

text.endsWith("Multimedios");   // true

text.includes("Multimedios");   // true
text.includes("curso");  // true
text.includes("Alonso");   // false

```

---
## Manipulación de textos
- Mayúsculas y minúsculas con ``.toLowerCase()`` / ``.toUpperCase()``
- Suprimir («afeitar») espacios con ``.trimStart()`` / ``.trimEnd()`` / ``.trim()``

```js
const text = "¿Has practicado flex y grid?";
const message = "  ¿Todavía  nada?  ";

text.toUpperCase();   // '¿HAZ PRACTICADO FLEX Y GRID?'
message.trimStart();  // '¿Todavía  nada?  '
message.trim();       // '¿Todavía  nada?'
```

---
<!-- _class: cover -->
<style scoped>
section {
  --cover: url(../assets/img_00070_.png);
}
</style>
# Métodos matemáticos

---

---
## Referencias

- [CheatSheet CSS](https://lenguajecss.com/css/cheatsheets/)
- [bootcamp.manz.dev](https://bootcamp.manz.dev/)

