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
const lcr = state.collections[f.lookup]?.rows || []

if (lcr.length == 0)
  action.getCollection(f.lookup);

let options = ref(
  lcr.map((o) => {
    return { _id: o._id, name: `${o.name}` };
  })
);

const filterFn = (val, update) => {
  let stringOptions = ref(
    lcr.map((o) => {
      return { _id: o._id, name: `${o.name}` };
    })
  );
  if (val === "") {
    update(() => {
      options.value = stringOptions.value;
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    options.value = stringOptions.value.filter(
      (v) => v.name.toLowerCase().indexOf(needle) > -1
    );
  });
};
</script>
<template>
  <q-select
    filled
    clerable
    option-value="_id"
    option-label="name"
    input-debounce="300"


    :options="options"
    @filter="filterFn"

    :label="f?.label + z"
    :hint="f?.hint"
    :rules="f?.rules"
    v-model="c.record[f.name]"

    use-input
    use-chips
    multiple
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey"> No results </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>






