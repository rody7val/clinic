<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="text-h6">Cariables Globales</div>
      </q-card-section>
      <q-card-section>
        <div class="text-weight">Cambiar titulo</div>
      </q-card-section>
      <q-card-section>
        <q-input
          v-model="head"

        />
        {{getHead}}
      </q-card-section>
      <!-- buttons example -->
      <q-card-actions align="right">
        <q-btn flat color="primary" label="CANCELAR" @click="onCancelClick" />
        <q-btn flat color="primary" label="GUARDAR" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    // ...your custom props          @input="updateHead"
  },
  computed: mapState({
    getAdminId(state) {
      return Object.keys(state.admin.data)[0]
    },
    head: state => state.admin.data[this.getAdminId].web.head,
    getHead(state) {
      if (this.getAdminId) {
        return state.admin.data[this.getAdminId].web.head
      }
    },
    //updateHead(e) {
    //  this.$store.commit('admin/updateHead', {head: e.target.value, id: this.getAdminId})
    //}
    //getDesc(state) {
    //  if (this.getAdminId) {
    //    return state.admin.data[this.getAdminId].web.desc
    //  }
    //}
  }),
  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show () {
      this.$refs.dialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    onOKClick () {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit('ok')
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide()
    },

    onCancelClick () {
      // we just need to hide dialog
      this.hide()
    }
  }
}
</script>