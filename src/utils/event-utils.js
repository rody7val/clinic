let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'Pago a proveedor ($50000)',
    start: todayStr,
    sucursal: ['sz']
  },
  {
    id: createEventId(),
    title: 'Julian Assange (RX)',
    start: todayStr + 'T12:00:00',
    sucursal: ['lp']
  },
  {
    id: createEventId(),
    title: 'Robert De Niro (CONSULTA)',
    start: todayStr + 'T13:00:00',
    end: todayStr + 'T14:30:00',
    sucursal: ['lp']
  },
  {
    id: createEventId(),
    title: 'Roberto Gaitán (CONSULTA)',
    start: '2021-05-04T13:00:00',
    sucursal: ['sz']
  }
]

export function createEventId() {
  return String(eventGuid++)
}