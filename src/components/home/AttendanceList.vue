<template>
    <div v-for="item in membersWithAttendance" :key="item.id" class="q-py-sm" @click="setSelectedMember(item)">
        <div class="row q-gutter-md">
            <div class="col-shrink">
                <q-avatar v-if="item.image">
                    <img :src="item.image" onerror="this.style.display='none'" />
                </q-avatar>
                <q-avatar v-else icon="person" color="primary" text-color="white" />
            </div>
            <div class="row col-grow column">
                <div class="row justify-between">
                    <span class="text-weight-bold">
                        <q-icon v-if="isBirthdayToday(item.dateOfBirth)" name="cake" color="primary" />
                        {{ item.name }}
                    </span>
                    <span :class="getColor(item.percentage)">
                        {{ item.percentage }}%
                    </span>
                </div>
                <div class="row q-gutter-xs q-mt-xs text-capitalize">
                    <q-badge v-for="value in item.classes" rounded :color="value.color">
                        {{ value.label }}
                    </q-badge>
                    <q-badge v-for="tag in item.tags" rounded :color="tag.color">
                        {{ tag.label }}
                    </q-badge>
                </div>
            </div>
        </div>
    </div>
    <q-expansion-item v-if="membersWithoutAttendance.length">
        <template v-slot:header>
            <q-item-section>
                No presence
            </q-item-section>
            <q-item-section side>
                <q-badge class="text-grey-10" color="grey-4" rounded>
                    {{ membersWithoutAttendance.length }}
                </q-badge>
            </q-item-section>
        </template>
        <div v-for="item in membersWithoutAttendance" :key="item.id" class="q-py-sm" @click="setSelectedMember(item)">
            <div class="row q-gutter-md">
                <div class="col-shrink">
                    <q-avatar v-if="item.image">
                        <img :src="item.image" onerror="this.style.display='none'" />
                    </q-avatar>
                    <q-avatar v-else icon="person" color="primary" text-color="white" />
                </div>
                <div class="row col-grow column">
                    <div class="row justify-between">
                        <span class="text-weight-bold">
                            <q-icon v-if="isBirthdayToday(item.dateOfBirth)" name="cake" color="primary" />
                            {{ item.name }}
                        </span>
                        <span :class="getColor(item.percentage)">
                            {{ item.percentage }}%
                        </span>
                    </div>
                    <div class="row q-gutter-xs q-mt-xs text-capitalize">
                        <q-badge v-for="value in item.classes" :color="value.color" rounded>
                            {{ value.label }}
                        </q-badge>
                        <q-badge v-for="tag in item.tags" :color="tag.color" rounded>
                            {{ tag.label }}
                        </q-badge>
                    </div>
                </div>
            </div>
        </div>
    </q-expansion-item>
    <MemberDetailsDialog v-if="isMember" />
</template>

<script setup>
import { computed, inject, provide, ref } from 'vue';
import { isBirthdayToday } from 'src/helpers/birthdayCheck.js';
import MemberDetailsDialog from '../members/MemberDetailsDialog.vue';


const attendance = inject('attendance')

const selectedMember = ref(null)
const setSelectedMember = (member) => {
    selectedMember.value = member
}
const isMember = computed(() => {
    return !!selectedMember.value
})
provide('selectedMember', selectedMember)

const findPresence = (isPresent) => {
    const filtered = attendance.value.filter(item => item.percentage > 0 === isPresent)
    if (isPresent) {
        const sorted = filtered.sort((a, b) => b.percentage - a.percentage)
        return sorted
    }
    return filtered
}
const membersWithAttendance = ref(findPresence(true))
const membersWithoutAttendance = ref(findPresence(false))
const getColor = (value) => {
    const isPositive = value >= 50
    return {
        'text-positive': isPositive,
        'text-negative': !isPositive
    }
}

</script>

<style scoped>
</style>