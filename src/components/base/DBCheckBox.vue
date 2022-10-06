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
    <q-checkbox
      :label="f?.label + z"
      :hint="f?.hint"
      lazy-rules
      :rules="f?.rules"
      v-model="c.record[f.name]"
    />
  </template>
