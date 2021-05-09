let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/,
'') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [{
    "title": "Alejandro Gomez (turno)",
    "start": "2021-05-03T08:15:00-03:00",
    "end": "2021-05-03T08:45:00-03:00",
    "id": "0"
  }, {
    "title": "Silvana Vizcai (turno)",
    "start": "2021-05-03T08:45:00-03:00",
    "end": "2021-05-03T09:15:00-03:00",
    "id": "1"
  }, {
    "title": "Pago proveedor ($50000)",
    "start": "2021-05-04",
    "end": "2021-05-05",
    "id": "2" 
  }
]
export function createEventId() {
  return String(eventGuid++)
}