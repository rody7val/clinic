<script>
import '../../css/calendar.css'
import { date } from 'quasar'
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
    FullCalendar
  },
  mounted() {
    //const orderBy = ['name']
    //const limit = 50
    this.$store.dispatch('events/openDBChannel')
  },
  beforeDestroy () {
    // close sync
    this.$store.dispatch('events/closeDBChannel', { clearModule: true })
  },
  computed: {
    timeToReach () {
      //https://quasar.dev/quasar-utils/date-utils#format-for-display
      let eventDateStart = new Date(this.event.start)
      let eventDateEnd = new Date(this.event.end)
      let locale = this.currentLocale
      //let locale = this.$store.state.myLocale
      let diaSemana = date.formatDate(eventDateStart, 'dddd', locale)
      let diaMes = date.formatDate(eventDateStart, 'D', locale)
      let mes = date.formatDate(eventDateStart, 'MMMM', locale)
      let timeStart = ''
      let timeEnd = ''

      let dia = `${diaSemana}, ${diaMes} de ${mes}`

      if (!this.event.allDay) {
        timeStart = date.formatDate(eventDateStart, 'h:mm', locale)
        timeEnd = date.formatDate(eventDateEnd, 'h:mma', locale)
        dia += ` ⋅ ${timeStart} – ${timeEnd}`
      }

      return dia
    },
    ...mapGetters(['events']),

    config () {
      return {
        ...this.configOptions,
        ...this.eventHandlers
      }
    },

    configOptions () {
      return {
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
        },
        events: this.events,
        //initialEvents: this.events,
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        //initialView: 'dayGridMonth',
      }
    },

    eventHandlers () {
      return {
        select: this.onDateSelect,
        eventClick: this.onEventClick,
        //dateClick: this.onDateClick,
        eventDrop: this.onEventDrop,
        eventResize: this.onEventDrop,
        //eventAdd: this.setEventFirestore,
        //eventsSet: this.handleEvents,
        /* you can update a remote database when these fire:
        eventChange: 
        eventRemove:
        */
      }
    }
  },
  data() {
    return {
      label: '',
      currentLocale: {
        days: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado_Domingo'
          .split('_'),
        daysShort: 'Dom_Lun_Mar_Mie_Jue_Vie_Sab'
          .split('_'),
        months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'
          .split('_'),
        monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'
          .split('_')
      },
      isEdit: false,
      sucursal: 'Suarez', //La Plata
      newEvent: false,
      viewEvent: false,
      event: {
        id: '',
        title: '',
        task: false,
        allDay: true,
        date: '',
        timeStart: '',
        timeEnd: '',
        start: '',
        end: '',
        desc: '',
      },
    }
  },
  methods: {
    setEvent(payload) {
      return new Promise((resolve, reject) => {
        if (!payload) reject(false)
        let date
        let timeStart = "00:00"
        let timeEnd = "00:00"
        if (payload.allDay) {
          date = payload.startStr.split("-").reverse().join("-") // DD-MM-AAAA
        } else {
          date = payload.startStr.replace(/T.*$/, '').split("-").reverse().join("-") // DD-MM-AAAA
          timeStart = payload.startStr.slice(11, 16) // HH:mm
          timeEnd = payload.endStr.slice(11, 16) // HH:mm
        }
        let event = {
          id: payload.id || String( Date.now() ),
          title: payload.title || '',
          task: payload.task || false,
          allDay: payload.allDay,
          start: typeof payload.start === 'object' ?
            new Date(payload.start).toISOString() :
            payload.start,            // ISO8601
          end: typeof payload.end === 'object' ?
            new Date(payload.end).toISOString() :
            payload.end,              // ISO8601
          startStr: payload.startStr, // AAAA-MM-DD[T]HH:mm:ss-HH:mm || AAAA-MM-DD
          endStr: payload.endStr,     // AAAA-MM-DD[T]HH:mm:ss-HH:mm || AAAA-MM-DD
          date: date,                 // DD-MM-AAAA
          timeStart: timeStart,       // HH-mm
          timeEnd: timeEnd,           // HH-mm
          sucursal: this.sucursal,
          desc: payload.desc || ''
        }
        //this.event = event
        resolve(event)
      })  
    },

    changeAllDay () {
      if (this.event.allDay) {
        this.event.startStr = this.event.startStr.replace(/T.*$/, '')
        this.event.endStr = null
        return false
      }
      let timeStart = "T" + this.event.timeStart + ":00" + "-03:00"
      let timeEnd = "T" + this.event.timeEnd + ":00" + "-03:00"
      this.event.startStr = this.event.date.split("-").reverse().join("-") + timeStart
      this.event.endStr = this.event.date.split("-").reverse().join("-") + timeEnd
    },
    //changeDate () {
    //  if (this.event.allDay) {
    //    this.event.startStr = this.event.date.split("-").reverse().join("-")
    //    this.event.endStr = null
    //    let timeStart = this.event.start.replace(/^[^T]*/, '')
    //    let timeEnd = this.event.end.replace(/^[^T]*/, '')
    //    this.event.start = this.event.date.split("-").reverse().join("-") + timeStart
    //    this.event.end = this.event.date.split("-").reverse().join("-") + timeEnd
    //    return false
    //  }
    //  let timeStart = "T" + this.event.timeStart + ":00" + "-03:00"
    //  let timeEnd = "T" + this.event.timeEnd + ":00" + "-03:00"
    //  this.event.startStr = this.event.date.split("-").reverse().join("-") + timeStart
    //  this.event.endStr = this.event.date.split("-").reverse().join("-") + timeEnd
    //  this.event.start = date.addToDate(
    //    new Date(this.event.date.split("-").reverse().join("-")),
    //    { hours: 3 }
    //  ).toISOString()
    //  this.event.end = date.addToDate(
    //    new Date(this.event.date.split("-").reverse().join("-")),
    //    { hours: 3 }
    //  ).toISOString()
    //},
    //changeTimeStart () {
    //  console.log("changeTimeStart")
    //},
    //changeTimeEnd () {
    //  console.log("changeTimeEnd")
    //},
    // select
    onDateSelect (payload) {
      this.newEvent = !this.newEvent
      this.$refs.fullCalendar.getApi().unselect()
      
      this.setEvent(payload).then((event) => {
        if (!event) { return false }
        this.event = event // important
        this.$refs.fullCalendar.getApi().addEvent(event)
      })
    },
    // click
    onEventClick(payload) {
      this.viewEvent = !this.viewEvent
      this.setEvent(this.$store.state.events.data[payload.event.id])
        .then((event) => {
          if (!event) { return false }
          this.event = event // important
        })
    },
    // drop
    onEventDrop(payload) {
      this.$store.dispatch('events/set', {
        id: payload.event.id,
        allDay: payload.event.allDay,
        start: new Date(payload.event.start).toISOString(),
        end: new Date(payload.event.end).toISOString(),
        startStr: payload.event.startStr,
        endStr: payload.event.endStr
      })
    },
    // save select
    save() {
      this.newEvent = false
      this.$refs.fullCalendar.getApi().getEventById(this.event.id).remove()
      this.$store.dispatch('events/set', this.event)
    },
    // back click
    back() {
      this.viewEvent = false
      this.newEvent = false
    },
    // edit click
    edit() {
      this.viewEvent = false
      this.newEvent = true
      this.isEdit = true
    },
    // cancel select
    cancel() {
      this.$q.dialog({
        title: 'Confirmar',
        message: `¿Quieres descartar los cambios no guardados?`,
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.newEvent = false
        this.$refs.fullCalendar.getApi().getEventById(this.event.id).remove()
      })
    },
    // cancel edit
    cancelEdit() {
      this.$q.dialog({
        title: 'Confirmar',
        message: `¿Quieres descartar los cambios no guardados?`,
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.newEvent = false
        this.isEdit = false
      })
    },
    // delete select
    borrar() {
      this.$q.dialog({
        title: 'Confirmar',
        message: `¿Borrar?`,
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$store.dispatch('events/delete', this.event.id)
        this.viewEvent = false
        this.newEvent = false
      })
    },
  }
}
</script>

