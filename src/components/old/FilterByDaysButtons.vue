<template>
    <q-btn-toggle spread :options="[
        { label: '30 days', value: '30' },
        { label: '60 days', value: '60' },
        { label: '90 days', value: '90' },
        { label: 'Custom', value: 'custom' }
    ]" />
    <!-- see budgetbakers example -->
    <!-- <q-carousel v-model="slide" transition-prev="slide-right" transition-next="slide-left" swipeable animated
        control-color="primary" navigation arrows height="150px">
        <template v-slot:navigation-icon="{ active, btnProps, onClick }">
            <q-btn :style="{ fontSize: '5px', opacity: active ? 1 : 0.7 }" :icon="btnProps.icon" color="primary" flat
                round dense @click="onClick" />
        </template>
        <q-carousel-slide name="style">
            <q-btn-toggle spread :options="[
                { label: '30 days', value: '30' },
                { label: '60 days', value: '60' },
                { label: '90 days', value: '90' },
                { label: 'Custom', value: 'custom' }
            ]" />
        </q-carousel-slide>
        <q-carousel-slide name="tv" class="column no-wrap flex-center">
            select with day, week, month, year
        </q-carousel-slide>
        <q-carousel-slide name="layers" class="column no-wrap flex-center">

            custom range
        </q-carousel-slide>
    </q-carousel> -->

</template>

<script setup>
// import { ref } from 'vue';

// const slide = ref('style')
</script>

<style lang="scss" scoped>
</style>