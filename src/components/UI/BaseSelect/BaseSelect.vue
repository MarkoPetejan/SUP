<template>
    <q-select use-input behavior="menu" clearable multiple outlined :options="options" :label="label" use-chips
        @input-value="handleUpdate">
        <template v-slot:before-options>
            <q-item>
                <NewChip :label="newLabel" />
            </q-item>
        </template>
        <template v-slot:selected-item="scope">
            <q-chip removable dense @remove="scope.removeAtIndex(scope.index)" :tabindex="scope.tabindex"
                :color="scope.opt.color" text-color="white" class="q-ma-xs">
                {{ scope.opt.label }}
            </q-chip>
        </template>
    </q-select>
</template>

<script setup>
import { ref } from 'vue';
import NewChip from './NewChip.vue';

defineProps(['options', 'label'])
const newLabel = ref('')
const handleUpdate = (data) => {
    newLabel.value = data
}

</script>

<style lang="scss" scoped>
</style>