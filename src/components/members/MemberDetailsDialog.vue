<template>
    <BaseDialog v-model="isOpen" @hide="deselectMember">
        <template v-slot:title>
            <q-icon v-if="isBirthdayToday(selectedMember.dateOfBirth)" name="cake" color="primary" />
            {{ selectedMember.name }}
        </template>
        <div class="text-center q-pb-md flex flex-center column">


            <q-avatar v-if="selectedMember.image" size="100px">
                <img :src="selectedMember.image" onerror="this.style.display='none'" />
            </q-avatar>
            <q-avatar v-else color="primary" text-color="white" size="100px">
                {{ selectedMember.name[0].toUpperCase() }}
            </q-avatar>

            <div class="row q-gutter-xs q-mt-md text-capitalize">
                <q-badge v-for="value in selectedMember.classes" rounded :color="value.color">
                    {{ value.label }}
                </q-badge>
                <q-badge v-for="tag in selectedMember.tags" rounded :color="tag.color">
                    {{ tag.label }}
                </q-badge>
            </div>
        </div>
        <q-tabs active-color="primary" v-model="tab">
            <q-tab name="general" label="general" />
            <q-tab name="payments" label="payments" />
            <q-tab name="attendance" label="attendance" />
        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="tab" animated swipeable>

            <q-tab-panel name="general">
                <MemberGeneralForm />
                <q-btn color="primary" label="add guardian" flat icon="add" />

            </q-tab-panel>

            <q-tab-panel name="payments">
                <MemberPayments />
            </q-tab-panel>
            <q-tab-panel name="attendance">
                <MemberAttendance />
            </q-tab-panel>

        </q-tab-panels>
    </BaseDialog>
</template>

<script setup>
import { isBirthdayToday } from 'src/helpers/birthdayCheck';
import { inject, ref } from 'vue';
import BaseDialog from '../UI/BaseDialog.vue';
import MemberGeneralForm from './MemberGeneralForm.vue';
import MemberPayments from './MemberPayments.vue';
import MemberAttendance from './MemberAttendance.vue';

const selectedMember = inject('selectedMember')
const isOpen = ref(!!selectedMember.value)
const tab = ref('general')

const deselectMember = () => {
    selectedMember.value = null
}

</script>

<style lang="scss" scoped>
</style>