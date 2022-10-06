<template>
    <q-dialog transition-show="slide-up" transition-hide="slide-down" :maximized="maximized">
        <q-card>
            <q-card-section v-if="!hideHeader">
                <!-- <q-toolbar class="no-padding"> -->
                <q-toolbar>
                    <q-btn flat round dense icon="arrow_back" v-close-popup />
                    <q-toolbar-title>
                        <slot name="title">
                            {{ title }}
                        </slot>
                    </q-toolbar-title>
                    <slot name="toolbar-action"></slot>


                </q-toolbar>
            </q-card-section>

            <!-- <q-card-section class="no-padding"> -->
            <q-card-section>
                <slot name="default">

                </slot>
            </q-card-section>
            <q-card-actions align="right">
                <slot name="actions">


                </slot>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup>
defineProps({
    'title': String,
    'maximized': {
        type: Boolean,
        default: true,
    },
    'hideHeader': {
        type: Boolean,
        default: false,
    }
})
</script>

<style scoped>
</style>