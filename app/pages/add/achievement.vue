<template>
  <div>
    <h1>Add achievement</h1>
    <div class="flex justify-center">
      <DynamicForm title="Add an achievement" @on-submit="achievementData => addAchievement(achievementData)" />
    </div>
  </div>
</template>

<script setup lang="ts">
const addAchievement = async (achievementData) => {
  console.log(achievementData)
  await $fetch('/api/achievements/', {
    method: 'POST',
    body: {
      data: achievementData
    }
  })
}
</script>
