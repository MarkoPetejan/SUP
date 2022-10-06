<script setup>
const col = 'list_coaches'
</script>

<template>
  <q-page class="flex " style="margin: 20px">
    <ListTemplate :col="col" >
      <template v-slot:editors >
        <!-- <DBText :col="col" fld="name" autofocus /> -->
      </template>
    </ListTemplate>
  </q-page>
</template>
