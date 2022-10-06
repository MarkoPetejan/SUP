<script setup>
const col = 'collection_fields'
</script>

<template>
  <q-page class="flex " style="margin: 20px">
    <ListTemplate :col="col" >
      <template v-slot:editors >
        <DBText :col="col" fld="name" />
        <DBText :col="col" fld="label" />
        <DBFieldType :col="col" fld="field_type" />
        <DBWidgetType :col="col" fld="widget_type" />
        <DBCheckBox :col="col" fld="required" />
        <DBCheckBox :col="col" fld="visible" />
        <DBCheckBox :col="col" fld="sortable" />
      </template>
    </ListTemplate>
  </q-page>
</template>
