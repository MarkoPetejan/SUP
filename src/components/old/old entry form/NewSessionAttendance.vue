<template>
    Select classes first
    <q-list>
        <q-expansion-item v-for="group in groupedMembers" expand-separator :label="group.label"
            :caption="numberOfAttendees(group)">
            <q-item v-for="item in group.members" :active="isActive(item.id)" active-class="bg-blue-1 text-grey-10"
                tag="label" v-ripple clickable>

                <q-item-section avatar>
                    <q-avatar v-if="item.image">
                        <img :src="item.image" onerror="this.style.display='none'" />
                    </q-avatar>
                    <q-avatar v-else="item.image" color="primary" text-color="white">{{ item.name[0].toUpperCase() }}
                    </q-avatar>
                </q-item-section>

                <q-item-section>
                    <q-item-label>
                        <q-icon v-if="isBirthdayToday(item.dateOfBirth)" name="cake" color="primary" />
                        {{ item.name }}
                    </q-item-label>
                    <q-item-label>
                        <q-badge v-for="tag in item.tags" rounded>
                            {{ tag }}
                        </q-badge>
                    </q-item-label>
                </q-item-section>

                <q-item-section side>
                    <q-checkbox v-model="selectedMembers" :val="item.id" />
                </q-item-section>
            </q-item>

        </q-expansion-item>
    </q-list>
</template>

<script setup>
import { membersDummy } from 'assets/DummyData.js';
import { computed, inject, ref } from 'vue';
import { isBirthdayToday } from 'src/helpers/birthdayCheck.js';

const selectedSession = inject('selectedSession')
const data = ref(membersDummy)
const selectedMembers = ref(selectedSession?.value ?
    selectedSession.value.attendees.map(item => item.id) :
    [])
const groupedMembers = computed(() => {
    if (!data?.value) return []
    const allGroups = data.value.map(item => item.classes).flat()
    const uniqueGroups = [... new Set(allGroups)]
    const grouped = uniqueGroups.map(group => {
        const members = data.value.filter(member => member.classes.indexOf(group) > -1)
        const [firstLetter, ...rest] = group
        return {
            label: firstLetter.toUpperCase() + rest.join(''),
            members
        }
    })
    return grouped
})


const isActive = (id) => {
    return selectedMembers.value.indexOf(id) > -1
}

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

<style  scoped>
</style>