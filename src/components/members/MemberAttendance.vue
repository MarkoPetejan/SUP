<template>
    <q-date :events="events" minimal flat style="width: 100%"> </q-date>
    <SessionsList @selectSession="setSelectedSession" />
</template>

<script setup>
import { eventsDummy, sessionsDummy } from 'assets/DummyData.js';
import { provide, ref } from 'vue';
import SessionsList from '../home/SessionsList.vue';

const events = ref(eventsDummy)
const sessions = ref(sessionsDummy)
const selectedSession = ref(null)

const setSelectedSession = (session) => {
    selectedSession.value = session
}

provide('selectedSession', selectedSession)
provide('sessions', sessions)
</script>

<style lang="scss" scoped>
</style>