# LeadVenture — Documentación de Web Components

Este repositorio contiene el código de una página web cuyo objetivo es **documentar y centralizar los web components que usamos día a día en el equipo**.

- **Un ejemplo funcional por componente.** Cada componente documentado aquí debe venir acompañado de un ejemplo de uso real: el código con el que se invoca, y el resultado visual (o una descripción de cómo se ve y se comporta) para que cualquiera pueda copiarlo y usarlo sin adivinar.
- **Crece de forma colaborativa.** No es un catálogo cerrado ni mantenido por una sola persona: cualquiera del equipo puede agregar componentes o herramientas nuevas con el tiempo, siguiendo la misma estructura que ya existe.
- **Estructura del proyecto.** Basado en cómo está organizado el repo hoy:

  ```text
  /
  ├── public/              # Assets estáticos (favicons, imágenes, etc.)
  ├── src/
  │   ├── components/      # Aquí vive cada web component (uno por archivo)
  │   ├── layouts/         # Layouts compartidos entre páginas (ej. Layout.astro)
  │   ├── pages/           # Rutas del sitio; aquí se documenta y se muestra el ejemplo de cada componente
  │   └── styles/          # Estilos globales (Tailwind)
  └── package.json
  ```

  - **Dónde va un componente nuevo:** en `src/components/`, un archivo por componente.
  - **Cómo se nombra:** PascalCase para el nombre del archivo y del componente (ej. `Counter.tsx`), igual que el ejemplo ya presente en el repo.
  - **Dónde va su ejemplo de uso:** en una página dentro de `src/pages/` que lo importe y lo muestre en funcionamiento, tal como hace `src/pages/index.astro` con `Counter.tsx`.

## Guía de Git para principiantes

Este tutorial es para quien **nunca ha usado Git ni la terminal**. Sigue los pasos en orden; cada bloque de código muestra el comando exacto que debes escribir y presionar Enter.

### 1. ¿Qué es Git y qué es un repositorio?

Git es un programa que guarda un historial de todos los cambios que se hacen a los archivos de un proyecto, como si fuera una máquina del tiempo: puedes ver quién cambió qué y cuándo, y regresar a versiones anteriores si algo sale mal. Un **repositorio** (o "repo") es simplemente la carpeta del proyecto que Git está vigilando, junto con todo ese historial.

### 2. Clonar el repositorio

"Clonar" significa descargar una copia del repositorio a tu computadora.

Para obtener la URL en GitHub: entra a la página del repositorio, haz clic en el botón verde **"Code"**, y copia la URL que aparece (elige HTTPS si no usas llaves SSH).

```sh
git clone https://github.com/tu-organizacion/nombre-del-repo.git
cd nombre-del-repo
```

### 3. Revisar el estado de tus cambios

Este comando te dice qué archivos modificaste, cuáles son nuevos y en qué rama estás. Úsalo seguido, no tiene efectos secundarios.

```sh
git status
```

### 4. Crear una rama nueva antes de trabajar

Una "rama" (branch) es una copia paralela del proyecto donde puedes hacer cambios sin afectar la versión principal (`main`). **Nunca se trabaja directo en `main`** porque esa rama debe reflejar siempre el código que ya funciona y está aprobado; si todos trabajaran ahí directo, sería fácil romper el proyecto para todo el equipo por accidente.

```sh
git checkout -b nombre-rama
```

(equivalente moderno: `git switch -c nombre-rama`)

Usa un nombre descriptivo, por ejemplo `agrega-componente-modal` o `fix-boton-counter`.

### 5. Agregar archivos al staging

"Staging" es la zona donde pones los archivos que quieres incluir en tu próximo commit. Para un archivo específico:

```sh
git add archivo.tsx
```

Para agregar todos los archivos que modificaste:

```sh
git add .
```

### 6. Hacer un commit

Un commit es una "foto" guardada de los cambios que agregaste al staging, con un mensaje explicando qué hiciste.

```sh
git commit -m "Agrega componente Modal con ejemplo de uso"
```

Buenas prácticas para el mensaje:
- Que sea claro y describa el "qué", no cosas obvias como "cambios".
- Que esté en presente ("Agrega...", "Corrige...", no "Agregué...").
- Un commit = un cambio con sentido propio, no mezcles cosas sin relación.

### 7. Subir los cambios

```sh
git push
```

Si es la primera vez que subes esta rama nueva, Git no sabe a dónde mandarla, así que debes indicárselo:

```sh
git push -u origin nombre-rama
```

Después de esa primera vez, con `git push` a secas es suficiente.

### 8. Crear un Pull Request (PR) en GitHub

Un Pull Request es una solicitud para que tus cambios se unan a `main`, y le da al equipo la oportunidad de revisarlos antes.

1. Entra a la página del repositorio en GitHub.
2. Verás un aviso amarillo con el nombre de tu rama y un botón **"Compare & pull request"** — haz clic ahí (si no aparece, ve a la pestaña **"Pull requests"** y luego **"New pull request"**, y elige tu rama).
3. Escribe un **título** claro y corto que resuma el cambio.
4. En la **descripción**, explica qué hiciste y por qué (por ejemplo: qué componente agregaste, cómo probarlo).
5. En el panel derecho, en **"Reviewers"**, haz clic y elige a la persona del equipo que debe revisar tu código.
6. Haz clic en **"Create pull request"**.

### 9. Si piden cambios en el PR

Si un reviewer deja comentarios pidiendo ajustes, no necesitas crear un PR nuevo: solo edita los archivos en tu misma rama local y repite el flujo de siempre.

```sh
git add .
git commit -m "Ajusta espaciado del Modal según feedback del review"
git push
```

Estos commits nuevos se agregan automáticamente al mismo Pull Request.

### 10. Actualizar tu rama local con los últimos cambios de main

Antes de seguir trabajando (o si tu rama lleva varios días abierta), conviene traer lo último de `main` para evitar sorpresas.

La forma más simple:

```sh
git checkout main
git pull origin main
```

O si ya estás en tu rama y quieres traer los cambios de `main` sin cambiar de rama:

```sh
git fetch origin
git merge origin/main
```

### 11. Después de que el PR se aprueba y se mergea

```sh
git checkout main
git pull origin main
git branch -d nombre-rama
git push origin --delete nombre-rama
```

Esto te regresa a `main` actualizado, borra tu rama local (`-d`) y borra la rama remota en GitHub.

### 12. Errores comunes y cómo resolverlos

- **Conflicto de merge:** pasa cuando dos personas modificaron las mismas líneas de un archivo. Git marca el archivo con símbolos `<<<<<<<`, `=======` y `>>>>>>>`. Abre el archivo, decide qué parte del código quedarse (o combina ambas), borra esos símbolos, guarda, y luego:
  ```sh
  git add archivo-en-conflicto.tsx
  git commit -m "Resuelve conflicto de merge"
  ```
- **Olvidaste hacer pull antes de empezar a trabajar:** si `git push` te rechaza con un mensaje de que hay cambios remotos que no tienes, trae primero esos cambios y luego intenta de nuevo:
  ```sh
  git pull origin nombre-rama
  git push
  ```
- **Hiciste commits en la rama equivocada (por ejemplo, en `main`):** crea una rama nueva desde ahí para no perder tu trabajo, y luego regresa `main` a como estaba:
  ```sh
  git checkout -b rama-correcta
  git checkout main
  git reset --hard origin/main
  ```
  (el primer comando ya se llevó tus commits a `rama-correcta`, así que no se pierden).

---

# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
