<template>
    <q-btn flat round dense icon="edit" @click="handleOpenDialog" />

    <BaseDialog v-model="isOpen" title="Edit entry">
        <EntryForm :data="selectedSession" />
    </BaseDialog>
</template>

<script setup>
import { inject, ref } from 'vue';
import BaseDialog from './UI/BaseDialog.vue';
import EntryForm from './EntryForm.vue';

const selectedSession = inject('selectedSession')
const isOpen = ref(false)
const handleOpenDialog = () => {
    isOpen.value = true
}
</script>

<style lang="scss" scoped>
</style>