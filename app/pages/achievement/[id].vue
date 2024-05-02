<template>
  <div class="px-12 py-8 space-y-6">
    <DescriptionList :title="achievementInfoList.title" :item="omit(achievementInfoList, ['users'])" />
    <div v-if="achievementInfoList.users.length">
      <h3 class="text-xl font-semibold">
        Authors
      </h3>
      <StackedInfoList
        v-if="achievementInfoList.users"
        :items-displayed="achievementInfoList.users.map(user => {
          return {
            id: user._id,
            title: `${user.firstName} ${user.lastName}`,
            subtitle: user.username,
            link: `/teacher/${user._id}`
          }
        })"
      />
    </div>
    <div>
      <h3 class="text-xl font-semibold">
        Added by
      </h3>
      <StackedInfoList
        :items-displayed="[{
          id: achievement?.createdBy?._id,
          title: `${achievement?.createdBy?.firstName} ${achievement?.createdBy?.lastName}`,
          subtitle: achievement?.createdBy?.username,
          link: `/teacher/${achievement?.createdBy?._id}`
        }]"
      />
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
