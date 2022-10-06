
<script setup>
</script>

<template>
  <q-layout view="hHh lpR fFf">

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-white text-blue-grey-5 shadow-1">
      <q-tabs no-caps active-color="primary" indicator-color="transparent">
        <q-route-tab icon="o_home" label="Home" to="/" exact />
        <q-route-tab icon="o_payments" label="Payments" to="/payments" exact />
        <q-route-tab icon="o_people" label="Members" to="/members" exact />
        <q-route-tab icon="o_chat" label="Chat" to="/messages" exact alert="red" />
        <q-route-tab icon="more_horiz" to="/more" exact />
      </q-tabs>

    </q-footer>
    <!-- <q-footer elevated class="bg-grey-8 text-white">
    </q-footer> -->

  </q-layout>
</template>