import { reactive, watch } from 'vue'
// we import all of `date`
import { date } from 'quasar'
// destructuring to keep only what is needed
const { formatDate } = date

import { openDB } from 'idb';
let idb = null

const idbName = 'littera-lis-43a10'

console.log('STATE state.js pred getAuth')

import { getAuth, connectAuthEmulator } from "firebase/auth";
const auth = getAuth();
//connectFunctionsEmulator(func, "localhost", 5001)
//connectAuthEmulator(auth, "http://localhost:9099")


import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  setDoc,
  limit,
  getDocs,
  serverTimestamp,
  where,
  orderBy,
  enableIndexedDbPersistence,
} from "firebase/firestore";
import { OPEN_BLOCK } from '@vue/compiler-core';
const fsdb = getFirestore();
//enableIndexedDbPersistence(fsdb)


const textSort = (a, b) => { return (a > b ? 1 : (a === b ? 0 : -1)) }

export const state = reactive({
  settings: null,
  screen: null,
  formatting: {
    datetime: 'DD. MM. YYYY HH:mm:ss',
    date: 'DD. MM. YYYY',
    time: 'HH:mm:ss',
  },
  collections: {


    list_coaches: {
      title: 'Coaches list',
      columns: [
        { field: "name", label: "Name", type: 'string', widget: 'DBText'},
      ]
    },

    list_classes: {
      title: 'Classes list',
      columns: [
        { field: "name", label: "Name", type: 'string', widget: 'DBText'},
      ]
    },

    list_tags: {
      title: 'Tags list',
      columns: [
        { field: "name", label: "Name", type: 'string', },
        { field: "color", label: "Color", type: 'string', },
      ]
    },

    list_members: {
      title: 'Members list',
      columns: [
        { field: "image", label: "Avatar", type: 'image'},
        { field: "name", label: "Name", type: 'string', },
        { field: "birthday", label: "Birthday", type: 'date', },
        { field: "email", label: "Email", type: 'string', required: false, },
        { field: "phone", label: "Phone", type: 'string', required: false, },
        { field: "classes", label: "Classes", type: 'lookup', lookup: 'list_classes',
          sortable: false,
          format: (o) => { return o?.map(e => e.name).join(', ') }
        },
        { field: "tags", label: "Tags", type: 'lookup', lookup: 'list_tags',
          required: false, visible: true,
          sortable: false,
          format: (o) => { return o?.map(e => e.name).join(', ') }
        },
      ]
    },

    list_collections: {
      title: 'Collections',
      // subcollections: [
      //   'collection_columns'
      // ],
      columns: [
        { field: "name", label: "Name", type: 'string', },
        { field: "title", label: "Title", type: 'string', },
        //{ field: "collection_columns", label: "Columns", type: 'subcollection'},
        { field: "_links", label: "", type: 'links', links: [
          { route: '/collection-fields', title: 'Fields', caption: '', icon: 'list' },
        ]},
      ]
    },

    collection_fields: {
      title: 'Collection fields',
      // type: 'subcollection',
      // foreignKeys: [
      //   {
      //     collection: 'list_collections',
      //     field: 'collection_columns',
      //   }
      // ],
      columns: [
        { field: "name", label: "Name", type: 'string', },
        { field: "label", label: "Label", type: 'string', },
        { field: "field_type", label: "Field type", type: 'string', },
        { field: "widget_type", label: "Widget type", type: 'string', },

        { field: "required", label: "Required", type: 'boolean', },
        { field: "visible", label: "Visible", type: 'boolean', },
        { field: "sortable", label: "Sortable", type: 'boolean', },
      ]
    },


  },
})

//import jsm from "./kolekcije.js"
//state.collections = jsm
//console.log(state.collections)






