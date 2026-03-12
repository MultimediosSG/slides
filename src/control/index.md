---
marp: true
theme: alo
paginate: true
---

<!-- _class: cover -->
<style scoped>
section {
  --cover: url(../assets/img_00051_.png);
}
</style>
# Control del proyecto
## Contenidos

- Instalación de pnpm / Ecosistema Node
- Estructura de carpetas
- Uso básico de Git + GitHub + GitHub Pages
- Automatizar desde CLI

> Inspirado en el bootcamp de <br><strong>Manz.dev</strong> todos los créditos a el.

---
## Instalación de Node

- [NodeJS](https://nodejs.org/): Javascript fuera del navegador ( releases )
- [PNPM](https://pnpm.io/): Mejora de gestor de paquetes

```bash
# Instalamos pnpm
pnpm --version

# Instalamos Node (LTS)
node --version
```

---
## Estructura de carpetas

```bash
📁 /home/alons/workspace              # Carpeta de trabajo (donde están otros proyectos)
 ├── 📁 project-name                  # Carpeta del proyecto (la que hay que abrir en VSCode)
 │    ├── 📁 src                      # Código editable y ficheros relacionados
 │    │    ├── 🟧 index.html          # Nuestro HTML
 │    │    ├── 🟪 index.css           # Nuestro CSS
 │    │    └── 🟨 index.js            # Nuestro Javascript
 │    ├── 📄 README.md                # Instrucciones o comentarios del proyecto
 │    ├── 📄 .gitignore               # Ficheros o carpetas a ignorar (lo que no nos interesa)
 :    └── 📄 package.json             # Fichero de información del proyecto

```

---
## Estructura de carpetas (II)
- Ojo algunos comandos pueden variar dependiendo del sistema operativo, en este caso se muestra para Linux/MacOS, para Windows se recomienda usar WSL o Git Bash.

<div class="grid">

```bash
# Forma fácil

cd workspace
mkdir project-name
cd project-name
pnpm init
mkdir src
touch src/index.html
touch src/index.css
touch src/index.js
touch README.md
touch .gitignore

```

```bash
# Forma pro
cd workspace
mkdir -p project-name/src
cd project-name
pnpm init
touch src/index.{html,css,js}
touch {README.md,.gitignore}

```
</div>

---
## Estructura de carpetas (III)

```bash
📁 project-name                  # Carpeta del proyecto
 ├── 📁 src                      # Código fuente editable
 │    ├── 📁 assets              # Ficheros estáticos
 │    │    ├── 📁 fonts          # Tipografías
 │    │    └── 📁 images         # Imágenes
 │    ├── 🟧 index.html          # Nuestro HTML
 │    ├── 📁 css                 # Carpeta de estilos
 │    │    └── 🟪 global.css     # Archivo CSS
 │    ├── 📁 modules             # Carpeta de modulos Javascript
 │    └── 🟨 main.js             # Javascript principal
 ├── 📄 README.md                # Instrucciones o comentarios del proyecto
 ├── 📄 .gitignore               # Ficheros o carpetas a ignorar (lo que no nos interesa)
 └── 📄 package.json             # Fichero de información del proyecto
```

---
## Trabajar con un servidor local

- Simular un entorno real en local
- Accesible desde [http://localhost:1234] (a veces 127.0.0.1 en vez de localhost)
- Actualización al hacer cambios

```bash
# Opción 1: servor (✅ rápido, ✅ ligero, ✅ sin dependencias)
pnpm add servor

pnpx servor src/ index.html 1234 --reload

# Opción 2: live-server (✅ rápido, ✅ ligero, ✅ sin dependencias)
pnpm add live-server
pnpx live-server src/ --port=1234

# Opción 3: vite 
pnpm add vite
pnpx vite --root src/ --port 1234
```

---
## Crear un proyecto con pnpm

- El fichero package.json
- El name en minúsculas, con guiones. Mismo nombre que la carpeta.
- Realmente, las dependencias que no participan en la web final, son de desarrollo.
<div class="grid">

```bash
# Inicializa. Crea `package.json`. ESM.
pnpm init
pnpm pkg set type=module

# Instala dependencias en node_modules/
pnpm add -D servor

# Desinstala dependencias
pnpm remove servor
```
```json
{
  "name": "project-name",
  "description": "My pet project",
  "type": "module",
  "author": "Alons",
  "devDependencies": {
    "servor": "^4.0.2",
  }
}
```
</div>

---
## Trabajar con dependencias

- Las dependencias se instalan en node_modules/
- Versionado: ``4.0.2`` → SemVer → Major, minor, patch
- Actualizaciones con ``pnpx npm-check -u npm-check``

<div class="grid">

```json
{
  "name": "project-name",
  "description": "My pet project",
  "type": "module",
  "author": "Alons",
  "devDependencies": {
    "servor": "^4.0.2",
  }
}
```
```bash
pnpm add servor             # ^4.x.x
pnpm add -E servor@4.0.2    # 4.0.2 (exacta)
pnpm add -D servor          # De desarrollo
pnpm add -g servor          # Global (evitar)
pnpx npm-check -u           # Actualizaciones

# Truco: añade siempre versiones exactas
echo "save-exact=true" >>.npmrc
```

</div>

---
## Uso de scripts

- Automatizar tareas comunes
- Definir comandos personalizados
- Añadelos en la propiedad scripts del package.json

```json
{
  "name": "project-name",
  "description": "My pet project",
  "type": "module",
  "author": "Alons",
  "devDependencies": {
    "servor": "^4.0.2",
  },
  "scripts": {
    "dev": "servor src/ index.html 1234 --reload",
    "build": "echo 'Build script'",
    "deploy": "echo 'Deploy script'"
  }
}
```
- Ahora, simplemente ejecutalos con su nombre: ``pnpm run dev``

---
<!-- _class: cover -->
<style scoped>
section {
  --cover: url(../assets/img_00052_.png);
}
</style>
# Git

---
## Git (I)
- ¿Qué es Git? Control de versiones de código
- Instalación de [Git-SCM](https://git-scm.com/downloads) (Windows) y cliente (WSL, Linux)

```bash
git --version

# Configuración inicial
git config --global user.name "Alons"
git config --global user.email "alons@example.com"
git config --global --list
```

---
## Git (II)
- Inicializar repositorio local con ``git init``
- Añadir y revisar cambios con ``git add <file>`` / ``git reset <file>``
- Guardar cambios en local con ``git commit`` 

<div class="grid">

```bash
# Vamos a la carpeta del proyecto
cd workspace/project-name

# Inicializamos repositorio git local
git init

# Comprobamos el estado
git status
```
```bash
# Añadimos nuevos ficheros
git add index.html
git add index.css

git status

# Guardamos los cambios
git commit -m "Add first files"
```

</div>

---
## Git (III)
- Consultar commits ``git log``
- Clonar un repositorio remoto ``git clone`` (vía HTTPS, solo cosas sencillas)



```bash
git clone https://github.com/MultimediosSG/intro-html
Clonando en 'intro-html'...
remote: Enumerating objects: 364, done.
remote: Counting objects: 100% (364/364), done.
remote: Compressing objects: 100% (303/303), done.
remote: Total 364 (delta 141), reused 281 (delta 58), pack-reused 0 (from 0)
Recibiendo objetos: 100% (364/364), 4.33 MiB | 5.47 MiB/s, listo.
Resolviendo deltas: 100% (141/141), listo.

git log --oneline
```

---
<!-- _class: cover -->
<style scoped>
section {
  --cover: url(../assets/img_00053_.png);
}
</style>
# Github

---
## GitHub (I)
- Crear repositorio en GitHub (remoto) -> A través de la web
- Añadir el repositorio remoto en local -> ``git remote``
- Subir al remoto -> ``git push``

```bash
# Añadimos origin (repo remoto) a main (rama principal local)
git remote add origin https://github.com/MultimediosSG/intro-html

# Si hay gente trabajando en el proyecto, traete siempre los cambios
git pull

# Subimos los cambios del repo local al remoto
# (las siguientes simplemente `git push`)
git push -u origin main
```

---
## GitHub (II)
- Crear clave privada + pública → [Añadir new SSH Key](https://github.com/settings/ssh/new) (type: Auth Key) y subir clave pública
- Opcional y recomendable: Añadir key al Agente SSH

<div class="grid">

```bash
ssh-keygen -t ed25519 -C "usuario@dominio.com"

# (Clave privada 🔑) -> Tu PC:
# /home/usuario/.ssh/id_ed25519

# (Clave pública 🔒) -> GitHub:
# /home/usuario/.ssh/id_ed25519.pub
```

```bash
# Añadir clave al agente SSH
cat /home/usuario/.ssh/id_ed25519.pub
ssh-ed25519 ############################ Usuario@dominio.com

# A partir de ahora, mejor así:
git remote add origin git@github.com:MultimediosSG/intro-html.git
git clone git@github.com:MultimediosSG/intro-html.git
```

</div>

---
## GitHub (III)
- Automatizar tareas de GitHub: [GitHub CLI](https://cli.github.com/)
- Ejemplo: ``gh repo create``

```bash
# Crea un repositorio público de la carpeta actual, usando el origin
gh repo create --public MultimediosSG/nombre-de-repo --source . --remote origin

# Ver si existen PR (pull request)
gh pr view

# Echa un vistazo al repositorio
gh repo view
```

---
## GitHub (IV)
En Git hay muchas formas de hacer las cosas
Por ejemplo, deshacer commits
<table>
<thead>
<tr>
<th>Comando</th>
<th>Modifica último commit</th>
<th>Descripción</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>git commit --amend</code></td>
<td>✅ Sí</td>
<td>Reescribe último commit añadiendo lo nuevo</td>
</tr>
<tr>
<td><code>git reset HEAD~1</code></td>
<td>✅ Sí</td>
<td>Mantiene los cambios en la carpeta (sin vigilar)</td>
</tr>
<tr>
<td><code>git reset --soft HEAD~1</code></td>
<td>✅ Sí</td>
<td>Mantiene los cambios en la carpeta (vigilando)</td>
</tr>
<tr>
<td><code>git reset --hard HEAD~1</code></td>
<td>✅ Sí</td>
<td>Se pierden los cambios en la carpeta</td>
</tr>
<tr>
<td><code>git revert</code></td>
<td>❌ No</td>
<td>Añade nuevo commit deshaciendo el último</td>
</tr>
</tbody>
</table>

- ``*HEAD~1`` significa «el commit anterior al que estás ahora»

---
## GitHub (V)

- Ramas (bifurcaciones): Caminos donde hay variaciones, nuevos desarrollos y/o alternativas.
- Saltar entre ramas para revisar git checkout
- Cambiar a ramas concretas git switch

<div class="grid">

```bash
# Saltar a una rama concreta (para revisar)
git log
git checkout <id-commit>

git switch main  # Vuelve a la rama principal

git switch -c nombre-nueva-rama <id-commit>
git branch -d nombre-rama  # Borra rama local
git push origin --delete nombre-rama # remota
```
```bash
# Crea nueva rama desde donde estás
git switch -c nombre-rama

# Vamos a main y traemos cambios remotos
git switch main
git pull origin main

# Mezclamos la rama con nuestro main
git merge nombre-rama
```

</div>

---
<!-- _class: cover -->
<style scoped>
section {
  --cover: url(../assets/img_00054_.png);
}
</style>
# GitHub Pages
---
## Despliegue en GitHub Pages

- Código fuente: ``github.com/user/repo``, GitHub Pages (webs alojadas): ``user.github.io/repo``
- Solo frontend (no backend o bases de datos)
- Más adelante, la carpeta a desplegar no será ``src/`` sino ``dist/``

```bash
# Instalamos comando para desplegar
pnpm add -D gh-pages

# Despliegue en la rama `gh-pages`
gh-pages -d src

# Buena idea: añadirlo en package.json (en scripts)
{
  "deploy": "gh-pages -d src/"
}
```

---
## Referencias
- [bootcamp.manz.dev](https://bootcamp.manz.dev/)
- [GitHub CLI](https://cli.github.com/)
- [GitHub Pages](https://pages.github.com/)
- [Node.js](https://nodejs.org/)

---


