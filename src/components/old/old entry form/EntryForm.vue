<!-- This component have separated forms for details and attendance. first plan was also to create wizard which you fill form step by step. see first design in figma. its possible to return to this UX in future -->
<template>

    <NewSessionDetails />
    <BaseTextSeparator>Attendance</BaseTextSeparator>
    <NewSessionAttendance />
    <!-- <q-stepper v-model="step" header-nav ref="stepper" color="primary" animated flat alternative-labels>
        <q-step :name="1" title="Details" icon="info" :done="step > 1">
            <NewSessionDetails />
        </q-step>

        <q-step :name="2" title="Attendance" icon="people" :done="step > 2">
            <NewSessionAttendance />
        </q-step>

        <template v-slot:navigation>
            <q-stepper-navigation>
                <q-btn @click="stepper.next()" color="primary" :label="step === 2 ? 'Finish' : 'Continue'" />
                <q-btn v-if="step > 1" flat color="primary" @click="stepper.previous()" label="Back" class="q-ml-sm" />
            </q-stepper-navigation>
        </template>

    </q-stepper> -->
</template>

<script setup>
// import { ref } from 'vue';
import NewSessionDetails from './NewSessionDetails.vue';
import NewSessionAttendance from './NewSessionAttendance.vue';
import BaseTextSeparator from './UI/BaseTextSeparator.vue';

// const step = ref(1)
// const stepper = ref(null)



</script>

<style scoped>
</style>