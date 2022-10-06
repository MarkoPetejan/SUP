<script setup>
import { state, action } from "src/stores/state";


const p = defineProps({
  col: String,
  fld: String,
});

const c = state.collections[p.col]
const f = c.columns.find(o => o.name === p.fld)
const z = f.required ? ' *' : ''

</script>
<template>
  <q-select
    filled
    clerable
    input-debounce="300"
    option-value="_id"
    option-label="naziv"

    :options="f?.options || []"

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






