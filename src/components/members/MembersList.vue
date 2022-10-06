<template>
    <q-list>
        <q-item v-for="item in members" tag="label" v-ripple clickable @click="emit('selectMember', item)">
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
                    <div class="row q-gutter-xs q-mt-xs text-capitalize">
                        <q-badge v-for="value in item.classes" :color="value.color" rounded>
                            {{ value.label }}
                        </q-badge>
                        <q-badge v-for="tag in item.tags" :color="tag.color" rounded>
                            {{ tag.label }}
                        </q-badge>
                    </div>
                </q-item-label>
            </q-item-section>
        </q-item>

    </q-list>
    <MemberDetailsDialog v-if="isMember" />

</template>

<script setup>
import { isBirthdayToday } from 'src/helpers/birthdayCheck.js';
import { computed, inject } from 'vue';
import MemberDetailsDialog from './MemberDetailsDialog.vue';

const emit = defineEmits(['selectMember'])

const members = inject('members')
const selectedMember = inject('selectedMember')

const isMember = computed(() => {
    return !!selectedMember.value
})
</script>

<style lang="scss" scoped>
</style>
