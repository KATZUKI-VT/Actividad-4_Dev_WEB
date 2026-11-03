# Actividad-4_Dev_WEB

Hoja de vida migrada a **React** (con Vite) e integrada con un **espacio administrativo** que gestiona, mediante un CRUD, las experiencias profesionales consumiendo la API REST desarrollada en la unidad 3 ([Actividad-3_Dev_WEB](https://github.com/KATZUKI-VT/Actividad-3_Dev_WEB)).

- **Hoja de vida** (`#/`): perfil, educación, habilidades e idiomas, más la sección de experiencia profesional, que se carga desde la API.
- **Administración** (`#/admin`): formulario y tabla para crear, listar, editar y eliminar experiencias.

## Cómo se relaciona con la API de la unidad 3

| Acción en el panel | Petición a la API | Respuesta esperada |
|---|---|---|
| Cargar lista / hoja de vida | `GET /api/experiencias` | 200 |
| Agregar experiencia | `POST /api/experiencias` | 201 |
| Guardar cambios | `PUT /api/experiencias/{id}` | 200 |
| Eliminar | `DELETE /api/experiencias/{id}` | 204 |

El formulario aplica las mismas reglas que la API (empresa, cargo y descripción obligatorios; fechas `YYYY-MM-DD`; la fecha de fin no puede ser anterior al inicio; “Trabajo aquí actualmente” envía `fechaFin: null`). Si la API rechaza algo, el mensaje de error que devuelve se muestra en pantalla.

La API de la unidad 3 no habilita CORS, por eso el servidor de Vite actúa como **proxy**: el navegador pide `/api/...` a Vite y Vite lo reenvía a `http://localhost:3000`. No hay que modificar la API.

## Requisitos

- Node.js 20 o superior
- La API de la unidad 3 funcionando con MongoDB (local o Atlas)

## Ejecutar

1. Inicia la API de la unidad 3 (en su propia carpeta):

   ```powershell
   cd Actividad-3_Dev_WEB
   npm install
   docker compose up -d   # solo si usas MongoDB con Docker
   npm start              # queda en http://localhost:3000
   ```

2. En otra terminal, inicia este proyecto:

   ```powershell
   cd Actividad-4_Dev_WEB
   npm install
   npm run dev
   ```

3. Abre http://localhost:5173 (hoja de vida) y http://localhost:5173/#/admin (panel).

Si la API corre en otro puerto o servidor, copia `.env.example` a `.env` y cambia `API_TARGET`.

Para una versión optimizada: `npm run build` y luego `npm run preview` (http://localhost:4173, también con proxy hacia la API).

## Estructura

```
src/
├── api/experiencias.js        # Cliente de la API (fetch): listar, crear, actualizar, eliminar
├── components/
│   ├── Navbar.jsx             # Navegación entre hoja de vida y administración
│   ├── LineaDeTiempo.jsx      # Experiencias en la hoja de vida
│   ├── ExperienciaForm.jsx    # Formulario de crear/editar con validación
│   └── Aviso.jsx              # Mensajes de éxito y error
├── pages/
│   ├── HojaDeVida.jsx         # Página pública
│   └── Admin.jsx              # Panel CRUD
├── data/perfil.js             # Datos fijos de la hoja de vida (editar aquí)
├── utils/fechas.js            # Formato de fechas y duración
├── App.jsx                    # Enrutamiento por hash (#/ y #/admin)
├── main.jsx
└── styles.css                 # Estilos y diseño responsive
```

## Prueba sugerida para la evidencia

1. Con la API corriendo, abre **Administración** y agrega una experiencia. Debe aparecer en la tabla y en **Hoja de vida**.
2. Pulsa **Editar**, cambia el cargo o marca “Trabajo aquí actualmente” y guarda. La hoja de vida muestra el cambio y la etiqueta “Actual”.
3. Pulsa **Eliminar** y confirma. El registro desaparece de ambas vistas.
4. Intenta guardar con campos vacíos o con fecha de fin anterior al inicio: el formulario muestra el error.
5. Abre Swagger de la API (http://localhost:3000/docs) y ejecuta `GET /api/experiencias` para comprobar que los datos son los mismos de MongoDB.

Toma capturas de estos pasos como evidencia de la entrega.

## Nota

El panel administrativo no tiene inicio de sesión porque la API de la unidad 3 no implementa autenticación; es una actividad académica para uso local.
