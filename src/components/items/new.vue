<template>
  <div >
    <!-- create item btn -->
    <q-btn
      icon="add"
      class="q-my-md"
      color="red-5"
      label="crear"
      @click.prevent="newItem = !newItem"
    />
    <!-- new item dialog -->
    <q-dialog v-model="newItem" :persistent="true">
      <q-card class="q-dialog-plugin">
        <q-card-section>
          <div class="text-h6">Crear producto</div>
        </q-card-section>
        <!-- form -->
        <q-form @submit="onSubmit" @reset="onReset">
          <!-- title -->
          <q-card-section>
            <q-input
              filled
              placeholder="Título"
              v-model="item.name"
              label="Nombre *"
              hint="Nombre, detalle, peso, gama, etc"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Escribe algo']"
            />
          </q-card-section>
          <!-- qty -->
          <q-card-section>
            <q-input
              filled
              type="number"
              placeholder="Total en stock"
              v-model="item.qty"
              label="Cantidad *"
              hint="Cantidad total en stock"
              lazy-rules
              :rules="[
                //val => val && val.length > 0 || 'Escribe algo',
                val => val >= 0 || 'Mayor o igual que 0',
              ]"
            />
          </q-card-section>
          <q-card-section>
            <q-checkbox
              v-model="item.toSell"
              @click="item.toSell = !item.toSell"
              :label="item.toSell ? 'Vender producto' : 'No vender'"
              class=""
              color="primary" />
          </q-card-section>
          <!-- price -->
          <q-card-section v-if="item.toSell">
            <q-input
              filled
              :required="item.toSell ? true : false"
              type="number"
              suffix=",00"
              placeholder="Precio de venta"
              v-model="item.price"
              label="Precio *"
              hint="Precio de venta final"
              lazy-rules
              :rules="[
                //val => val && val.length >= 0 || 'Escribe algo',
                val => val > 0 || 'Un precio real'
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="attach_money" />
              </template>
            </q-input>
          </q-card-section>
          <!-- buttons -->
          <q-card-actions align="right">
            <q-btn
              flat
              @click.prevent="newItem = !newItem"
              color="grey-9"
              label="ATRAS"
            />
            <q-btn flat type="reset" color="primary" label="RESET" />
            <q-btn flat type="submit" color="primary" label="GUARDAR" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>

</template>

<script>
export default {
  methods: {
    onSubmit() {
      this.newItem = false
      // si no esta a la venta, resetear el precio
      if (!this.item.toSell) this.item.price = null
      this.$store.dispatch('items/set', this.item)
      this.onReset()
    },
    onReset() {
      this.item = {
        done: false,
        toSell: false,
        id: String(Date.now()),
        name: '',
        price: 0,
        qty: 0,
        //img: [],
        //vto: new Date()
      }
    }
  },

  data () {
    return {
      newItem: false,
      item: {
        done: false,
        toSell: false,
        id: String(Date.now()),
        name: '',
        price: 0,
        qty: 0,
        //img: [],
        //vto: new Date()
      }
    }
  }
}
</script>