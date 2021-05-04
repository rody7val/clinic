<template>
  <div>
  <div class="row">
    <div class="col-md-8 col-sm-8 col-xs-12 order-last-xs q-px-lg text-center-sm">
      <h1 class="text-h4">
        {{$store.state.admin.web.title}}
        <q-btn
          v-if="!$store.state.auth.isAuthenticated"
          @click.prevent="handleSetTitle"
          flat
          round
          color="primary"
          icon="edit"
          size="sm"
        />
      </h1>
      <h1 class="text-h5">
        {{$store.state.admin.web.desc}}
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
  <br>
    <div class="text-h6 q-ma-lg">Galería del sistema</div>
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
      control-color="primary"
      navigation
      padding
      arrows
      height="300px"
      class="bg-grey-1 rounded-borders"
    >
      <q-carousel-slide :name="1" class="column no-wrap">
        <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
          <q-img class="rounded-borders col-6 full-height" src="https://cdn.quasar.dev/img/mountains.jpg" />
          <q-img class="rounded-borders col-6 full-height" src="https://cdn.quasar.dev/img/parallax1.jpg" />
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="2" class="column no-wrap">
        <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
          <q-img class="rounded-borders col-6 full-height" src="https://cdn.quasar.dev/img/parallax2.jpg" />
          <q-img class="rounded-borders col-6 full-height" src="https://cdn.quasar.dev/img/quasar.jpg" />
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="3" class="column no-wrap">
        <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
          <q-img class="rounded-borders col-6 full-height" src="https://cdn.quasar.dev/img/cat.jpg" />
          <q-img class="rounded-borders col-6 full-height" src="https://cdn.quasar.dev/img/linux-avatar.png" />
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="4" class="column no-wrap">
        <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
          <q-img class="rounded-borders col-6 full-height" src="https://cdn.quasar.dev/img/material.png" />
          <q-img class="rounded-borders col-6 full-height" src="https://cdn.quasar.dev/img/donuts.png" />
        </div>
      </q-carousel-slide>
    </q-carousel>
</div>
</template>

<script>
//import vue from 'vue'
//import firebase from 'firebase'
const signIn = () => {}

export default {
  methods: {
    handleSetTitle() {
      this.$q.dialog({
        title: 'Admin',
        message: 'Cambiar título',
        prompt: { model: this.$store.state.admin.web.title },
        cancel: true,
        persistent: true
      }).onOk(data => {
        if (data) {
          this.$store.commit("admin/setTitle", data)
        }
      })
      //.onCancel(() => { })
      //.onDismiss(() => { })
    },
    handleSetDesc() {
      this.$q.dialog({
        title: 'Admin',
        message: 'Cambiar descripción',
        prompt: { model: this.$store.state.admin.web.title },
        cancel: true,
        persistent: true
      }).onOk(data => {
        if (data) {
          this.$store.commit("admin/setDesc", data)
        }
      })
      //.onCancel(() => { })
      //.onDismiss(() => { })
    }
  },
  data () {
    //  const provider = new firebase.auth.GoogleAuthProvider()
    //  firebase.auth().signInWithPopup(provider).then(result => {
    //    console.log('signIn!', result)
    //    //useRouter.push({ path: '/dash' })
    //  }).catch(error => {
    //    alert(error)
    //  })

    return {
      signIn,
      slide: 1
    }
  }
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