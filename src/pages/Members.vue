<template>
  <q-page>
    <q-input class="q-pa-md" filled v-model="search" placeholder="Search" dense clearable>
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
    </q-input>
    <div class="q-pa-md">
      <NewMemberEntry />
    </div>
    <div>
      <MembersList @selectMember="setSelectedMember" />
    </div>
  </q-page>
</template>

<script setup>
import { membersDummy } from 'assets/DummyData.js';
import NewMemberEntry from 'components/members/NewMemberEntry.vue';
import { provide, ref } from 'vue';
import MembersList from 'components/members/MembersList.vue';

const members = ref(membersDummy)
const search = ref(null)
const selectedMember = ref(null)

const setSelectedMember = (member) => {
  selectedMember.value = member
}

provide('members', members)
provide('selectedMember', selectedMember)

</script>

<style scoped>
</style>
