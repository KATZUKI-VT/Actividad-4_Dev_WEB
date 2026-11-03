import { useCallback, useEffect, useState } from 'react';
import {
  listarExperiencias,
  crearExperiencia,
  actualizarExperiencia,
  eliminarExperiencia,
} from '../api/experiencias.js';
import ExperienciaForm from '../components/ExperienciaForm.jsx';
import Aviso from '../components/Aviso.jsx';
import { rangoFechas } from '../utils/fechas.js';

export default function Admin() {
  const [experiencias, setExperiencias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [eliminandoId, setEliminandoId] = useState(null);
  const [editando, setEditando] = useState(null);
  const [aviso, setAviso] = useState(null);

  // READ: lista todas las experiencias (GET /api/experiencias)
  const cargar = useCallback(async () => {
    setCargando(true);
    try {
      setExperiencias(await listarExperiencias());
    } catch (err) {
      setAviso({ tipo: 'error', texto: err.message });
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => { cargar(); }, [cargar]);

  // CREATE (POST) y UPDATE (PUT)
  const guardar = async datos => {
    setGuardando(true);
    setAviso(null);
    try {
      if (editando) {
        await actualizarExperiencia(editando._id, datos);
        setAviso({ tipo: 'exito', texto: `Se actualizó “${datos.cargo}” en ${datos.empresa}.` });
        setEditando(null);
      } else {
        await crearExperiencia(datos);
        setAviso({ tipo: 'exito', texto: `Se agregó “${datos.cargo}” en ${datos.empresa}.` });
      }
      await cargar();
      return true;
    } catch (err) {
      setAviso({ tipo: 'error', texto: err.message });
      return false;
    } finally {
      setGuardando(false);
    }
  };

  // DELETE
  const eliminar = async exp => {
    if (!window.confirm(`¿Eliminar la experiencia “${exp.cargo}” en ${exp.empresa}? Esta acción no se puede deshacer.`)) return;
    setEliminandoId(exp._id);
    setAviso(null);
    try {
      await eliminarExperiencia(exp._id);
      if (editando?._id === exp._id) setEditando(null);
      setAviso({ tipo: 'exito', texto: `Se eliminó “${exp.cargo}” en ${exp.empresa}.` });
      await cargar();
    } catch (err) {
      setAviso({ tipo: 'error', texto: err.message });
    } finally {
      setEliminandoId(null);
    }
  };

  const editar = exp => {
    setEditando(exp);
    setAviso(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="contenedor admin">
      <div className="admin__encabezado">
        <div>
          <p className="cv__sobretitulo">Espacio administrativo</p>
          <h1>Experiencias profesionales</h1>
          <p className="tenue">Los cambios se guardan en MongoDB a través de la API y se reflejan en la hoja de vida.</p>
        </div>
        <button type="button" className="boton" onClick={cargar} disabled={cargando}>
          {cargando ? 'Actualizando…' : 'Recargar'}
        </button>
      </div>

      {aviso && <Aviso tipo={aviso.tipo} onCerrar={() => setAviso(null)}>{aviso.texto}</Aviso>}

      <div className="admin__rejilla">
        <ExperienciaForm
          experiencia={editando}
          onGuardar={guardar}
          onCancelar={() => setEditando(null)}
          guardando={guardando}
        />

        <section className="tabla-contenedor" aria-labelledby="titulo-registros">
          <h2 id="titulo-registros">
            Registros <span className="contador">{experiencias.length}</span>
          </h2>
          {!cargando && experiencias.length === 0 && (
            <p className="vacio">No hay experiencias. Usa el formulario para agregar la primera.</p>
          )}
          {experiencias.length > 0 && (
            <table className="tabla">
              <thead>
                <tr>
                  <th scope="col">Cargo y empresa</th>
                  <th scope="col">Periodo</th>
                  <th scope="col"><span className="solo-lectores">Acciones</span></th>
                </tr>
              </thead>
              <tbody>
                {experiencias.map(exp => (
                  <tr key={exp._id} className={editando?._id === exp._id ? 'fila--editando' : ''}>
                    <td data-etiqueta="Cargo">
                      <strong>{exp.cargo}</strong>
                      <span className="tenue">{exp.empresa}</span>
                    </td>
                    <td data-etiqueta="Periodo">{rangoFechas(exp.fechaInicio, exp.fechaFin)}</td>
                    <td className="tabla__acciones">
                      <button type="button" className="boton boton--chico" onClick={() => editar(exp)}>
                        Editar
                      </button>
                      <button
                        type="button"
                        className="boton boton--chico boton--peligro"
                        onClick={() => eliminar(exp)}
                        disabled={eliminandoId === exp._id}
                      >
                        {eliminandoId === exp._id ? 'Eliminando…' : 'Eliminar'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </div>
  );
}
