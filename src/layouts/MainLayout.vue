<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      :class="'bg-'+$store.state.navColor"
      elevated
    >
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title>
          {{getTitle}}        
        </q-toolbar-title>

        <!--auth signin-->
        <q-btn v-if="!$store.state.auth.isAuthenticated"
          @click.prevent="signIn"
          color="white"
          text-color="primary"
          icon="person"
          label="ACCEDER" />
        
        <!--auth menu-->
        <q-btn-dropdown
          v-else
          dense
          :color="$store.state.navColor"
        >
          <template v-slot:label>
            <q-avatar size="sm">
              <img :src="$store.state.auth.user.photoURL">
            </q-avatar>
          </template>

          <div class="row no-wrap q-pa-md">
            <div class="column items-center">
              <q-avatar size="72px" class="shadow logo">
                <img :src="$store.state.auth.user.photoURL">
              </q-avatar>

              <div class="text-subtitle1 q-mt-md">{{$store.state.auth.user.displayName}}</div>
              <div class="text-weight-bold q-mb-md">{{$store.state.auth.user.email}}</div>

              <q-btn
                @click.prevent="signOut"
                color="primary"
                label="SALIR"
                push
                size="sm"
                v-close-popup
              />
            </div>
          </div>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-3 text-grey-9"
    >
        <q-item-section>
          <img
            class="shadow logo img-menu q-mx-auto q-my-md"
            src="~assets/quasar-logo-full.svg"
          />
          <q-toolbar-title class="text-center">
            {{getTitle}}
            <q-btn
              v-if="$store.state.auth.isAuthenticated"
              @click.prevent="handleSetTitle"
              flat
              round
              color="grey-7"
              icon="edit"
              size="xs"
            />
          </q-toolbar-title>
          <q-item-label class="text-center text-weight-light q-mb-md">
            {{getSubtitle}}
            <q-btn
              v-if="$store.state.auth.isAuthenticated"
              @click.prevent="handleSetSubtitle"
              flat
              round
              color="grey-7"
              icon="edit"
              size="xs"
            />
          </q-item-label>
        </q-item-section>
      <q-list>
        <hr>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState } from 'vuex'
import EssentialLink from 'components/EssentialLink.vue'
import { linksData } from '../utils/mainLayoutConfig.js'
import firebase from 'firebase'

const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithPopup(provider).catch(e=>{alert(e.message)})
}

const signOut = () => {
  firebase.auth().signOut().catch(e=>{alert(e.message)})
}

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      signIn,
      signOut,
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  },
  beforeDestroy () {
    // close sync
    this.$store.dispatch('admin/closeDBChannel', { clearModule: true })
  },
  mounted() {
    // open sync
    this.$store.dispatch('admin/openDBChannel')
  },
  computed: mapState({
    getAdminId(state) {
      return Object.keys(state.admin.data)[0]
    },
    getTitle(state) {
      if (this.getAdminId) {
        return state.admin.data[this.getAdminId].title
      }
    },
    getSubtitle(state) {
      if (this.getAdminId) {
        return state.admin.data[this.getAdminId].subtitle
      }
    }
  }),
  methods: {
    handleSetTitle() {
      this.$q.dialog({
        title: 'Cambiar título',
        prompt: { model: this.getTitle },
        cancel: true,
        persistent: true
      }).onOk(data => {
        if (data) {
          let id = this.getAdminId
          this.$store.dispatch('admin/set', {id, title: data})
        }
      })
    },
    handleSetSubtitle() {
      this.$q.dialog({
        title: 'Cambiar subtítulo',
        prompt: { model: this.getSubtitle },
        cancel: true,
        persistent: true
      }).onOk(data => {
        if (data) {
          let id = this.getAdminId
          this.$store.dispatch('admin/set', {id, subtitle: data})
        }
      })
    },
  },
}
</script>

<style type="text/css">
.img-menu{
  height: 120px
}
.logo{
  border-radius: 50%;
}
.shadow{
  box-shadow: 0 0 10px 2px rgb(0 0 0 / 20%), 0 0px 10px rgb(0 0 0 / 24%);
}
</style>