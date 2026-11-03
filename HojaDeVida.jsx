import { useEffect, useState } from 'react';
import { listarExperiencias } from '../api/experiencias.js';
import { perfil } from '../data/perfil.js';
import LineaDeTiempo from '../components/LineaDeTiempo.jsx';
import Aviso from '../components/Aviso.jsx';

export default function HojaDeVida() {
  const [experiencias, setExperiencias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let activo = true;
    listarExperiencias()
      .then(datos => activo && setExperiencias(datos))
      .catch(err => activo && setError(err.message))
      .finally(() => activo && setCargando(false));
    return () => { activo = false; };
  }, []);

  return (
    <div className="contenedor cv">
      <section className="cv__cabecera">
        <p className="cv__sobretitulo">{perfil.titulo}</p>
        <h1>{perfil.nombre}</h1>
        <p className="cv__resumen">{perfil.resumen}</p>
        <ul className="cv__contacto">
          <li>{perfil.ubicacion}</li>
          {perfil.contacto.map(c => (
            <li key={c.etiqueta}>
              <a href={c.enlace} target={c.enlace.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                {c.valor}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <div className="cv__rejilla">
        <section className="cv__principal" aria-labelledby="titulo-experiencia">
          <h2 id="titulo-experiencia" className="seccion__titulo">Experiencia profesional</h2>
          {cargando && <p className="cargando">Cargando experiencias…</p>}
          {error && <Aviso tipo="error">{error}</Aviso>}
          {!cargando && !error && experiencias.length === 0 && (
            <p className="vacio">
              Aún no hay experiencias registradas. Agrégalas desde el <a href="#/admin">panel administrativo</a>.
            </p>
          )}
          {experiencias.length > 0 && <LineaDeTiempo experiencias={experiencias} />}
        </section>

        <aside className="cv__lateral">
          <section>
            <h2 className="seccion__titulo">Educación</h2>
            {perfil.educacion.map(e => (
              <div key={e.titulo} className="bloque">
                <h3>{e.titulo}</h3>
                <p>{e.institucion}</p>
                <p className="tenue">{e.periodo}</p>
              </div>
            ))}
          </section>

          <section>
            <h2 className="seccion__titulo">Habilidades</h2>
            {perfil.habilidades.map(h => (
              <div key={h.grupo} className="bloque">
                <h3>{h.grupo}</h3>
                <ul className="chips">
                  {h.items.map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </section>

          <section>
            <h2 className="seccion__titulo">Idiomas</h2>
            <ul className="lista-simple">
              {perfil.idiomas.map(i => (
                <li key={i.idioma}><strong>{i.idioma}</strong> · {i.nivel}</li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}
