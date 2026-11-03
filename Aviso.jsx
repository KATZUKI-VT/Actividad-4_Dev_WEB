export default function Aviso({ tipo = 'info', children, onCerrar }) {
  return (
    <div className={`aviso aviso--${tipo}`} role={tipo === 'error' ? 'alert' : 'status'}>
      <span>{children}</span>
      {onCerrar && (
        <button type="button" className="aviso__cerrar" onClick={onCerrar} aria-label="Cerrar aviso">
          ×
        </button>
      )}
    </div>
  );
}
