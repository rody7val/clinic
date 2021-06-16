<template>
  <div class="bg-grey-3 q-pa-sm text-grey-9">
    <div class="row">
      <div class="text-h6 text-red-5 q-pt-sm q-pb-md">
        <q-icon size="md" name="storefront" color="red-5" />
        Tienda
      </div>
    </div>

    <q-tabs
      v-model="tab"
      inline-label
      indicator-color="red-5"
      class="text-red-5"
    >
      <q-route-tab
        icon="inventory"
        to="/stock"
        label="Productos"
        exact
      />
      <q-route-tab
        icon="account_box"
        to="/stock/suppliers"
        label="Proveedores"
        exact
      />
      <q-route-tab
        icon="receipt"
        to="/stock/buys"
        label="Compras"
        exact
      />
    </q-tabs>

    <router-view></router-view>
  </div>

</template>

<script>

export default {
  data () {
    return {
      tab: 0,
    }
  }
}
</script>