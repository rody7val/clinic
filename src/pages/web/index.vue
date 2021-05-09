<template>
  <div>
  <div class="row">
    <div class="col-md-8 col-sm-8 col-xs-12 order-last-xs q-px-lg text-center-sm">
      <h1 class="text-h4">
        {{getHead}}
        <q-btn
          v-if="!$store.state.auth.isAuthenticated"
          @click.prevent="handleSetHeader"
          flat
          round
          color="primary"
          icon="edit"
          size="sm"
        />
      </h1>
      <h1 class="text-h5">
        {{getDesc}}
        <q-btn
          v-if="!$store.state.auth.isAuthenticated"
          @click.prevent="handleSetDesc"
          flat
          round
          color="primary"
          icon="edit"
          size="sm"
        />
      </h1>
      <hr>
        <!--auth signin
        <q-btn v-if="!$store.state.auth.isAuthenticated"
          @click.prevent="signIn"
          color="white"
          text-color="primary"
          icon="person"
          label="ACCEDER" />
        <div v-else>
          <p>Hola {{$store.state.auth.user.displayName}}!</p>
          <q-btn
            to="/calendar"
            class="q-mr-sm q-mb-sm"
            icon="event"
            label="Calendario"
            color="primary"
          />
          <q-btn
            to="/clinic"
            class="q-mr-sm q-mb-sm"
            icon="local_hospital"
            label="Clínica"
            color="primary"
          />
          <q-btn
            to="/stock"
            class="q-mr-sm q-mb-sm"
            icon="storefront"
            label="Tienda"
            color="primary"
          />
        </div>-->
    </div>
    <div class="col-md-4 col-sm-4 col-xs-12 order-sm-2">
      <img
        fit="fill"
        style="display: block"
        class="shadow-logo img-web q-mx-auto q-my-lg"
        src="~assets/quasar-logo-full.svg"
      />
    </div>
  </div>

  <Carousel/>
</div>
</template>

<script>
import { mapState } from 'vuex'
import Carousel from '../../components/Carousel.vue'
const signIn = () => {}

export default {
  components: { Carousel },
  data () {
    //  const provider = new firebase.auth.GoogleAuthProvider()
    //  firebase.auth().signInWithPopup(provider).then(result => {
    //    console.log('signIn!', result)
    //    //useRouter.push({ path: '/dash' })
    //  }).catch(error => {
    //    alert(error)
    //  })
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