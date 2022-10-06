<script setup>
const col = 'list_classes'
</script>

<template>
  <q-page class="flex " style="margin: 20px">
    <ListTemplate :col="col" >
      <template v-slot:editors >
        <DBText :col="col" fld="name" />
      </template>
    </ListTemplate>
  </q-page>
</template>
