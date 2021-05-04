<template>
  <q-page class="flex flex-center">
    <!--auth signin-->
    <q-btn v-if="!$store.state.auth.isAuthenticated"
      @click.prevent="signIn"
      color="white"
      text-color="primary"
      icon="person"
      label="ACCEDER" />
    <div v-else>
      {{$router.push({ path: `/` })}}
    </div>
  </q-page>
</template>

<script>
//import firebase from 'firebase'
//
const signIn = () => {
//  const provider = new firebase.auth.GoogleAuthProvider()
//  firebase.auth().signInWithPopup(provider).then(result => {
//    console.log('signIn!', result)
//    //useRouter.push({ path: '/dash' })
//  }).catch(error => {
//    alert(error)
//  })
}

export default {
  data () {
    return {signIn}
  }
}
</script>