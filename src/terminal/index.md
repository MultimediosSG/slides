---
marp: true
theme: alo
paginate: true
---

<!-- _class: cover -->
<style scoped>
section {
  --cover: url(../assets/img_00008_terminal.png);
}
</style>
#  Terminal
## Contenidos
- Crear entorno de desarrollo
- WSL (Solo usuarios de Windows)
- Seguridad (Gestor de contraseñas)
- Shell (fish) + Comandos
- VSCode (Editor de código)
- Creación de scripts


> Inspirado en el bootcamp de <br><strong>Manz.dev</strong> todos los créditos a el.


---

## Preparar terminal
- [Windows Terminal](https://apps.microsoft.com/store/detail/windows-terminal/9N0DX20HK701)
- [Nerd Fonts](https://www.nerdfonts.com/)

## Modalidades en Windows
- **Terminal de Windows:** CMD / PowerShell
- **Terminal de Linux:** WSL (Linux)


---

## WSL (Windows Subsystem for Linux)


```bash
# Instaladas
wsl --list

# Para descargar e instalar
wsl --list --online

# Instalar Debian
wsl --install -d Debian
```

- Si tienes problemas con la [instalación](https://terminaldelinux.com/terminal/wsl/instalacion-wsl/) o [problemas](https://terminaldelinux.com/terminal/wsl/configuracion-wsl/)





---
## Gestores de contraseñas
- [BitWarden](https://bitwarden.com/)
- [Proton](https://proton.me/)
- [PearPass](https://pass.pears.com/)

Necesitas dar permisos a tu usuario:

```bash
# En la terminal de Windows:
wsl -u root

# En WSL escribimos:
apt update && apt install sudo curl git wget
usermod -aG sudo alo
exit
```

---
## Personalizando Shell
- Bash por defecto (mínima)
- [Fish](https://terminaldelinux.com/terminal/preparacion-entorno/instalacion-fish/) más cómoda y amigable (recomendable)

<steps>
<step>

```bash
# Actualizar repositorios
sudo apt update

# Instalar curl + fish
sudo apt install curl fish

# Establecer fish por defecto
chsh -s $(which fish)
```
</step>
<step>

```bash
# Instalar fisher (instalador de complementos de fish)
curl -sL https://raw.githubusercontent.com/jorgebucaran/fisher/main/functions/fisher.fish | source
fisher install jorgebucaran/fisher

# Instalar tide (framework de fish)
fisher install IlanCosman/tide@v6
```
</step>
</steps>


---
<!-- _class: cover -->
<style scoped>
section {
  --cover: url(../assets/img_00006_terminal.png);
}
</style>
# Comandos

---
## Carpetas en Linux
- Estructura de [carpetas](https://terminaldelinux.com/terminal/ficheros/carpetas-directorios-linux/)
- Comando ``pwd`` (¿Dónde estoy?)

```bash
📂 /                              # Carpeta raíz de todo
   📂 home/                       # Carpeta de usuarios
      📂 alo/                    # Usuario alo
         📂 .config/              # Configuración del usuario alo
            📂 fish/
            📄 config.fish
   📂 etc/                        # Configuración del sistema
   📂 var/                        # Logs y otros ficheros
   📂 tmp/                        # Ficheros temporales
   📂 root/                       # Usuario root (administrador)
```



---
## Comandos de terminal
- [Cheatsheet de comandos de terminal](https://terminaldelinux.com/terminal/cheatsheets/)
- Moverte en rutas:

```bash
# Mover de forma absoluta
cd /
cd /home/alo
cd /etc

# Mover de forma relativa
cd ..
cd home && cd alo
cd .. && cd .. && cd etc
```

---
## Comandos de terminal

```bash
# Crea carpetas y ficheros
mkdir carpeta
mkdir -p carpeta/subcarpeta
touch file

# ¿Dónde estoy?
pwd

cd carpeta
cd ..
z fragmento
```

- [zoxide](https://github.com/ajeetdsouza/zoxide)

---

## Comandos de terminal

```bash
# Mostrar archivos y carpetas
ls -lh
eza --icons --tree -lh

# Renombrar/Mover, copiar y eliminar
mv origen destino
cp origen destino
rm fichero

# ¿Donde está un ejecutable?
which file
```

- [eza](https://github.com/eza-community/eza)

---

## Comandos de terminal

```bash
# Buscar ficheros
find -name *png
fdfind fragmento

# File managers
ytree
broot
lf
```

- [fd-find](https://github.com/sharkdp/fd)
- [lf](https://github.com/gokcehan/lf)

---
# Comandos de terminal

<split-slide style="--left: 50%; --right: 50%; --font-size: 1rem;">

```bash
# Mostrar el contenido de un fichero
cat file.txt

# Muchas veces, se usa con paginador
# Opciones: more, less, most
cat file.txt | more

# Bat: Mejora de `cat`
batcat file.txt
```

```bash
# Buscar coincidencias en un fichero
grep "texto" file.txt

# Buscar lineas que no coincidan
grep -v "texto" file.txt

# Filtrar con fzf
fzf
ls -lh | fzf
```
</split-slide>

- [fzf](https://github.com/junegunn/fzf)



---
## Editores de texto

```bash
# Editores básicos
nano file.txt
nvim file.txt
echo "contenido" >file.txt

# Editores más complejos
micro file.txt
fresh file.txt
```

- [fresh-editor](https://getfresh.dev/)



---
<!-- _class: cover -->
<style scoped>
section {
  --cover: url(../assets/img_00009_terminal.png);
}
</style>
# Visual Studio Code


---
## Visual Studio Code
- [Visual Studio Code](https://code.visualstudio.com/)
- [Visual Studio Codium](https://vscodium.com/)

## Forks con IA 
- Cursor
- Antigravity
- TRAE
- Bolt
- Agentes

---
## Visual Studio Code
- Conectar vía WSL (esquina inferior izquierda)
- [Extensiones y temas](https://terminaldelinux.com/terminal/preparacion-entorno/instalar-vscode/) para VSCode
- Panel de VSCode: ``Pulsa CTRL+ SHIFT + P``
- Opciones de VSCode: Busca ``Open User Settings (JSON)``

## Comando code

```bash
cd workspace
mkdir project
code .
```


---
## Visual Studio Code (Configuración)


```json
{
  "editor.fontSize": 16,
  "editor.fontFamily": "Fira Code, Cascadia Code, monospace",
  "editor.fontLigatures": true,
  "editor.lineHeight": 1.5,
  "editor.tabSize": 2,
  "editor.wordWrap": "on",
  "editor.minimap.enabled": false,
  "workbench.colorTheme": "Ayu Mirage",
  "workbench.iconTheme": "vscode-icons",
  "terminal.integrated.fontSize": 14,
  "terminal.integrated.fontFamily": "'Fira Code', 'Cascadia Code', monospace",
}
```


---
## Visual Studio Code (Desactivar IA)

En fases muy tempranas, aconsejo desactivar IA.
  - Evitarás abrumarte
  - Te centrarás en usar IA sólo para entender conceptos
  - Cuando tengas soltura, activa la IA para mejorar productividad



```json
{
  "chat.disableAIFeatures": true,
}
```
 
---
## Crear scripts
- Dominar rutas + editor de terminal + Shebang! + Ejecutar el script
- Truco: Guarda o mueve los scripts a ``/usr/local/bin``



```bash
nano saludo

#!/bin/bash
echo "╭────────╮" | lolcat
echo "│ ◕ ‿  ◕ │ ¡Saludos, Alo!" | lolcat
echo "╰───┬─┬──╯" | lolcat

chmod +x saludo
./saludo
 ```
 <div>

- Más sobre [crear scripts](https://terminaldelinux.com/terminal/automatizacion/crear-scripts/)


---
## Crear alias
- Pequeños comandos muy usados
- No merece crear un script

```bash
# Creamos alias
funced take
take> function take
           mkdir -p $argv && cd $argv
      end

# Si funciona bien, guardamos de forma permanente
funcsave take
 ```



---
<!-- _class: cover -->
<style scoped>
section {
  --cover: url(../assets/img_00006_terminal.png);
}
</style>
## Preguntas




<script src="../assets/steps.js"></script>
<script src="../assets/image-modal.js"></script>
