<template>
    <q-btn color="primary" label="Create member" flat icon="add" @click="handleOpenDialog" />
    <BaseDialog v-model="isOpen" title="New entry">
        <MemberGeneralForm />
    </BaseDialog>
</template>

<script setup>
import BaseDialog from '../UI/BaseDialog.vue';
import { ref } from 'vue';
import MemberGeneralForm from './MemberGeneralForm.vue';

const isOpen = ref(false)

const handleOpenDialog = () => {
    isOpen.value = true
}
</script>

<style lang="scss" scoped>
</style>