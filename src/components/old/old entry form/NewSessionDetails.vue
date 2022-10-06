<template>

    <q-input label="Time" outlined v-model="dateAndTime">
        <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="date" mask="DD.MM.YYYY, HH:mm">
                        <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                    </q-date>
                </q-popup-proxy>
            </q-icon>
        </template>

        <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-time v-model="date" mask="DD.MM.YYYY, HH:mm" format24h>
                        <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                    </q-time>
                </q-popup-proxy>
            </q-icon>
        </template>
    </q-input>
    <q-select use-input behavior="menu" clearable outlined v-model="couch" :options="optionsCouch" multiple
        label="Couch" use-chips />
    <q-select use-input behavior="menu" clearable multiple outlined v-model="classes" :options="optionsClasses"
        label="Classes" use-chips />
    <q-select use-input behavior="menu" clearable multiple outlined v-model="tags" :options="optionsTags" label="Tags"
        use-chips />

    <q-editor v-model="editor" min-height="5rem" placeholder="Description" />
    <!-- <q-btn label="Submit" type="submit" color="primary" /> -->

</template>

<script setup>

import { date } from 'quasar';
import { optionsClassesDummy, optionsCouchDummy, optionsTagsDummy } from 'assets/DummyData';
import { inject, ref } from 'vue';

const selectedSession = inject('selectedSession')

const couch = ref(selectedSession?.value?.couch || null)
const dateAndTime = ref(date.formatDate(
    selectedSession?.value?.date || new Date(),
    'DD.MM.YYYY, HH:mm'
))
const classes = ref(selectedSession?.value?.classes || null)
const tags = ref(selectedSession?.value?.tags || null)
const editor = ref('')
const optionsCouch = ref(optionsCouchDummy)
const optionsClasses = ref(optionsClassesDummy)
const optionsTags = ref(optionsTagsDummy)

const handleSubmit = (e) => {
    console.log({
        dateAndTime: dateAndTime.value,
        couch: couch.value,
        classes: classes.value,
        tags: tags.value,
        editor: editor.value,
    })
}
</script>

<style lang="scss" scoped>
</style>