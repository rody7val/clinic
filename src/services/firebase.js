import firebase from 'firebase/app'
import 'firebase/auth'

const init = async (config) => {
  firebase.initializeApp(config)
  return new Promise((resolve, reject) => {
    firebase.firestore().enablePersistence()
      .then(resolve)
      .catch(err => {
        if (err.code === 'failed-precondition') {
          reject(err)
          // Multiple tabs open, persistence can only be
          // enabled in one tab at a a time.
        } else if (err.code === 'unimplemented') {
          reject(err)
          // The current browser does not support all of
          // the features required to enable persistence
        }
      })
  })
}

const auth = () => {
  return firebase.auth()
}

const getAuth = () => {
  return firebase.auth
}

const isAuthenticated = (store) => {
  return store.state.auth.isAuthenticated
}

const handleOnAuthStateChanged = async (router, store, user) => {
  const initialAuthState = isAuthenticated(store)
  // Save to the store
  store.commit('auth/setAuthState', {
    isAuthenticated: user !== null,
    user: user
  })

  if (user && initialAuthState) {
    console.log("go to dash")
    router.push({ path: '/dash' })
  }

  // If the user loses authentication route
  // them to the login page
  if (!user && initialAuthState) {
    store.commit('auth/setAuthState', {
      isAuthenticated: false,
      user: false
    })
    router.push({ path: '/' })
  }

}

const ensureAuthIsInitialized = async (store) => {
    console.log(store)
  if (store.state.auth.isReady) return true
  // Create the observer only once on init
  return new Promise((resolve, reject) => {
    // Use a promise to make sure that the router will eventually show the route after the auth is initialized.
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      resolve()
      unsubscribe()
    }, () => {
      reject(new Error('Looks like there is a problem with the firebase service. Please try again later'))
    })
  })
}

export default {
  firebase,
  init,
  auth,
  getAuth,
  isAuthenticated,
  handleOnAuthStateChanged,
  ensureAuthIsInitialized
}