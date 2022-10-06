<script setup>
import { provide, ref } from 'vue';
import { attendanceDummy, sessionsDummy, eventsDummy } from 'src/assets/DummyData';
import SessionsList from 'src/components/home/SessionsList.vue';
import AttendanceList from 'src/components/home/AttendanceList.vue';
import NewEntry from 'src/components/home/NewEntry.vue';

const events = ref(eventsDummy)
const sessions = ref(sessionsDummy)
const attendance = ref(attendanceDummy)
const tab = ref('sessions')
const selectedSession = ref(null)

const setSelectedSession = (session) => {
    selectedSession.value = session
}

provide('selectedSession', selectedSession)
provide('sessions', sessions)
provide('attendance', attendance)

</script>

<template>
    <q-page>
        <q-date :events="events" minimal flat style="width: 100%"> </q-date>
        <q-tabs active-color="primary" v-model="tab">
            <q-tab name="sessions" label="Sessions" />
            <q-tab name="attendance" label="attendance" />
        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="tab" animated swipeable>

            <q-tab-panel name="sessions">
                <NewEntry />
                <SessionsList @selectSession="setSelectedSession" />
            </q-tab-panel>

            <q-tab-panel name="attendance">
                <AttendanceList />
            </q-tab-panel>

        </q-tab-panels>
    </q-page>
</template>

<style scoped>
</style>