const init = async (currentUser) => {
  if (!currentUser?.tenantId) return
  console.log('INIT currentUser', currentUser)

  state.currentUser = currentUser
  state.tenantId = currentUser?.tenantId

  console.log('INIT IMA NAPAKO. Odpira lookupe najbrž in to še preden je user logiran')
  idb = await openDB(idbName, new Date().getTime(), {
    upgrade(db) {

      Object.keys(state.collections).forEach((collectionName) => {
        try {
          const tbl = db.createObjectStore(collectionName, { keyPath: '_id' });
          tbl.createIndex('words', '_fts', { unique: false, multiEntry: true, });
        } catch (e) {
          console.log(e.message)
        }
      })




      try {
        db.createObjectStore('settings');
      } catch (e) {
        console.log(e.message)
      }


    },
  });


  Object.keys(state.collections).forEach((collectionName) => {
    let col = state.collections[collectionName]
    // col.columns.push({
    //   name: "_ts",
    //   field: "_ts",
    //   label: "Changed",
    //   align: "right",
    //   format: (val, row) => formatDate(val, state.formatting.datetime),
    //   type: "datetime",
    //   sortable: true,
    //   visible: false,
    // })
    col.columns.push({ name: "_action", label: "", align: "right" })
    if (col.columns[0].name !== '_id')
      col.columns = [{ name: "_id", field: "_id", label: "DBID", align: "left", visible: false, type: 'string', }, ...col.columns]
    col.recId = null
    col.record = {}
    col.emptyRecord = {}
    col.rows = []
    col.filter = null
    col.filteredRows = null
    col.dialog = false
    col.loaded = false
    col.state = 'closed'
    col.loading = false

    watch(
      () => col.filter,
      async (terms) => {
        if ((terms) && (terms.length > 3)) {
          col.filteredRows = await action.ftsSearchMethod_AND(collectionName, terms)
        } else {
          col.filteredRows = null
        }
      },
      { deep: false }
    )


    col.unsubscribeGrid = () => { }
    col.unsubscribeEdit = () => { }
    if (!col.visibleColumns) {
      col.visibleColumns = []
      col.pagination = {
        sortBy: 'naziv', //string column name
        descending: true, //boolean
        rowsPerPage: 10,
      }
      col.columns.forEach((c) => {

        if (!c.hasOwnProperty('visible')) c.visible = true
        //if (c.name == '_id') c.visible = false
        //if (c.field == '_id') c.visible = false
        if (c.visible === true) {
          col.visibleColumns.push(c.name)
          if (col.pagination.sortBy == '') col.pagination.sortBy = c.name // NE DELA, poglej template...  default sort po prvem vidnem polju (tipično naziv)
        }
        if (c.hasOwnProperty('field')) {
          col.record[c.field] = null
          col.emptyRecord[c.field] = null
          if (!c.hasOwnProperty('type')) c.type = 'string' // default
          if (!c.hasOwnProperty('name')) c.name = c.field
        }
        if (c.hasOwnProperty('lookup')) {
          action.getCollection(c.lookup)
          if (!c.hasOwnProperty('format')) c.format = (o) => o?.name
          if (!c.hasOwnProperty('sort')) c.sort = (a, b) => textSort(a?.name, b?.name)
        }
        if ((!c.hasOwnProperty('required')) && (c.field !== '_id') && (c.visible !== false)) c.required = true
        if ((c.required) && (!c.rules)) c.rules = [(val) => (val && ((val != null) || (val.length > 0))) || 'Podatek je obvezen']
        if (!c.hasOwnProperty('sortable')) c.sortable = true
        if (!c.hasOwnProperty('align')) {
          c.align = 'right'
          if (c.type === 'string') c.align = 'left'
          if (c.type === 'lookup') c.align = 'left'
        }
        if ((c.type === 'datetime') && (!c.hasOwnProperty('format'))) c.format = (val) => formatDate(val, state.formatting.date)


      })
    }
  })

  navigator.storage.estimate().then(res => state.storageQuota = res)


  if (!state.settings) state.settings = {}
  const store = idb.transaction('settings').objectStore('settings')
  store.get(0).then(res => {
    state.settings = res || {}
    watch(
      () => state.settings,
      async (settings, prevSettings) => {
        const data = copyObj(settings)
        console.log('settings changed', data)
        const tx = idb.transaction('settings', 'readwrite');
        await Promise.all([
          tx.store.put(data, 0),
          tx.done,
        ]);
      },
      { deep: true }
    )
  })


  //await customObdelave()
}
//init()