<template>
<div class="bg-grey-3 text-grey-9">
  <div class="row q-pa-sm">
    <div class="col-xs-12 col-sm-4 col-md-4">
      <div class="text-h6 text-primary q-pt-sm q-pb-md">
        <q-icon size="md" name="event" color="primary" />
        Calendario
      </div>

      <!-- input sucursal -->
      <q-select
        class="q-mb-md"
        v-model="sucursal"
        @change.prevent="getFromFirebase"
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

    <!-- fullCalendar -->
    <div class="col-12">
      <FullCalendar
        ref="fullCalendar"
        class='demo-app-calendar'
        :options='config'
      >
        <template v-slot:eventContent="arg">
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
    </div>
  </div>

  <!-- new event -->
  <q-dialog v-model="newEvent" :persistent="true">
    <q-card class="q-dialog-plugin">

      <!-- title -->
      <q-card-section>
        <q-input
          class="text-placeholder1 text-h5 text-weight-bolder text-grey-6"
          placeholder="Agregar título"
          size="lg"
          v-model="event.title"
        />
      </q-card-section>

      <!-- task -->
      <q-card-section >
        <q-btn-toggle
          v-model="event.task"
          unelevated
          text-color="grey-9"
          toggle-color="blue-1"
          toggle-text-color="primary"
          :options="[
            {label: 'Turno', value: false},
            {label: 'Tarea', value: true},
          ]"
        />
      </q-card-section>

      <!-- allDay -->
      <q-card-section class="row">
        <q-checkbox
          @input="changeAllDay"
          v-model="event.allDay"
          label="Todo el día"
        />
      </q-card-section>

      <!-- date 
      <q-card-section class="row q-pb-lg">
        <q-input
          @input="changeDate"
          v-model="event.date"
          label="Día"
          :class="`col-${event.allDay?'12':'4'} q-px-xs`"
        >
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date
                  @input="changeDate"
                  v-model="event.date"
                  mask="DD-MM-YYYY"
                  :locale="currentLocale"
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input
          v-if="!event.allDay"
          @input="changeTimeStart"
          v-model="event.timeStart"
          label="Comienzo"
          class="col-4 q-px-xs"
        >
          <template v-slot:prepend>
            <q-icon name="timer" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-time
                  @input="changeTimeStart"
                  v-model="event.timeStart"
                  mask="HH:MM"
                  format24h
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input
          v-if="!event.allDay"
          @input="changeTimeEnd"
          v-model="event.timeEnd"
          label="Fin"
          class="col-4 q-px-xs"
        >
          <template v-slot:prepend>
            <q-icon name="alarm" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-time
                  @input="changeTimeEnd"
                  v-model="event.timeEnd"
                  mask="HH:MM"
                  format24h
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-card-section> -->
        <!-- timeStart -->
        <!-- timeEnd -->

      <!-- desc -->
      <q-card-section>
        <q-expansion-item
          expand-separator
          icon="notes"
          label="Agregar descripción"
          header-class="bg-grey-3 text-grey-8"
          expand-icon-class="text-grey-8"
        >
          <q-card>
            <q-editor
              min-height="5rem"
              v-model="event.desc"
              min-heightevent.="2rem"
              content-class="bg-grey-3"
              toolbar-text-color="text-grey-8"
              toolbar-toggle-color="primary"
              toolbar-bg="grey-3"
            />
          </q-card>
        </q-expansion-item>
      </q-card-section>

      <!--<pre>{{JSON.stringify(event, null, 2)}}</pre>
       buttons -->
      <q-card-actions align="right">
        <q-btn
          v-if="this.isEdit"
          @click.prevent="cancelEdit"
          flat
          color="grey-9"
          label="DESCARTAR"
        />
        <q-btn
          flat
          v-else
          @click.prevent="cancel"
          color="grey-9"
          label="DESCARTAR"
        />
        <q-btn flat @click.prevent="save" color="primary" label="GUARDAR" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- view event -->
  <q-dialog v-model="viewEvent" :persistent="true">
    <q-card class="q-dialog-plugin">
      <!-- title -->
      <div class="row">
        <div class="col-1">
          <q-card-section>
            <q-icon :name="event.task ? 'check_box' : 'turned_in'" size="xs" class="q-pt-xs"/>
          </q-card-section>
        </div>
        <div class="col-11">
          <q-card-section>
            <div class="text-h6">{{event.title || "(Sin título)"}}</div>
          </q-card-section>
        </div>
      </div>
      <!-- date -->
      <div class="row">
        <div class="col-1">
          <q-card-section>
            <q-icon name="event" size="xs" class="q-pt-xs"/>
          </q-card-section>
        </div>
        <div class="col-11">
          <q-card-section class="text-subtitle1">
            {{timeToReach}}
          </q-card-section>
        </div>
      </div>

      <!-- desc -->
      <div class="row">
        <div class="col-1">
          <q-card-section>
            <q-icon name="notes" size="xs" class="q-pt-xs"/>
          </q-card-section>
        </div>
        <div class="col-11">
          <q-card-section v-if="event.desc" v-html="event.desc" />
        </div>
      </div>
      <!-- buttons -->
      <q-card-actions align="right">
        <q-btn flat @click.prevent="borrar" color="grey-9" label="BORRAR" />
        <q-btn flat @click.prevent="edit" color="primary" label="EDITAR" />
        <q-btn flat @click.prevent="back" color="primary" label="ATRAS" />
      </q-card-actions>
    </q-card>
  </q-dialog>

