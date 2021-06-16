import Vue from 'vue'
import Vuex from 'vuex'
import VuexEasyFirestore from 'vuex-easy-firestore'
import fb from '../services/firebase'

import firebase from 'firebase'
import admin from './admin'
import auth from './auth'
import events from './events'
import items from './items'

Vue.use(Vuex)

// do the magic 🧙🏻‍♂️
const easyFirestore = VuexEasyFirestore(
  [admin, events, items],
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
    plugins: [ easyFirestore ],

    modules: { auth },

    state: {
      paginationBlock: 5
    },

    mutations: {
      handleDoneItems(state, id) {
        state.items.data[id].done = !state.items.data[id].done
      },
      pushPaginationBlock(state, qty) {
        if(state.paginationBlock + qty > Object.keys(state.items.data).length){
          state.paginationBlock = Object.keys(state.items.data).length
        }
        state.paginationBlock = state.paginationBlock + qty
      }
    },

    getters: {
      events: state => {
        return Object.values(state.events.data)
      },
      items: state => {
        //ultimos 5
        return Object.values(state.items.data).slice(0).slice(-state.paginationBlock).reverse()
      },
      getClientesByName: (state) => (search) => {
        return Object.values(state.items.data).filter(item => {
          return item.name.toLowerCase().includes(search.toLowerCase())
        })
      },
    }

    //strict: process.env.DEBUGGING
  })

  return Store
}
