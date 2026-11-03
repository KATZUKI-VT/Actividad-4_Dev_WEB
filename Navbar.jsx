export default function Navbar({ ruta }) {
  return (
    <header className="navbar">
      <div className="navbar__contenido">
        <a href="#/" className="navbar__marca">
          <span className="navbar__iniciales">JF</span>
          Jorge Flórez
        </a>
        <nav className="navbar__enlaces" aria-label="Principal">
          <a href="#/" className={ruta === 'cv' ? 'activo' : ''} aria-current={ruta === 'cv' ? 'page' : undefined}>
            Hoja de vida
          </a>
          <a href="#/admin" className={ruta === 'admin' ? 'activo' : ''} aria-current={ruta === 'admin' ? 'page' : undefined}>
            Administración
          </a>
        </nav>
      </div>
    </header>
  );
}
