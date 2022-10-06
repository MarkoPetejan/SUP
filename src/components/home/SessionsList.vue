<template>
    <div v-for="item in sessions" :key="item.id" class="q-py-sm" @click="emit('selectSession', item)">
        <div class="row justify-between text-weight-bold text-uppercase">
            <div class="row q-gutter-sm">

                <div v-for="classItem in item.classes">
                    {{ classItem.label }}
                </div>
            </div>
            <span>{{ formattedDate(item.date) }}</span>
        </div>
        <div class="row justify-between">
            <span>{{ item.couch }}</span>
            <div class="row items-center">
                <BaseAvatarGroup :items="attendeesImages(item.attendees)" :max="3" :height="22" :width="22" />
            </div>
        </div>
        <div class="row q-gutter-xs q-mt-xs text-capitalize">
            <q-badge v-for="tag in item.tags" rounded :color="tag.color">
                {{ tag.label }}
            </q-badge>
        </div>
    </div>
    <div v-if="isSession">
        <BaseDialog v-model="isOpen" title="Edit entry">
            <EntryForm :data="selectedSession" />
        </BaseDialog>
    </div>
    <!-- <SessionDetailsDialog v-if="isSession" /> -->
</template>

<script setup>
import { computed, inject, ref } from 'vue';
import { date } from 'quasar'
import BaseAvatarGroup from '../UI/BaseAvatarGroup.vue';
import EntryForm from './EntryForm.vue';
import BaseDialog from '../UI/BaseDialog.vue';

const emit = defineEmits(['selectSession'])

const sessions = inject('sessions')
const selectedSession = inject('selectedSession')
const isOpen = ref(!!selectedSession.value)
const formattedDate = (data) => {
    if (!data) return null
    return date.formatDate(data, 'ddd D.M.YYYY, H:mm')
}

const attendeesImages = (data) => {
    const images = data.map(item => item.image)
    return images
}

const isSession = computed(() => {
    isOpen.value = !!selectedSession.value
    return !!selectedSession.value
})
</script>

<style  scoped>
</style>