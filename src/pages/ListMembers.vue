<script setup>
const col = 'list_members'
</script>

<template>
  <q-page class="flex " style="margin: 20px">
    <ListTemplate :col="col" >
      <template v-slot:editors >
        <DBAvatar :col="col" fld="image" />
        <DBText :col="col" fld="name" />
        <DBDate :col="col" fld="birthday" />
        <DBText :col="col" fld="email" />
        <DBText :col="col" fld="phone" />
        <DBTags :col="col" fld="classes" />
        <DBChipCombo :col="col" fld="tags" />
      </template>
    </ListTemplate>
  </q-page>
</template>
