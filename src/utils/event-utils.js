let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
let totimeStr = new Date().toISOString().replace(/.*T$/, '') // HH:MM of time

export const INITIAL_EVENTS = [{
    "title": "Alejandro Gomez",
    "turn": true,
    "start": "2021-05-03T08:15:00-03:00",
    "end": "2021-05-03T08:45:00-03:00",
    "id": "0"
  }, {
    "title": "Silvana Vizcai",
    "turn": true,
    "start": "2021-05-03T08:45:00-03:00",
    "end": "2021-05-03T09:15:00-03:00",
    "id": "1"
  }, {
    "title": "Pago proveedor $50000",
    "turn": false,
    "start": "2021-05-04",
    "end": "2021-05-05",
    "id": "2"
  }
]
export function createEventId() {
  return String(eventGuid++)
}