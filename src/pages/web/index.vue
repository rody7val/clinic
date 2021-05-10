<template>
  <div class="bg-grey-1 text-grey-9">
  <div class="row">
    <div class="col-md-8 col-sm-8 col-xs-12 order-last-xs q-px-lg text-center-sm">
      <h1 class="text-h4 q-pt-lg q-mt-lg">
        {{getHead}}
        <q-btn
          v-if="$store.state.auth.isAuthenticated"
          @click.prevent="handleSetHeader"
          flat
          round
          color="primary"
          icon="edit"
          size="sm"
        />
      </h1>
      <div class="text-subtitle1">
        {{getDesc}}
        <q-btn
          v-if="$store.state.auth.isAuthenticated"
          @click.prevent="handleSetDesc"
          flat
          round
          color="primary"
          icon="edit"
          size="sm"
        />
      </div>
      <hr>
      <div class="text-overline q-mb-md">Administración</div>
      <!--auth signin-->
      <q-btn v-if="!$store.state.auth.isAuthenticated"
        class="q-mb-md"
        @click.prevent="signIn"
        text-color="primary"
        color="white"
        icon="person"
        size="md"
        label="ACCEDER" />
    </div>
    <div class="col-md-4 col-sm-4 col-xs-12 order-sm-2 q-pt-md">
      <img
        fit="fill"
        style="display: block"
        class="shadow logo img-web q-mx-auto q-my-lg"
        src="~assets/quasar-logo-full.svg"
      />
    </div>
  </div>

  <div class="row" v-if="$store.state.auth.isAuthenticated">
    <div class="col-12 q-px-lg q-my-md">
      <div>
        <q-banner class="bg-grey-4">

          <div class="text-h6 text-primary q-pb-lg">Hola {{$store.state.auth.user.displayName}}!</div>

          <template v-slot:avatar>
            <q-icon size="md" name="person" color="primary" />
          </template>

          <template v-slot:action>
            <q-btn
              to="/calendar"
              class="q-mr-sm q-mb-sm"
              icon="event"
              label="Calendario"
              flat
              stack
              color="primary"
            />
            <q-btn
              to="/clinic"
              class="q-mr-sm q-mb-sm"
              icon="local_hospital"
              label="Clínica"
              flat
              stack
              color="primary"
            />
            <q-btn
              to="/stock"
              class="q-mr-sm q-mb-sm"
              icon="storefront"
              label="Tienda"
              flat
              stack
              color="primary"
            />
          </template>
        </q-banner>
      </div>

    </div>
  </div>
  <Carousel/>
</div>
</template>

<script>
import { mapState } from 'vuex'
import Carousel from '../../components/Carousel.vue'
import firebase from 'firebase'

const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithPopup(provider).catch(e=>{alert(e.message)})
}

export default {
  components: { Carousel },
  data () {
    return {
      signIn
    }
  },
  computed: mapState({
    getAdminId(state) {
      return Object.keys(state.admin.data)[0]
    },
    getHead(state) {
      if (this.getAdminId) {
        return state.admin.data[this.getAdminId].web.head
      }
    },
    getDesc(state) {
      if (this.getAdminId) {
        return state.admin.data[this.getAdminId].web.desc
      }
    }
  }),
  methods: {
    handleSetHeader() {
      this.$q.dialog({
        title: 'Cambiar encabezado',
        prompt: { model: this.getHead },
        cancel: true,
        persistent: true
      }).onOk(data => {
        if (data) {
          let id = this.getAdminId
          this.$store.dispatch('admin/set', {id, web: {head: data}})
        }
      })
    },
    handleSetDesc() {
      this.$q.dialog({
        title: 'Cambiar descripción',
        prompt: { model: this.getDesc },
        cancel: true,
        persistent: true
      }).onOk(data => {
        if (data) {
          let id = this.getAdminId
          this.$store.dispatch('admin/set', {id, web: {desc: data}})
        }
      })
    }
  },
}
</script>

<style type="text/css">
.img-web{
  height: 150px
}
@media (max-width: 576px) {
  .text-center-sm{
    text-align: center;
  }
  .order-sm-2 {
    order: -10000 !important;
  }
}
</style>