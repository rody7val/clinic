<template>
  <div class="bg-grey-3 text-grey-9">
    <q-toolbar class="bg-grey-6 text-white">
      <New />
      <q-space />
      <q-input
        v-model="search"
        @keyup="buscar"
        filled
        bg-color="white"
        label="Buscar"
        placeholder="Nombre"
        required
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </q-toolbar>

    <div v-if="!search">
      <p class="
        bg-grey-6
        text-overline
        q-px-lg
        q-py-none
        q-ma-none
      ">Últimos {{
        items.length
      }} productos cargados ({{
        Object.keys($store.state.items.data).length
      }} en total)</p>
      <List :items="items" />
      <q-btn
        @click="getMoreItems"
        flat
        color="red-5 right"
        label="Cargar más"
      />
    </div>

    <div v-else>
      <p class="
        bg-grey-6
        text-overline
        q-px-lg
        q-py-none
        q-ma-none
      ">Productos encontrados ({{listSearch.length}})</p>
      <List :items="listSearch" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import New from '../../components/items/new'
import List from '../../components/items/list'

export default {
  components: { New, List },

  mounted() {
    this.openSync()
  },

  beforeDestroy () {
    this.closeSync()
  },

  computed: {
    ...mapGetters(['items']),
  },

  methods: {
    openSync() {
      this.$store.dispatch('items/openDBChannel')
    },

    closeSync() {
      this.$store.dispatch('items/closeDBChannel', {
        clearModule: true
      })
    },

    buscar() {
      this.listSearch = this.$store.getters.getClientesByName(this.search)
    },

    getMoreItems() {
      this.$store.commit('pushPaginationBlock', 5)
      this.closeSync()
      this.openSync()
    },
  },

  data () {
    return {
      search: '',
      listSearch: [],
    }
  }
}
</script>