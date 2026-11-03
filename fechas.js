const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

// Las fechas llegan como "YYYY-MM-DD". Se leen como texto para evitar
// el desfase de un día que produce la zona horaria al usar new Date().
export function formatearFecha(valor) {
  if (!valor) return 'Actualidad';
  const [anio, mes] = valor.split('-');
  return `${MESES[Number(mes) - 1]} ${anio}`;
}

export function rangoFechas(inicio, fin) {
  return `${formatearFecha(inicio)} — ${formatearFecha(fin)}`;
}

export function duracion(inicio, fin) {
  const hoy = new Date();
  const [a1, m1] = inicio.split('-').map(Number);
  const [a2, m2] = fin ? fin.split('-').map(Number) : [hoy.getFullYear(), hoy.getMonth() + 1];
  const meses = Math.max(1, (a2 - a1) * 12 + (m2 - m1) + 1);
  const anios = Math.floor(meses / 12);
  const resto = meses % 12;
  const partes = [];
  if (anios) partes.push(`${anios} ${anios === 1 ? 'año' : 'años'}`);
  if (resto) partes.push(`${resto} ${resto === 1 ? 'mes' : 'meses'}`);
  return partes.join(' y ');
}

// Misma regla que la API: fecha real en formato YYYY-MM-DD.
export function esFechaValida(valor) {
  return typeof valor === 'string'
    && /^\d{4}-\d{2}-\d{2}$/.test(valor)
    && !isNaN(Date.parse(valor))
    && new Date(valor).toISOString().slice(0, 10) === valor;
}