</div>
</template>

<style type="text/css">
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
    background-color: #fafafa;
}

.fc .fc-toolbar.fc-header-toolbar {
  background-color: #eee;
}
.fc .fc-col-header-cell-cushion {
  text-transform: uppercase;
}
.fc .fc-toolbar-title {/*
  line-height: 2.7rem;
  */
  line-height: 2rem;
  letter-spacing: 0.0125em;
  font-weight: 500;
  font-size: 1.25rem;
  color: #1976d2 !important;
  color: var(--q-color-primary) !important;
  text-transform: uppercase;
}
.fc .fc-daygrid-day-number {
    font-weight: bold;
}
.text-placeholder1 input.q-placeholder::placeholder,
.text-placeholder1 input.q-placeholder::-webkit-input-placeholder  {
  font-size: 24px
}
@media (max-width: 600px) {
  /*banner*/
  /*.q-banner__actions.col-all .q-btn-item{
    display: contents
  }*/
  .q-banner__content .text-h6{
    font-size: 16px!important
  }
  /*full callendar*/
  .fc .fc-toolbar.fc-header-toolbar {
    display: block;
    text-align: center;
  }
  .fc .fc-button {
    padding: 4px !important;
  }
  .fc .fc-toolbar-title {
    line-height: 2.7rem;
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 2rem;
    letter-spacing: 0.0125em;
    color: #1976d2 !important;
    color: var(--q-color-primary) !important;
    text-transform: uppercase;
  }
}
</style>