import { useEffect, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import HojaDeVida from './pages/HojaDeVida.jsx';
import Admin from './pages/Admin.jsx';

// Enrutamiento sencillo por hash: #/ muestra la hoja de vida y #/admin el panel.
// No requiere configurar el servidor y funciona igual con `npm run dev` o `npm run preview`.
function rutaActual() {
  return window.location.hash.startsWith('#/admin') ? 'admin' : 'cv';
}

export default function App() {
  const [ruta, setRuta] = useState(rutaActual);

  useEffect(() => {
    const alCambiar = () => {
      setRuta(rutaActual());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', alCambiar);
    return () => window.removeEventListener('hashchange', alCambiar);
  }, []);

  useEffect(() => {
    document.title = ruta === 'admin' ? 'Panel administrativo · Hoja de vida' : 'Jorge Flórez · Hoja de vida';
  }, [ruta]);

  return (
    <>
      <Navbar ruta={ruta} />
      <main>{ruta === 'admin' ? <Admin /> : <HojaDeVida />}</main>
      <footer className="pie">
        Actividad unidad 4 · Desarrollo de software web · Universidad de Cartagena (CTEV)
      </footer>
    </>
  );
}
