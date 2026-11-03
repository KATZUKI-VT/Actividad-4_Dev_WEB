// Cliente de la API REST de la unidad 3.
// Endpoints: GET/POST /api/experiencias · GET/PUT/DELETE /api/experiencias/:id
const BASE = '/api/experiencias';

// La API rechaza campos desconocidos (como _id), así que solo se envían estos.
const CAMPOS = ['empresa', 'cargo', 'descripcion', 'fechaInicio', 'fechaFin'];

function limpiar(experiencia) {
  return Object.fromEntries(CAMPOS.map(campo => [campo, experiencia[campo] ?? null]));
}

async function peticion(url, opciones = {}) {
  let respuesta;
  try {
    respuesta = await fetch(url, {
      ...opciones,
      headers: { 'Content-Type': 'application/json', ...opciones.headers },
    });
  } catch {
    throw new Error('No se pudo conectar con la API. Verifica que esté en ejecución (npm start en el proyecto de la unidad 3).');
  }

  if (respuesta.status === 204) return null;

  const texto = await respuesta.text();
  let datos = null;
  try {
    datos = texto ? JSON.parse(texto) : null;
  } catch {
    // Respuesta no JSON: normalmente el proxy no encontró la API.
  }

  if (!respuesta.ok) {
    const mensaje = datos?.error
      || (respuesta.status >= 500 ? 'La API no responde. ¿Está corriendo en el puerto 3000 y conectada a MongoDB?' : `Error ${respuesta.status}`);
    throw new Error(mensaje);
  }
  if (datos === null) {
    throw new Error('La API devolvió una respuesta inesperada. Revisa API_TARGET en el archivo .env.');
  }
  return datos;
}

export const listarExperiencias = () => peticion(BASE);

export const obtenerExperiencia = id => peticion(`${BASE}/${id}`);

export const crearExperiencia = experiencia =>
  peticion(BASE, { method: 'POST', body: JSON.stringify(limpiar(experiencia)) });

export const actualizarExperiencia = (id, experiencia) =>
  peticion(`${BASE}/${id}`, { method: 'PUT', body: JSON.stringify(limpiar(experiencia)) });

export const eliminarExperiencia = id => peticion(`${BASE}/${id}`, { method: 'DELETE' });
