<template>
    <q-form class="q-gutter-md" @submit="handleSubmit">
        <q-field outlined label="Avatar" stack-label>

            <q-uploader url="http://localhost:4444/upload" multiple flat color="white" text-color="primary"
                class="q-mb-xs" style="width:100%" accept=".jpg, image/*" />
        </q-field>
        <q-input outlined v-model="name" label="Name" />

        <div class="form-input-row">

            <q-input label="Date of birth" class="date-input no-padding" outlined v-model="date" mask="date"
                :rules="['date']">
                <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="date">
                                <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                            </q-date>
                        </q-popup-proxy>
                    </q-icon>
                </template>
            </q-input>

            <q-input v-model="age" filled type="number" label="Age" readonly style="width: 50px;" />
        </div>

        <q-input outlined v-model="phone" label="Phone" />

        <q-input outlined v-model="email" label="Email" />

        <BaseSelect v-model="classes" :options="optionsClasses" label="Classes" />


        <BaseSelect v-model="tags" :options="optionsTags" label="Tags" />

    </q-form>
</template>

<script setup>
import { optionsClassesDummy, optionsTagsDummy } from 'assets/DummyData';
import { inject, ref } from 'vue';
import BaseSelect from '../UI/BaseSelect/BaseSelect.vue';

const selectedMember = inject('selectedMember')
const name = ref(selectedMember?.value?.name || '')
const date = ref(selectedMember?.value?.dateOfBirth || '')
const phone = ref(selectedMember?.value?.phone || '')
const email = ref(selectedMember?.value?.email || '')
const age = ref(24) // this should bi calculated from dateOfBirth
const classes = ref(selectedMember?.value?.classes || null)
const tags = ref(selectedMember?.value?.tags || null)

const optionsClasses = ref(optionsClassesDummy)
const optionsTags = ref(optionsTagsDummy)


const handleSubmit = () => {
    console.log("submit")
}

</script>

<style scoped>
.form-input-row {
    display: flex;
    flex-wrap: nowrap;
    gap: 1em;
}

.date-input {
    flex: 1;
}
</style>