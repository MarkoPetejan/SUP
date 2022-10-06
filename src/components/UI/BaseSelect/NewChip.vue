<template>
    <q-btn color="primary" flat icon="add" @click="handleOpenDialog" class="no-padding" no-caps>
        Create {{ props.label || ' new' }}
    </q-btn>
    <BaseDialog v-model="isOpen" title="New chip" :maximized="false" hideHeader>
        <div class="row items-center justify-center q-mb-md">
            <q-chip size="xl" :style="{ background: hex }" text-color="white">
                {{ label }}
            </q-chip>
        </div>
        <q-input outlined v-model="label" label="label" class="q-mb-md" />
        <q-field outlined label="pick color" stack-label>

            <q-color flat no-header no-footer v-model="hex" default-view="palette" :palette="palette.map(i => i.value)"
                class="custom-color-picker q-my-sm" />
        </q-field>
        <template v-slot:actions>
            <q-btn flat label="Create" color="primary" v-close-popup @click="handleSubmit" :disabled="!props.label" />
        </template>

    </BaseDialog>
</template>

<script setup>
import { ref } from 'vue';
import { colors } from 'quasar'
import BaseDialog from '../BaseDialog.vue';
import { colorPalletNames } from 'src/helpers/colorPalletNames';

const props = defineProps(['label'])
const { getPaletteColor } = colors
const hex = ref(getPaletteColor('blue'))
const isOpen = ref(false)
const palette = ref(colorPalletNames.map(colorName => ({ label: colorName, value: getPaletteColor(colorName) })))


const handleSubmit = () => {
    const colorName = palette.value.find(i => i.value === hex.value).label
    console.log('Create: ', { label: props.label, color: colorName })
}

const handleOpenDialog = () => {
    isOpen.value = true
}

</script>

<style scoped>
.custom-color-picker {
    min-width: 250px
}
</style>