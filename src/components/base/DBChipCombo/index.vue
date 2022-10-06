<script setup>
import { state, action } from "src/stores/state";
import { ref, watch } from "vue";
import NewChip from './NewChip.vue';

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
    return { _id: o._id, name: o.name, color: o.color };
  })
);

watch(
  () => state.collections[f.lookup]?.rows,
  async (rows) => {
    options.value = rows.map((o) => {
      return { _id: o._id, name: o.name, color: o.color };
    })
  },
  { deep: false }
)


const filterFn = (val, update) => {
  let stringOptions = ref(
    lcr.map((o) => {
      return { _id: o._id, name: o.name, color: o.color };
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

const deleteRecord = async(rec) => {
  console.log('delete', rec)
  delete state.collections[p.col].record[p.fld].find(o => o._id == rec._id)
  action.beginEdit(f.lookup, rec)
  await action.flagRecordDeletion(f.lookup)
}




const newLabel = ref('')
const newValue = ref('')
const handleUpdate = (data) => {
    newLabel.value = data
}


// @input-value="handleUpdate"
// @new-value="handleUpdate"
// new-value-mode="add-unique"
</script>
<template>
    <q-select
        use-input use-chips multiple outlined

        behavior="menu"
        option-value="_id"
        option-label="name"
        input-debounce="300"


        :options="options"
        @filter="filterFn"


        :label="f?.label + z"
        :hint="f?.hint"
        :rules="f?.rules"
        v-model="c.record[f.name]"



        @input-value="handleUpdate"

    >
        <template v-slot:no-option>
          <q-item>
            <NewChip :label="newLabel"
              :col="col" :fld="fld" :lookup="f?.lookup"
            />
          </q-item>
        </template>
        <template v-slot:before-options>
            <q-item>
                <NewChip :label="newLabel"
                  :col="col" :fld="fld" :lookup="f?.lookup"
                />
            </q-item>
        </template>
        <!-- <template v-slot:option="scope">
          <q-item>
            <q-chip dense
              :color="scope.opt.color || 'grey'" text-color="white"
            >
              {{ scope.opt.name }}
            </q-chip>
            <q-icon name="delete" size="sm" color="grey" @click="deleteRecord(scope.opt)"/>
          </q-item>
        </template> -->

<template v-slot:option="scope">
      <q-item
              v-bind="scope.itemProps"

       >
          <q-item-section>
                <q-item-label v-html="scope.opt.name" />
          </q-item-section>
          <q-item-section side>

                <q-icon name="delete" size="sm" color="grey"  @click="deleteRecord(scope.opt)" />

            </q-item-section>
      </q-item>
</template>
        <template v-slot:selected-item="scope">
            <q-chip removable dense @remove="scope.removeAtIndex(scope.index)" :tabindex="scope.tabindex"
                :color="scope.opt.color || 'grey'" text-color="white" class="q-ma-xs">
                {{ scope.opt.name }}
            </q-chip>
        </template>
    </q-select>
</template>



<style lang="scss" scoped>
</style>
