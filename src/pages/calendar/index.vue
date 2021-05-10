<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import FullCalendar from '@fullcalendar/vue'
import listPlugin from '@fullcalendar/list'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es'
import { INITIAL_EVENTS, createEventId } from '../../utils/event-utils'
import EventPopUp from '../../components/EventPopUp.vue'
export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  mounted() {
    //const orderBy = ['name']
    const limit = 50
    this.$store.dispatch('calendars/openDBChannel', { clauses: {limit} })
  },
  beforeDestroy () {
    // close sync
    this.$store.dispatch('calendars/closeDBChannel', { clearModule: true })
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
        slotDuration: '00:15:00',
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
        //eventsSet: this.handleEvents,
        //events: this.events,
        /* you can update a remote database when these fire:
        eventChange:
        eventRemove:
        */
        eventAdd: this.setEventFirestore,
      },
      label: '',
      currentEvents: [],
      sucursal: '' //La Plata
    }
  },
  computed: {
    //...mapState({
        //events: state => state.calendar.events
    //}),
    //...mapGetters('calendar', ['events']),
  },
  methods: {
    setEventFirestore(info) {
      console.log(info.view.calendar)
      //this.$store.dispatch('calendar/set', {
      //  name: this.clientName,
      //  tel: this.clientTel,
      //  done: false
      //})
    },
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
      //manda clickInfo al state
      this.$q.dialog({
        component: EventPopUp,
      
        // optional if you want to have access to
        // Router, Vuex store, and so on, in your
        // custom component:
        parent: this, // becomes child of this Vue node
                      // ("this" points to your Vue component)
                      // (prop was called "root" in < 1.1.0 and
                      // still works, but recommending to switch
                      // to the more appropriate "parent" name)
      
        // props forwarded to component
        // (everything except "component" and "parent" props above):
        //text: 'something',
        // ...more.props...
      }).onOk(() => {
        console.log('OK')
      }).onCancel(() => {
        console.log('Cancel')
      }).onDismiss(() => {
        console.log('Called on OK or Cancel')
      })      
      //if (clickInfo.event.allDay) {
      //  return this.$q.dialog({
      //    title: clickInfo.event.title,
      //    message: clickInfo.event.startStr,
      //    cancel: true,
      //    persistent: true
      //  }).onOk(() => {})
      //}
      //this.$q.dialog({
      //  title: clickInfo.event.title,
      //  message: clickInfo.event.startStr+" "+clickInfo.event.endStr,
      //  cancel: true,
      //  persistent: true
      //}).onOk(() => {})
    },
    handleEventDelete(clickInfo) {
      this.$q.dialog({
        title: 'Confirmar',
        message: `¿Cancelar el evento '${clickInfo.event.title}'?`,
        cancel: true,
        persistent: true
      }).onOk(() => { clickInfo.event.remove() })
      //.onCancel(() => { })
      //.onDismiss(() => { })
    },
  }
}
    //<q-popup-edit v-model="label" content-class="bg-accent text-white">
      //<q-input dark color="white" v-model="label" dense autofocus counter>
        //<template v-slot:append>
          //<q-icon name="edit" />
        //</template>
      //</q-input>
    //</q-popup-edit>
  //{{$store.state.calendar.events}}
</script>

<template>
<div class="bg-grey-1 text-grey-9">
  <div class="row q-pa-sm">
    <div class="col-xs-12 col-sm-4 col-md-4">
      <q-select
        class="bg-white"
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
.fc .fc-scrollgrid-liquid {
    background-color: white;
}
</style>