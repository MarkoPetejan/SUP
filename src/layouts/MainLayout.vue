
<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const userCredential = JSON.parse(localStorage.getItem('userCredential'))
const userEmail = userCredential?.email || 'no email'



import routes from "src/router/routes.js";
const linksList = [];
routes.forEach((route) => {
  if (route.meta) {
    let l = route.meta;
    if (!l.link) l.link = route.path;
    linksList.push(l);
  }
});



const essentialLinks = linksList
const leftDrawerOpen = ref(false)
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

</script>

<template>
  <q-layout view="hHh LpR lFf">
    <!-- <q-header class="bg-white text-grey-10" bordered> -->
    <q-header bordered class="bg-mordicom">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>

      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-img class="" src="/material.webp" style="height: 150px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="/boy-avatar.webp" />
          </q-avatar>
          <div class="text-weight-bold">Razvan Stoenescu</div>
          <div>{{ userEmail }}</div>
        </div>
      </q-img>

      <q-list>
        <q-item-label header> Essential Links </q-item-label>
        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
