<template>
  <div class="bg-grey-3 q-pa-sm text-grey-9">
    <div class="row">
      <div class="text-h6 text-secondary q-pt-sm q-pb-md">
        <q-icon size="md" name="local_hospital" color="secondary" />
        Clínica
      </div>
    </div>

    <q-tabs
      v-model="tab"
      inline-label
      class="text-secondary"
    >
      <q-route-tab
        icon="inventory"
        to="/clinic"
        label="Tratamientos"
        exact
      />
      <q-route-tab
        icon="account_box"
        to="/clinic/clients"
        label="Clientes"
        exact
      />
      <q-route-tab
        icon="receipt"
        to="/clinic/sales"
        label="Ventas"
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
      tab: false,
    }
  }
}
</script>