<script setup>
import { state } from "src/stores/state"
const p = defineProps({
  col: String,
  fld: String,
});

const c = state.collections[p.col]
const f = c.columns.find(o => o.name === p.fld)
const z = f.required ? ' *' : ''
</script>

<template>

    <q-input
      filled
      clerable
      mask="date"
      :label="f?.label + z"
      :hint="f?.hint"
      v-model="c.record[f.name]"
      :rules="f.rules"
      >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="c.record[f.name]" >
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

</template>
