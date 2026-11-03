import { useEffect, useState } from 'react';
import { esFechaValida } from '../utils/fechas.js';

const VACIO = { empresa: '', cargo: '', descripcion: '', fechaInicio: '', fechaFin: '' };
const MAX = 2000;

// Mismas reglas que valida la API, para avisar antes de enviar.
function validar(datos, actual) {
  const errores = {};
  if (!datos.empresa.trim()) errores.empresa = 'La empresa es obligatoria.';
  if (!datos.cargo.trim()) errores.cargo = 'El cargo es obligatorio.';
  if (!datos.descripcion.trim()) errores.descripcion = 'La descripción es obligatoria.';
  for (const campo of ['empresa', 'cargo', 'descripcion']) {
    if (datos[campo].length > MAX) errores[campo] = `Máximo ${MAX} caracteres.`;
  }
  if (!esFechaValida(datos.fechaInicio)) errores.fechaInicio = 'Indica una fecha de inicio válida.';
  if (!actual) {
    if (!esFechaValida(datos.fechaFin)) errores.fechaFin = 'Indica la fecha de fin o marca “Trabajo aquí actualmente”.';
    else if (datos.fechaInicio && datos.fechaFin < datos.fechaInicio) errores.fechaFin = 'No puede ser anterior a la fecha de inicio.';
  }
  return errores;
}

export default function ExperienciaForm({ experiencia, onGuardar, onCancelar, guardando }) {
  const editando = Boolean(experiencia);
  const [datos, setDatos] = useState(VACIO);
  const [actual, setActual] = useState(false);
  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (experiencia) {
      setDatos({ ...VACIO, ...experiencia, fechaFin: experiencia.fechaFin ?? '' });
      setActual(!experiencia.fechaFin);
    } else {
      setDatos(VACIO);
      setActual(false);
    }
    setErrores({});
  }, [experiencia]);

  const cambiar = e => {
    const { name, value } = e.target;
    setDatos(prev => ({ ...prev, [name]: value }));
    if (errores[name]) setErrores(prev => ({ ...prev, [name]: undefined }));
  };

  const enviar = async e => {
    e.preventDefault();
    const encontrados = validar(datos, actual);
    setErrores(encontrados);
    if (Object.keys(encontrados).length) return;
    const ok = await onGuardar({
      empresa: datos.empresa.trim(),
      cargo: datos.cargo.trim(),
      descripcion: datos.descripcion.trim(),
      fechaInicio: datos.fechaInicio,
      fechaFin: actual ? null : datos.fechaFin,
    });
    if (ok && !editando) {
      setDatos(VACIO);
      setActual(false);
    }
  };

  const campo = (nombre, etiqueta, props = {}) => (
    <div className={`campo ${errores[nombre] ? 'campo--error' : ''}`}>
      <label htmlFor={nombre}>{etiqueta}</label>
      {props.as === 'textarea' ? (
        <textarea id={nombre} name={nombre} value={datos[nombre]} onChange={cambiar} rows={5} maxLength={MAX}
          aria-invalid={Boolean(errores[nombre])} aria-describedby={errores[nombre] ? `${nombre}-error` : undefined} />
      ) : (
        <input id={nombre} name={nombre} value={datos[nombre]} onChange={cambiar} type={props.type || 'text'}
          maxLength={props.type ? undefined : MAX} disabled={props.disabled}
          aria-invalid={Boolean(errores[nombre])} aria-describedby={errores[nombre] ? `${nombre}-error` : undefined} />
      )}
      {errores[nombre] && <span id={`${nombre}-error`} className="campo__error">{errores[nombre]}</span>}
    </div>
  );

  return (
    <form className="formulario" onSubmit={enviar} noValidate>
      <h2>{editando ? 'Editar experiencia' : 'Nueva experiencia'}</h2>
      {campo('empresa', 'Empresa')}
      {campo('cargo', 'Cargo')}
      {campo('descripcion', 'Descripción de funciones y logros', { as: 'textarea' })}
      <div className="formulario__fechas">
        {campo('fechaInicio', 'Fecha de inicio', { type: 'date' })}
        {campo('fechaFin', 'Fecha de fin', { type: 'date', disabled: actual })}
      </div>
      <label className="casilla">
        <input
          type="checkbox"
          checked={actual}
          onChange={e => {
            setActual(e.target.checked);
            setErrores(prev => ({ ...prev, fechaFin: undefined }));
          }}
        />
        Trabajo aquí actualmente
      </label>
      <div className="formulario__acciones">
        <button type="submit" className="boton boton--primario" disabled={guardando}>
          {guardando ? 'Guardando…' : editando ? 'Guardar cambios' : 'Agregar experiencia'}
        </button>
        {editando && (
          <button type="button" className="boton" onClick={onCancelar} disabled={guardando}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
