<template>
  <div v-if="public || (!public && $store.state.auth.isAuthenticated)">
    <q-item
      clickable
      tag="a"
      :to="link"
      :exact="exact"
    >
      <q-item-section
        v-if="icon"
        avatar
      >
        <q-icon :name="icon" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ title }}</q-item-label>
        <q-item-label caption>
          {{ caption }}
        </q-item-label>
      </q-item-section>
    </q-item>
    <hr>
  </div>
</template>

<script>
    //v-if="public || ((public == false) && ($store.state.auth.isAuthenticated) ? true : false)"
export default {
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    exact: {
      type: Boolean,
      default: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    },

    public: {
      type: Boolean,
      default: false
    }
  }
}
</script>
