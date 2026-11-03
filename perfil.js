// Contenido fijo de la hoja de vida (el de las unidades anteriores).
// Las experiencias profesionales NO están aquí: se cargan desde la API.
// Ajusta estos datos con la información de tu hoja de vida original.
export const perfil = {
  nombre: 'Jorge Andrés Flórez García',
  titulo: 'Desarrollador de software web',
  ubicacion: 'Cartagena, Colombia',
  resumen:
    'Estudiante de cuarto semestre del programa de Desarrollo de Software Web de la Universidad de Cartagena. '
    + 'Me interesa construir aplicaciones web completas: interfaces claras en el navegador y APIs REST bien '
    + 'documentadas en el servidor, con Node.js, Express y MongoDB.',
  contacto: [
    { etiqueta: 'Correo', valor: 'tu-correo@ejemplo.com', enlace: 'mailto:tu-correo@ejemplo.com' },
    { etiqueta: 'GitHub', valor: 'github.com/KATZUKI-VT', enlace: 'https://github.com/KATZUKI-VT' },
    { etiqueta: 'LinkedIn', valor: 'linkedin.com/in/tu-usuario', enlace: 'https://www.linkedin.com/' },
  ],
  educacion: [
    {
      titulo: 'Desarrollo de Software Web',
      institucion: 'Universidad de Cartagena · CTEV',
      periodo: 'En curso · IV semestre',
    },
  ],
  habilidades: [
    { grupo: 'Frontend', items: ['HTML5', 'CSS3', 'JavaScript', 'React'] },
    { grupo: 'Backend', items: ['Node.js', 'Express.js', 'APIs REST', 'Swagger / OpenAPI'] },
    { grupo: 'Datos y herramientas', items: ['MongoDB', 'Git y GitHub', 'Docker', 'Vite'] },
  ],
  idiomas: [
    { idioma: 'Español', nivel: 'Nativo' },
    { idioma: 'Inglés', nivel: 'Intermedio' },
  ],
};
