<script>
export default {
  props: {
    items: { type: Array, required: true },
  },

  methods: {
    handleDone(id) {
      // switch checkbox store items.done
      this.$store.commit('handleDoneItems', id)
    },

    deleteItems(item) {
      this.$q.dialog({
        title: 'Confirmar',
        message: 'Borrar el item '+ item.name.toUpperCase() +'?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$store.dispatch('items/delete', item.id)
	      this.$q.notify({
	        message: 'Borrado!',
	        color: 'purple'
	      })
      })
    },
  },

  data () {
    return {}
  }
}
</script>

<template>
  <div >
    <!-- items list -->
    <q-list
      separator
      bordered
      style="width: 100%"
      class="bg-white"
    >
      <q-item
        v-for="(item, key) in items"
        :key="key"
        @click="handleDone(item.id)"
        :class="{'done bg-blue-1': item.done}"
        clickable
        v-ripple>
        <!-- items.done -->
        <q-item-section avatar>
          <q-checkbox
            v-model="item.done"
            class="no-pointer-events"
            color="primary" />
        </q-item-section>
        <!-- items.name -->
        <q-item-section>
          <q-item-label class="ellipsis">{{item.name}}</q-item-label>
        </q-item-section>
        <!-- items.viewitems(id) -->
        <q-item-section
          v-if="item.done"
          side>
          <q-btn
            flat
            round
            :to="'/stock/items/'+item.id"
            color="primary"
            icon="visibility" />
        </q-item-section>
        <!-- items.deleteItems() -->
        <q-item-section
          v-if="item.done"
          side>
          <q-btn
            @click.stop="deleteItems(item)"
            flat
            round
            color="primary"
            icon="delete" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>

</template>
