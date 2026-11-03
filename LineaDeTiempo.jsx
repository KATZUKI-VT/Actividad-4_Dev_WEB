import { rangoFechas, duracion } from '../utils/fechas.js';

// Experiencias en orden cronológico inverso (la API ya las ordena por fechaInicio desc).
export default function LineaDeTiempo({ experiencias }) {
  return (
    <ol className="linea">
      {experiencias.map(exp => (
        <li key={exp._id} className="linea__item">
          <div className="linea__fechas">
            <span>{rangoFechas(exp.fechaInicio, exp.fechaFin)}</span>
            <span className="linea__duracion">{duracion(exp.fechaInicio, exp.fechaFin)}</span>
          </div>
          <div className="linea__cuerpo">
            <h3>
              {exp.cargo}
              {!exp.fechaFin && <span className="etiqueta">Actual</span>}
            </h3>
            <p className="linea__empresa">{exp.empresa}</p>
            <p className="linea__descripcion">{exp.descripcion}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
