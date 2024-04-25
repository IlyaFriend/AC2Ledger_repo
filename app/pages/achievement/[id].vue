<template>
  <DescriptionList class="px-12 py-8" :title="achievementInfoList.title" :item="achievementInfoList" />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, useFetch } from '#imports'
import { flattenDetails, filterNonPublicKeys } from '~/utils/achievements'

const route = useRoute()

const { id } = route.params

const { data: achievement } = await useFetch(`/api/achievements/${id}`)

const achievementInfoList = ref(filterNonPublicKeys(flattenDetails(achievement.value)))
</script>
