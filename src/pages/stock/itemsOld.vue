<script>
import { mapGetters } from 'vuex'

export default {
  mounted() {
    // open sync
    this.$store.dispatch('items/openDBChannel')
  },

  beforeDestroy () {
    // close sync
    this.$store.dispatch('items/closeDBChannel', { clearModule: true })
  },

  computed: {
    ...mapGetters(['items']),
  },

  methods: {
    handleDone(id) {
      console.log(id)
      this.$store.commit('handleDoneItems', id)
    },

    // save select
    onSubmit() {
      this.newItem = false
      this.$store.dispatch('items/set', this.item)
      this.onReset()
    },

    onReset() {
      this.item = {
        done: false,
        id: String(Date.now()),
        name: '',
        price: '',
        qty: '',
        //img: [],
        //vto: new Date()
      }
    }
  },

  data () {
    return {
      newItem: false,
      selected: [],
      visibleColumns: [ 'name', 'price', 'qty', 'id'],
      columns: [{
        name: 'name',
        label: 'Nombre',
        align: 'left',
        field: row => row.name,
        format: val => `${val}`,
        sortable: true
      },{
        name: 'price',
        align: 'center',
        label: 'Precio',
        field: row => row.price,
        format: val => `$ ${val}`,
        sortable: true
      },{
        name: 'qty',
        align: 'center',
        label: 'Cantidad',
        field: row => row.qty,
        format: val => `${val}`,
        sortable: true
      },{
        name: 'id',
        label: 'ID',
        align: 'center',
        field: row => row.id,
        format: val => `${val}`,
      }],
      item: {
        done: false,
        id: String(Date.now()),
        name: '',
        price: '',
        qty: null,
        //img: [],
        //vto: new Date()
      },
    }
  }
}
</script>

<template>
  <div class="bg-grey-3 text-grey-9">
    <q-table
      title="Productos"
      row-key="name"
      :data="items"
      :columns="columns"
      :selected.sync="selected"
      :visible-columns="visibleColumns"
    >
      <template v-slot:top>
        <!-- create item btn -->
        <q-btn
          icon="add"
          class="q-mx-md"
          color="primary"
          label="crear"
          @click.prevent="newItem = !newItem"
        />
        <q-space />
        <q-input borderless dense debounce="300" color="primary" v-model="filter">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td
            v-for="(col, key) in props.cols"
            :key="col.name"
            :props="props"
            :class="? id"
            @click="$router.push('/stock/items/' + props.cols[props.cols.length - 1].value)"
            style="cursor: pointer"
          >
            {{ col.value + col.name}}
          </q-td>
        </q-tr>
      </template>
    </q-table>

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
              :rules="[ val => val && val.length > 0 || 'Por favor, escribe algo']"
            />
          </q-card-section>
          <!-- price -->
          <q-card-section >
            <q-input
              filled
              type="number"
              suffix=",00"
              placeholder="Precio de venta"
              v-model="item.price"
              label="Precio *"
              hint="Precio de venta final"
              lazy-rules
              :rules="[
                val => val && val.length > 0 || 'Por favor, escribe algo',
                val => val > 0 || 'Please type a real price'
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="attach_money" />
              </template>
            </q-input>
          </q-card-section>
          <!-- price -->
          <q-card-section>
            <q-input
              filled
              type="number"
              placeholder="Cantidad actual"
              v-model="item.qty"
              label="Cantidad *"
              hint="Cantidad total actual"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor, escribe algo']"
            />
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
