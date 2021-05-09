import Vue from 'vue'
import Vuex from 'vuex'
import VuexEasyFirestore from 'vuex-easy-firestore'
import fb from '../services/firebase'

import firebase from 'firebase'
import admin from './admin'
import auth from './auth'
import calendar from './calendar'

Vue.use(Vuex)

// do the magic 🧙🏻‍♂️
const easyFirestore = VuexEasyFirestore(
  [admin, calendar],
  {logging: true, FirebaseDependency: firebase}
)
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */
//console.log(JSON.stringify(process.env.QENV.FIREBASE_CONFIG))
fb.init(process.env.QENV.FIREBASE_CONFIG)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    plugins: [easyFirestore],
    modules: {
      auth
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
