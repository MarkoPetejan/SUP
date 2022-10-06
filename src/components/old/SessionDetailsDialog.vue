<template>
    <BaseDialog :title="formatDate" v-model="isOpen" @hide="deselectSession">
        <template v-slot:toolbar-action>
            <UpdateEntry />
        </template>
        <div>
            <span v-for="sessionClass in selectedSession.classes" class="text-weight-bold">{{ sessionClass }}</span>
        </div>
        {{ selectedSession.couch }}
        <p>

            <q-badge v-for="tag in selectedSession.tags" rounded>
                {{ tag }}
            </q-badge>
        </p>
        <p v-html="sanitizedDescription"></p>
        <BaseTextSeparator>
            Attendance <q-badge class="text-grey-10" color="grey-4" rounded>{{ selectedSession.attendees.length }}
            </q-badge>
        </BaseTextSeparator>

        <q-list>
            <q-item v-for="item in selectedSession.attendees" clickable v-ripple>
                <q-item-section top avatar>
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
                    <q-item-label v-if="item.note" caption>
                        {{ item.note }}
                    </q-item-label>
                </q-item-section>


            </q-item>
        </q-list>
    </BaseDialog>

</template>

<script setup>
import { date } from 'quasar';
import { computed, inject, ref } from 'vue';
import sanitizeHtml from 'sanitize-html';
import BaseDialog from './UI/BaseDialog.vue';
import UpdateEntry from './UpdateEntry.vue';
import BaseTextSeparator from './UI/BaseTextSeparator.vue';
import { isBirthdayToday } from 'src/helpers/birthdayCheck.js';

const selectedSession = inject('selectedSession')
const isOpen = ref(!!selectedSession.value)


const sanitizedDescription = computed(() => {
    return sanitizeHtml(selectedSession.value.description)
})
const deselectSession = () => {
    selectedSession.value = null
}


const formatDate = computed(() => {
    const formattedDate = date.formatDate(
        selectedSession.value.date,
        'ddd DD.MM.YYYY'
    )
    return formattedDate
})
</script>

<style lang="scss" scoped>
</style>