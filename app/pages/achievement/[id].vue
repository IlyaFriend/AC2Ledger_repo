<template>
  <div class="px-12 py-8">
    <DescriptionList :title="achievementInfoList.title" :item="omit(achievementInfoList, ['users'])" />
    <div v-if="achievementInfoList.users.length">
      <h3 class="text-xl font-semibold">
        Authors
      </h3>
      <div v-for="(user, index) in achievementInfoList.users" :key="user._id">
        {{ index + 1 }}.
        <NuxtLink :to="`/teacher/${user._id}`" class="hover:underline">
          {{ user.lastName }} {{ user.firstName }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { omit } from 'lodash'
import { ref, useFetch } from '#imports'
import { flattenDetails, filterNonPublicKeys } from '~/utils/achievements'

const route = useRoute()

const { id } = route.params

const { data: achievement } = await useFetch(`/api/achievements/${id}`)

const achievementInfoList = ref(filterNonPublicKeys(flattenDetails(achievement.value)))
</script>
