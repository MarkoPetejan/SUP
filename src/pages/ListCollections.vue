<script setup>
const col = 'list_collections'
</script>

<template>
  <q-page class="flex " style="margin: 20px">
    <ListTemplate :col="col" cards >

      <template v-slot:editors="item" >
        <DBText :col="col" fld="name" />
        <DBText :col="col" fld="title" />
      </template>

      <template v-slot:carditem="item">

        <b>{{item.col.title.label}}:</b> {{item.row.title}}<br>
        <b>{{item.col.name.label}}:</b> <q-chip>{{item.row.name}}</q-chip>
      </template>

    </ListTemplate>
  </q-page>
</template>
