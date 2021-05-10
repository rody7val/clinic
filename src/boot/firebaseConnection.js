import Vue from 'vue'
import firebase from '../services/firebase'

export default async ({router, store}) => {
  //firebase.init(process.env.QENV.FIREBASE_CONFIG)
  // Tell the application what to do when the 
  // authentication state has changed
  firebase.auth().onAuthStateChanged((user) => {
    //store.commit('auth/setAuthState', { user })
    //store.state.user = user || null
    store.commit('auth/setAuthState', {
      isAuthenticated: user !== null,
      user: user
    })
    //Vue.prototype.$user = user
    //firebase.handleOnAuthStateChanged(router, store, user)
  }, (error) => {
    console.error(error)
  })

  //$q.$fb = fb
  //store.$fb = fb
}