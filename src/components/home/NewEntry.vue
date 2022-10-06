<template>
    <q-btn color="primary" label="create entry" flat icon="add" @click="handleOpenDialog" />
    <BaseDialog v-model="isOpen" title="New entry">
        <EntryForm />
    </BaseDialog>
</template>

<script setup>
import { inject, ref } from 'vue';
import BaseDialog from '../UI/BaseDialog.vue';
import EntryForm from './EntryForm.vue';

const selectedSession = inject('selectedSession')
const isOpen = ref(false)

const handleOpenDialog = () => {
    selectedSession.value = null
    isOpen.value = true
}
</script>

<style lang="scss" scoped>
</style>