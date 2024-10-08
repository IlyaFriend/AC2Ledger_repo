<template>
  <FormKit
    type="form"
    :actions="false"
  >
    <div class="flex">
      <div class="grid grid-cols-3 w-full">
        <FormKit name="name" placeholder="University Name" inner-class="$remove:rounded border-r-0 rounded-l" outer-class="col-span-2" />
        <FormKit name="shortName" placeholder="University Short Name" inner-class="$remove:rounded" outer-class="col-span-1" />
      </div>
      <div>
        <FormKit type="submit" input-class="$remove:rounded w-full flex justify-center rounded-r" outer-class="w-[128px]">
          <MagnifyingGlassIcon class="min-w-4 w-4" />
        </FormKit>
      </div>
    </div>
  </FormKit>
</template>

<script lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
</script>
