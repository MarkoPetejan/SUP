<script setup>
import { state, action } from "src/stores/state";
import { useQuasar } from "quasar";
import { ref, watch } from 'vue'

const p = defineProps({
    col: String,
    rows: Array
})

let q = useQuasar()


if (!p.rows) {
    action.getCollection(p.col)
}

const c = state.collections[p.col];
c.dialog = false;






// watch(
//   () => state.collections[p.col].filter,
//   async (terms) => {
//     if ((terms) && (terms.length > 3)) {
//       console.log('terms 1', terms)
//       c.filteredRows = await action.ftsSearchMethod_AND(p.col, terms)
//     } else {
//       console.log('terms 2', terms)
//       c.filteredRows = null
//     }
//   },
//   { deep: true }
// )


</script>

<template>
    <div class="full-width full-height">

        <q-table row-key="_id" :title="c.title" :rows="c.filteredRows || c.rows" :columns="c.columns"
            :visible-columns="c.visibleColumns" :pagination="c.pagination" dense :grid="q.screen.xs"
            :loading="c.loading" card-container-class="column q-col-gutter-sm">
            <template v-slot:top-right>
                <q-separator vertical inset style="margin: 0 20px 0 20px" />
                <q-input borderless dense debounce="300" v-model="c.filter" placeholder="Search" clearable>
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </template>

            <template v-slot:header-cell-_action>
                <q-th style="width: 20px">
                    <q-btn color="primary" label="" @click="action.beginEdit(p.col, null)" icon="add_circle" no-caps
                        dense>
                        <q-tooltip>Add new</q-tooltip>
                    </q-btn>
                </q-th>
            </template>

            <template v-slot:body-cell-_action="props">
                <q-td :props="props">
                    <q-btn color="primary" label="" @click="action.beginEdit(p.col, props.row)" icon="edit" no-caps
                        dense>
                        <q-tooltip>Changed: {{ action.formatDate(props.row._ts) }}</q-tooltip>
                    </q-btn>
                </q-td>
            </template>

            <!-- card view template -->
            <template v-slot:item="props">
                <div class="row q-gutter-md">
                    <div class="col-shrink">
                        <q-avatar icon="person" color="primary" text-color="white" />
                    </div>
                    <div class="row col-grow column">
                        <div class="row justify-between">
                            <span class="text-weight-bold">
                                {{ props.row.name }}
                            </span>
                            <span :class="text - positive">
                                80%
                            </span>
                        </div>
                        <div class="row q-gutter-xs q-mt-xs text-capitalize">
                            <q-badge color="blue" rounded>
                                začetniki
                            </q-badge>
                            <q-badge color="blue" rounded>
                                6.KYU
                            </q-badge>
                        </div>
                    </div>
                </div>
            </template>

        </q-table>

        <q-dialog v-model="c.dialog" persistent transition-show="scale" transition-hide="scale">
            <q-card class="bg-white text-teal" style="max-width: 400px">
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">{{ c.dialogTitle }}</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>
                <q-card-section>
                    <div class="q-pa-md">
                        <q-form @submit="action.saveRecord(p.col)" @reset="action.flagRecordDeletion(p.col)"
                            class="q-gutter-md" autocorrect="off" autocapitalize="off" autocomplete="off"
                            spellcheck="false">

                            <slot name="editors" :r="c.record"></slot>

                            <div class="flex justify-center">
                                <q-btn label="Save" type="submit" color="primary" />
                                <q-btn label="Cancel" color="primary" flat class="q-ml-sm" v-close-popup />
                                <q-separator v-if="c.record._id" vertical inset style="margin: 0 5px 0 5px" />
                                <q-btn v-if="c.record._id" type="reset" label="Delete" color="red" flat class="q-ml-sm"
                                    v-close-popup />
                            </div>
                        </q-form>

                    </div>
                    <small v-if="c.record?._ts">Last changed: {{ action.formatDate(c.record._ts) }}</small>
                </q-card-section>
            </q-card>
        </q-dialog>

    </div>

</template>

<style>
</style>