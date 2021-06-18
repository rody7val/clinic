<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  watch: {
    $route (to, from) {
      let defaultColor = 'grey-8'
      let calendarColor = 'primary'
      let clinicColor = 'secondary'
      let stockColor = 'red-5'

      if (to.path.match('stock')) {
      	console.log('stock')
      	return this.$store.commit('setColor', stockColor)
      }
      if (to.path.match('clinic')) {
      	console.log('clinic')
      	return this.$store.commit('setColor', clinicColor)
      }
      if (to.path.match('calendar')) {
      	console.log('calendar')
      	return this.$store.commit('setColor', calendarColor)
      }
      console.log('default')
      return this.$store.commit('setColor', defaultColor)
    }
  }
}
</script>