auth.onAuthStateChanged(async (currentUser) => {
  if (!auth.currentUser) return
  const token = await auth.currentUser.getIdTokenResult()
  //console.log('currentUser', token.claims.tenantId)
  //if (currentUser) init(currentUser)
  init(token.claims)
})


const copyObj = (val) => JSON.parse(JSON.stringify(val))

const formatData = (collectionName, d) => {
  const col = state.collections[collectionName]

  Object.keys(d).forEach((fld) => {
    if (d[fld]) {
      let isTimestamp = typeof d[fld]?.toDate === 'function'
      if (isTimestamp) d[fld] = d[fld].toDate()
    }
  })


  col.columns.forEach((c) => {
    if (c.hasOwnProperty('field')) {
      if (d.hasOwnProperty(c.field)) {
        if (c.type === 'string') d[c.field] = d[c.field].toString()
        if (c.type === 'boolean') d[c.field] = Boolean(d[c.field])
        if (c.type === 'integer') d[c.field] = parseInt(d[c.field])
        if (c.type === 'float') d[c.field] = parseFloat(d[c.field])
        if (c.type === 'datetime') {
          //console.log(d, c.field, d[c.field], typeof d[c.field])
          //if (d[c.field].hasOwnProperty('toDate')) d[c.field] = d[c.field].toDate()
          //if (typeof d[c.field] === 'object') d[c.field] = new Date(d[c.field].seconds)

        }
        if (c.type === 'map') d[c.field] = copyObj(d[c.field])
        if (c.type === 'geopoint') d[c.field] = copyObj(d[c.field]) // {latitude, longitude}
        //if (c.type === 'array') d[c.field] = copyObj(d[c.field])
        if (c.type === 'arraymap') d[c.field] = Object.keys(d[c.field])
        if (c.type === 'lookup') d[c.field] = copyObj(d[c.field])
      }
    }
  })
  return d
}


