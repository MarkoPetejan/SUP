<script setup>
import { state, action } from "src/stores/state";
import { ref } from "vue";

const p = defineProps({
  col: String,
  fld: String,
});

const c = state.collections[p.col]
const f = c.columns.find(o => o.name === p.fld)
const z = f.required ? ' *' : ''

const options = [
  'DBText',
  'DBLookup',
  'DBDate',
  'DBOptionPicker',
  'DBTags',
  'DBChipCombo',
  'DBCheckBox',
]


</script>
<template>
  <q-select
    filled
    option-value="_id"
    option-label="name"

    :options="options"
    :label="f?.label + z"
    :hint="f?.hint"
    :rules="f?.rules"
    v-model="c.record[f.name]"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey"> No results </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>






