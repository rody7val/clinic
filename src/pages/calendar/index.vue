<script>
// import the third-party stylesheets directly from your JS
//import 'bootstrap/dist/css/bootstrap.css';
//import '@fortawesome/fontawesome-free/css/all.css'; // needs additional webpack config!
import FullCalendar from '@fullcalendar/vue'
import listPlugin from '@fullcalendar/list'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es'
import { INITIAL_EVENTS, createEventId } from '../../utils/event-utils'
export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarOptions: {
        locale: esLocale,
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin, // needed for dateClick
          listPlugin
        ],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,list'
        },
        slotLabelFormat:{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        },//se visualizara de esta manera 01:00 AM en la columna de horas
        //eventTimeFormat: {
        //   hour: '2-digit',
        //   minute: '2-digit',
        //   hour12: true
        //},//y este código se visualizara de la misma manera pero en el titulo del evento creado en fullcalendar
        initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      },
      currentEvents: [],
      sucursal: '' //La Plata
    }
  },
  methods: {
    handleDateSelect(selectInfo) {
      let calendarApi = selectInfo.view.calendar
      calendarApi.unselect() // clear date selection
      
      this.$q.dialog({
        title: 'Nuevo evento',
        message: 'Nombre/descripción?',
        prompt: { model: '' },
        cancel: true,
        persistent: true
      }).onOk(data => {
        if (data) {
          console.log(data)
          calendarApi.addEvent({
            id: createEventId(),
            title: data,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: selectInfo.allDay
          })
        }
      })
      //.onCancel(() => { })
      //.onDismiss(() => { })

      //let title = prompt('Nueva entrada')
    },
    handleEventClick(clickInfo) {
      this.$q.dialog({
        title: 'Confirmar',
        message: `¿Cancelar el evento '${clickInfo.event.title}'?`,
        cancel: true,
        persistent: true
      }).onOk(() => { clickInfo.event.remove() })
      //.onCancel(() => { })
      //.onDismiss(() => { })
    },
    handleEvents(events) {
      this.currentEvents = events
    },
  }
}
</script>

<template>
  <div class="row q-pa-sm">
    <div class="col-xs-12 col-sm-6 col-md-4">
      <q-select
        outlined
        v-model="sucursal"
        :options="['Suarez', 'La Plata']"
        dense
        denseOpts
        label="Sucursal"
      >
        <template v-slot:prepend>
          <q-icon name="place" />
        </template>
      </q-select>
    </div>

    <div class="col-12">
      <FullCalendar
        class='demo-app-calendar'
        :options='calendarOptions'
      >
        <template v-slot:eventContent='arg'>
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
    </div>
  </div>
</template>

<style lang='css'>
h2 {
  margin: 0;
  font-size: 16px;
}
ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}
li {
  margin: 1.5em 0;
  padding: 0;
}
b { /* used for event dates/times */
  margin-right: 3px;
}
.demo-app {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}
.demo-app-sidebar {
  width: 300px;
  line-height: 1.5;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}
.demo-app-sidebar-section {
  padding: 2em;
}
.demo-app-main {
  flex-grow: 1;
  padding: 3em;
}
.fc { /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
}

.fc .fc-button-primary {
    color: #fff;
    background-color: #1976d2;;
    border-color: #1976d2;;
}
.fc .fc-button-active,
.fc .fc-button-primary:focus,
.fc .fc-button-primary:active,
.fc .fc-button-primary:hover{
    background-color: #12589e!important;
    border-color: #12589e!important;
}
.fc .fc-toolbar-chunk{
}
</style>