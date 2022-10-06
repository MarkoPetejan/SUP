<script setup>
import { state, action } from "src/stores/state";
import { useQuasar } from "quasar";
import { ref, watch } from 'vue'
import { useRoute } from "vue-router"

const p = defineProps({
  col: String,
  rows: Array,
  cards: Boolean
})

let q = useQuasar()
let route = useRoute()


if (!p.rows) {
  action.getCollection(p.col)
}

const c = state.collections[p.col];
c.dialog = false;

const links = c.columns.find(o => o.field == '_links')?.links

// route.params
// route.query

if (route.params?.pid) watch(
  () => state.collections[p.col]?.record,
  async (record) => {
    c.record._pid = route.params.pid
  },
  { deep: false }
)



</script>

<template>

    <div class="full-width full-height">
      <q-table
        row-key="_id"
        :title="c.title"
        :rows="(c.filteredRows || c.rows).filter(o => {
          if (!route.params?.pid) return true
          return o._pid == route.params.pid
        })"
        :columns="c.columns"

        :visible-columns="c.visibleColumns"
        :pagination="c.pagination"
        dense

        :loading="c.loading"
        :grid="p.cards"

      >
        <template v-slot:top-right>
          <q-separator vertical inset style="margin: 0 20px 0 20px" />
          <q-input
            borderless
            dense
            debounce="300"
            v-model="c.filter"
            placeholder="Search"
            clearable
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

          <div v-if="p.cards" style="width: 20px; margin-right: 14px; margin-left: 15px;">
            <q-btn
              color="primary"
              label=""
              @click="action.beginEdit(p.col, null)"
              icon="add_circle"
              no-caps
              dense
            >
              <q-tooltip>Add new</q-tooltip>
            </q-btn>
          </div>

        </template>

        <template v-slot:header-cell-_action>
          <q-th style="width: 20px">
            <q-btn
              color="primary"
              label=""
              @click="action.beginEdit(p.col, null)"
              icon="add_circle"
              no-caps
              dense
            >
              <q-tooltip>Add new</q-tooltip>
            </q-btn>
          </q-th>
        </template>


        <template v-slot:body-cell="props">
          <q-td :props="props">
            <div v-if="props.col.type == 'boolean'">
              <q-icon v-if="props.row[props.col.name]" name="checked"></q-icon>
            </div>
            <div v-if="props.col.type == 'string'">
              {{props.row[props.col.name]}}
            </div>
            <div v-if="props.col.type == 'image'">
              <q-img lazy rounded :src="props.row[props.col.name]" class="rounded-borders" style="width: 50px; height: 50px" />
            </div>
          </q-td>
        </template>

        <template v-slot:item="props">
          <q-card style="margin:5px; width:100%">


            <q-card-section >
              <slot name="carditem" :row="props.row" :col="props.colsMap">
                <div v-for="col in props.cols">
                  <div v-if="((col.visible) && (col.name[0] != '_')) ">
                    <div><b>{{col.label}}:</b></div>
                    <div>{{props.row[col.name]}}</div>
                  </div>
                </div>

              </slot>
            </q-card-section>

            <q-card-actions align="right">

              <q-btn-dropdown dense color="primary">
              <q-list v-for="link in links">
                <q-item clickable v-close-popup :href="link.route + '/' + props.row._id" >
                  <q-item-section v-if="link.icon" avatar>
                    <q-icon :name="link.icon" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{link.title}}</q-item-label>
                    <q-item-label caption>{{link.caption}}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>

            <q-btn
              color="primary"
              label=""
              @click="action.beginEdit(p.col, props.row)"
              icon="edit"
              no-caps
              dense
              style="margin-right: 5px;"
            >
              <q-tooltip>Changed: {{ action.formatDate(props.row._ts) }}</q-tooltip>
            </q-btn>

            </q-card-actions>

          </q-card>
        </template>

        <template v-if="links" v-slot:body-cell-_links="props">
          <q-td :props="props">

            <q-btn-dropdown dense color="primary">
              <q-list v-for="link in links">
                <q-item clickable v-close-popup :href="link.route + '/' + props.row._id" >
                  <q-item-section v-if="link.icon" avatar>
                    <q-icon :name="link.icon" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{link.title}}</q-item-label>
                    <q-item-label caption>{{link.caption}}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>

          </q-td>
        </template>

        <template v-slot:body-cell-_action="props">
          <q-td :props="props">
            <q-btn
              color="primary"
              label=""
              @click="action.beginEdit(p.col, props.row)"
              icon="edit"
              no-caps
              dense
            >
              <q-tooltip>Changed: {{ action.formatDate(props.row._ts) }}</q-tooltip>
            </q-btn>
          </q-td>
        </template>

      </q-table>

      <q-dialog
        v-model="c.dialog"
        persistent
        transition-show="scale"
        transition-hide="scale"
      >
        <q-card class="bg-white text-teal" style="max-width: 400px">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">{{ c.dialogTitle }}</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
          <q-card-section>
            <div class="q-pa-md">
              <q-form
                @submit="action.saveRecord(p.col)"
                @reset="action.flagRecordDeletion(p.col)"
                class="q-gutter-md"
                autocorrect="off"
                autocapitalize="off"
                autocomplete="off"
                spellcheck="false"
              >

                <slot name="editors" :row="c.record">
                  <component v-for="fld in c.columns" v-bind:is="fld.widget" :col="p.col" :fld="fld.name" />
                </slot>

                <div class="flex justify-center">
                  <q-btn label="Save" type="submit" color="primary" />
                  <q-btn label="Cancel" color="primary" flat class="q-ml-sm" v-close-popup />
                  <q-separator v-if="c.record._id" vertical inset style="margin: 0 5px 0 5px" />
                  <q-btn
                    v-if="c.record._id"
                    type="reset"
                    label="Delete"
                    color="red"
                    flat
                    class="q-ml-sm"
                    v-close-popup
                  />
                </div>
              </q-form>

            </div>
            <small v-if="c.record?._ts">Last changed: {{ action.formatDate(c.record._ts) }}</small>

          </q-card-section>
        </q-card>
      </q-dialog>

    </div>

</template>