export const action = {
  /*   notify(message, color = 'red-5', textColor = 'white', icon = 'warning', progress = true,) {
      $q.notify({
        color,
        textColor,
        icon,
        message,
        progress,
      });
    }, */

  formatDate(dateString)  {
    return formatDate(dateString, state.formatting.datetime)
  },

  ftsWordsArray(terms) {
    const flattenObj = (obj, parent, res = {}) => {
      for(let key in obj){
          let propName = parent ? parent + '_' + key : key;
          if(typeof obj[key] == 'object'){
              flattenObj(obj[key], propName, res);
          } else {
              res[propName] = obj[key];
          }
      }
      return res;
    }
    terms = copyObj(terms)
    if (!terms) terms = ''
    if (typeof terms == 'object') {
      delete terms._id
      delete terms._ts
      delete terms._del
      delete terms.fts
      delete terms._fts
      terms = Object.values(flattenObj(terms))
    }
    if (typeof terms != 'string') terms = terms.toString()
    const words =
      terms
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .match(/(\w+)/g)
        //.filter(w => w.length >= 3)
        || [];
    const fts = [...new Set(words)]
    return fts
  },

  async getCollection(collectionName, skipLocal) {
    if (!idb) {
      console.log('Database not available in "getCollection"')
      idb = await openDB(idbName);
    }

    //state.tenantId = 'aOCZrlIgqSEVsW4T0KvG'
    const remoteCollectionName = `userData/${state.tenantId}/${collectionName}`

    console.log('getCollection start')
    const col = state.collections[collectionName]
    col.loading = false
    const t1 = new Date().getTime()
    const data = []
    let lastDataTs = new Date(0)
    let cnt = 0

    if (!skipLocal) {
      console.log('loading local')
      col.loading = true

      let cursor = await idb.transaction(collectionName).store.openCursor()
      while (cursor) {
        let d = cursor.value
        if (!d._ts) cursor.value._ts = 0
        if (d._ts > lastDataTs) lastDataTs = d._ts
        if (!d._del) { // ignoriraj tiste ki imajo deleted flag
          cnt++
          data.push(d)
        }
        cursor = await cursor.continue()
      }

      col.rows = data
      col.lts = lastDataTs
      col.loaded = true
      col.loading = false
      col.state = 'active'
      const t2 = new Date().getTime()
      console.log(collectionName, 'record count:', cnt, 'load time:', t2 - t1, 'ms', 'records/s:', Math.round(1000 * cnt / (t2 - t1)))
    }
    let q = query(collection(fsdb, remoteCollectionName));
    q = query(q, where('_ts', '>', col.lts))
    q = query(q, orderBy('_ts', 'asc'))  // premisli - če bi prekinil začetni load in ta ne bi bil v eni transakciji. za nadaljevanje naslednjič rabimo da so naloženi po vrsti od najstarejšega
    //q = query(q, limit(10))

    let t3a = new Date().getTime()
    col.unsubscribeGrid = onSnapshot(q, async (querySnapshot) => {
      console.log('loading subscription')
      col.loading = true
      const cnt = querySnapshot.docs.length
      if (cnt === 0) {
        col.loading = false
        return
      }
      const t3 = new Date().getTime()
      console.log('on data change', collectionName, 'changes count',cnt, t3-t3a)
      const tx = idb.transaction(collectionName, 'readwrite');

      querySnapshot.docChanges().forEach(async (change) => {
        //console.log('doc change event', change)
        let d = { _id: change.doc.id, ...change.doc.data() };
        d = formatData(collectionName, d)
        if (!d._ts) d._ts = 0
        if (d._ts > col.lts) col.lts = d._ts
        if (d.fts) delete d.fts // ZAČASNO !!!! briši če je priletel iz baze (po starem)
        d._fts = action.ftsWordsArray(d) // naredi full text search index
        //console.log(action.ftsWordsArray(d))
        if (change.type === "added") {
          //console.log('added', d) // če je where timestamp, so vsi added, removed pa sploh ne dobimo
          await tx.store.put(d)
        }
        if (change.type === "modified") {
          //console.log('modified', d)
          await tx.store.put(d)
        }
        if (change.type === "removed") {
          //console.log('removed', d)
          await tx.store.delete(d._id)
        }
      })

      await tx.done
      await col.unsubscribeGrid()
      const t4 = new Date().getTime()
      console.log('snapshot time:', t4 - t3, 'ms')
      col.loading = false
      action.getCollection(collectionName);
    })

  },




  beginEdit(collectionName, rowData) {
    const remoteCollectionName = `userData/${state.tenantId}/${collectionName}`
    const col = state.collections[collectionName]
    const _pid = col.record?._pid || null
    if (!col) {
      console.error('Ne najdem definicije za ' + collectionName)
    }
    if (rowData) {
      // edit
      col.dialogTitle = 'Change record'
      col.recId = rowData._id
      col.record = copyObj(rowData)

    } else {
      // insert
      col.dialogTitle = 'Add new record'
      col.record = copyObj(col.emptyRecord)
      col.recId = doc(collection(fsdb, remoteCollectionName)).id;
    }
    col.columns.forEach((c) => {
      if ((c.hasOwnProperty('field')) && (c.hasOwnProperty('default')) && (!col.record[c.field])) {
        console.log((col.columns.find(o => o.field == c.field).default))
        col.record[c.field] = col.columns.find(o => o.field == c.field).default
      }
    })
    if (_pid) col.record._pid = _pid
    col.dialog = true;
  },
  async saveRecord(collectionName) {
    const remoteCollectionName = `userData/${state.tenantId}/${collectionName}`
    const col = state.collections[collectionName]
    col.dialog = false;
    const id = col.record._id
    delete col.record._id
    delete col.record._fts
    col.record._ts = new Date() // serverTimestamp()
    col.columns.forEach((c) => {
      console.log('polje', c)
      if (c.hasOwnProperty('field')) {
        if (col.record.hasOwnProperty(c.field)) {
          if (c.type === 'string') col.record[c.field] = col.record[c.field]?.toString() || col.record[c.field]
          if (c.type === 'boolean') col.record[c.field] = Boolean(col.record[c.field])
          if (c.type === 'integer') col.record[c.field] = parseInt(col.record[c.field])
          if (c.type === 'float') col.record[c.field] = parseFloat(col.record[c.field])
          if (c.type === 'datetime') col.record[c.field] = new Date(col.record[c.field])
          if (c.type === 'map') col.record[c.field] = copyObj(col.record[c.field])
          if (c.type === 'geopoint') col.record[c.field] = copyObj(col.record[c.field])
          if (c.type === 'array') col.record[c.field] = copyObj(col.record[c.field]) //??? dela ???
          if (c.type === 'arraymap') {
            let f = {}
            col.record[c.field].map(o => f[o] = true)
            col.record[c.field] = f
          }
        }
      }
    })
    col.record._ts = serverTimestamp()
    if (id) {
      // edit record
      console.log('before edit record', col.record)
      const docRef = doc(fsdb, remoteCollectionName, id);
      return await setDoc(docRef, col.record, { merge: true });
    } else {
      // add record
      console.log('before add record', col.record)
      //return await addDoc(collection(fsdb, remoteCollectionName), col.record);
      const docRef = doc(fsdb, remoteCollectionName, col.recId);
      return await setDoc(docRef, col.record, { merge: true });
    }

  },
  async deleteRecord(collectionName) {  // ne moremo brisat sinhroniziranih collectionov na spremembe glede na timestamp!
    const remoteCollectionName = `userData/${state.tenantId}/${collectionName}`
    const col = state.collections[collectionName]
    col.dialog = false;
    console.log('before delete record', col.record)
    await deleteDoc(doc(fsdb, remoteCollectionName, col.record._id));
  },
  async flagRecordDeletion(collectionName) {
    const remoteCollectionName = `userData/${state.tenantId}/${collectionName}`
    const col = state.collections[collectionName]
    col.dialog = false;
    console.log('before delete with flag record', col.record)
    //await deleteDoc(doc(fsdb, collectionName, col.record._id));
    col.record._ts = serverTimestamp()
    col.record._del = true
    const id = col.record._id
    const docRef = doc(fsdb, remoteCollectionName, id);
    setDoc(docRef, col.record, { merge: true });
  },

  ftsFilterMethod_OR (rows, terms, cols) {
    const words =
      terms
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .match(/(\w+)/g)
        .filter(w => w.length >= 3) || [];

    return rows.filter((o) => o.fts.some(r => words.includes(r.toString())));
  },

  ftsFilterMethod_AND (rows, terms, cols) {
    const words =
      terms
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .match(/(\w+)/g)
        .filter(w => w.length >= 3) || [];

    let t1 = new Date().getTime()
    //let zadetki =  rows.filter((o) => words.every(r => o.fts.includes(r.toString())));
    let zadetki =  rows.filter((o) => {
      if (!o.fts) o.fts = []
      return words.every(r => o.fts.includes(r.toString()))
    });
    let t2 = new Date().getTime()
    console.log('filter and', t2-t1)
    return zadetki
  },

  async ftsSearchMethod_AND (colectionName, terms) {

    const words =
      terms
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .match(/(\w+)/g)
        .sort((a,b) => { return b.length - a.length || b.localeCompare(a) }) // desc po dolžini in abecedno po vsebini
        //.filter(w => w.length >= 3)
        || []

    if (words.length === 0) return []



    let t1 = new Date().getTime()
    let srch = words[0]
    srch = IDBKeyRange.bound(srch, srch + '\uf8ff');
    let zadetki = await idb.getAllFromIndex(colectionName, 'words', srch)
    let firstPassCount = zadetki.length

    let zadetki2 = []
    const wordCount = words.length
    zadetki.forEach(zadetek => {
      let wordHits = 0
      words.forEach(srchWord => {
        zadetek._fts.forEach(ftsWord => {
          if (ftsWord.includes(srchWord)) wordHits++
        })
      })
      if (wordHits == wordCount) zadetki2.push(zadetek)
    })


    let secondPassCount = zadetki2.length
    let t2 = new Date().getTime()
    console.log('indexed+filtered search', words, 'in', t2-t1, 'first pass count', firstPassCount, 'second pass count', secondPassCount)

    return zadetki2
  }



}















