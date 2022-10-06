<template>
    <q-form class="q-gutter-md" @submit="handleSubmit">
        <q-input label="Time" outlined v-model="dateAndTime">
            <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="dateX" mask="DD.MM.YYYY">
                            <div class="row items-center justify-end">
                                <q-btn label="Select time" color="primary" flat>

                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                        <q-time v-model="time" mask="HH:mm" format24h>
                                            <div class="row items-center justify-end">
                                                <q-btn v-close-popup label="Back" color="primary" flat />
                                                <q-btn v-close-popup="2" label="Close" color="primary" flat />
                                            </div>
                                        </q-time>
                                    </q-popup-proxy>
                                </q-btn>
                            </div>
                        </q-date>
                    </q-popup-proxy>
                </q-icon>

            </template>
        </q-input>
        <q-select use-input behavior="menu" clearable outlined v-model="couch" :options="optionsCouch" multiple
            label="Couch" use-chips />

        <BaseSelect v-model="classes" :options="optionsClasses" label="Classes" />

        <BaseSelect v-model="tags" :options="optionsTags" label="Tags" />

        <q-editor v-model="editor" min-height="5rem" placeholder="Description" />
        <!-- <q-btn label="Submit" type="submit" color="primary" /> -->

        <BaseTextSeparator>Attendance</BaseTextSeparator>

        <div v-if="noSelectedClasses" class="text-center q-pb-md flex flex-center column q-gutter-md">
            <span class="text-grey-5">Select classes first</span>
        </div>
        <q-list v-else>
            <q-expansion-item default-opened v-for="group in selectedClasses" expand-separator :label="group.label"
                :caption="numberOfAttendees(group)">
                <q-item v-for="item in group.members" :active="isActive(item.id)" active-class="bg-blue-1 text-grey-10"
                    tag="label" v-ripple clickable>

                    <q-item-section avatar>
                        <q-avatar v-if="item.image">
                            <img :src="item.image" onerror="this.style.display='none'" />
                        </q-avatar>
                        <q-avatar v-else="item.image" color="primary" text-color="white">{{ item.name[0].toUpperCase()
                        }}
                        </q-avatar>
                    </q-item-section>

                    <q-item-section>
                        <q-item-label>
                            <q-icon v-if="isBirthdayToday(item.dateOfBirth)" name="cake" color="primary" />
                            {{ item.name }}
                        </q-item-label>
                        <q-item-label>
                            <q-badge :color="tag.color" v-for="tag in item.tags" rounded>
                                {{ tag.label }}
                            </q-badge>
                        </q-item-label>
                    </q-item-section>

                    <q-item-section side>
                        <q-checkbox v-model="selectedMembers" :val="item.id" />
                    </q-item-section>
                </q-item>

            </q-expansion-item>
        </q-list>
        <q-btn label="Submit" type="submit" color="primary" />
    </q-form>
</template>

<script setup>
import { membersDummy, optionsClassesDummy, optionsCouchDummy, optionsTagsDummy } from 'assets/DummyData.js';
import { computed, inject, ref } from 'vue';
import { isBirthdayToday } from 'src/helpers/birthdayCheck.js';
import { date } from 'quasar';
import BaseSelect from '../UI/BaseSelect/BaseSelect.vue';
import BaseTextSeparator from '../UI/BaseTextSeparator.vue';

const selectedSession = inject('selectedSession')

const dateX = ref(null)
const time = ref(null)
const dateAndTime = ref(date.formatDate(
    selectedSession?.value?.date || new Date(),
    'DD.MM.YYYY, HH:mm'
))
const couch = ref(selectedSession?.value?.couch || null)
const classes = ref(selectedSession?.value?.classes || null)
const tags = ref(selectedSession?.value?.tags || null)
const editor = ref('')

const data = ref(membersDummy)
const optionsCouch = ref(optionsCouchDummy)
const optionsClasses = ref(optionsClassesDummy)
const optionsTags = ref(optionsTagsDummy)

const noSelectedClasses = computed(() => {
    return !classes.value || !classes.value.length
})

const handleSubmit = (e) => {
    console.log({
        dateAndTime: dateAndTime.value,
        couch: couch.value,
        classes: classes.value,
        tags: tags.value,
        editor: editor.value,
    })
}

const selectedMembers = ref(selectedSession?.value ?
    selectedSession.value.attendees.map(item => item.id) :
    [])

const getMembersByClass = () => {
    if (!data?.value) return []
    const allGroups = data.value.map(item => item.classes.map(i => i.label)).flat()
    const uniqueGroups = [... new Set(allGroups)]
    const grouped = uniqueGroups.map(group => {
        const members = data.value.filter(member => member.classes.map(i => i.label).indexOf(group) > -1)
        const [firstLetter, ...rest] = group
        return {
            label: firstLetter.toUpperCase() + rest.join(''),
            members
        }
    })
    return grouped
}
const groupedMembers = ref(getMembersByClass())

const isActive = (id) => {
    return selectedMembers.value.indexOf(id) > -1
}

const selectedClasses = computed(() => {
    const intersection = groupedMembers.value.filter(element => classes.value.map(i => i.label).includes(element.label));
    return intersection
})
const numberOfAttendees = (group) => {
    const membersIdsInGroup = group.members.map(member => member.id)
    const intersection = membersIdsInGroup.filter(element => selectedMembers.value.includes(element));

    const caption =
        !intersection.length ? null :
            intersection.length === 1 ? '1 attendee' :
                `${intersection.length} attendees`

    return caption
}

</script>

<style scoped>
</style>