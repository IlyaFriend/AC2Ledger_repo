<template>
  <div>
    <!-- Settings forms -->
    <div class="divide-y divide-gray-100 dark:divide-white/5">
      <FormKitSection
        @on-submit="updatePersonalInfo"
      >
        <template #title>
          Personal Information
        </template>
        <template #subtitle>
          Use a permanent address where you can receive mail.
        </template>

        <FormKit
          type="text"
          name="username"
          label="Username"
          validation="length:1,50"
          outer-class="sm:col-span-6"
          :value="user.username"
        />
        <FormKit
          type="text"
          name="firstName"
          label="First name"
          validation="length:1,50"
          outer-class="sm:col-span-3"
          :value="user.firstName"
        />
        <FormKit
          type="text"
          name="lastName"
          label="Last name"
          validation="length:1,50"
          outer-class="sm:col-span-3"
          :value="user.lastName"
        />
      </FormKitSection>

      <FormKitSection
        @on-submit="updatePersonalInfo"
      >
        <template #title>
          Scopus User Id
        </template>
        <template #subtitle>
          Add your Scopus Id. Thus, you can import your Scopus documents as achievements to ScholarSphere!
        </template>

        <FormKit
          type="text"
          name="scopus_id"
          label="Scopus Id"
          validation="length:1,50"
          outer-class="sm:col-span-6"
          :value="user.scopus_id"
        />
      </FormKitSection>

      <FormKitSection
        @on-submit="resetPassword"
      >
        <template #title>
          Change password
        </template>
        <template #subtitle>
          Update your password associated with your account.
        </template>

        <FormKit
          type="password"
          name="currentPassword"
          label="Current password"
          validation="required|length:8"
          outer-class="sm:col-span-6"
        />

        <FormKit
          type="password"
          name="newPassword"
          label="New password"
          validation="required|length:8"
          outer-class="sm:col-span-6"
        />

        <FormKit
          type="password"
          name="newPassword_confirm"
          label="Confirm password"
          validation="required|confirm"
          outer-class="sm:col-span-6"
        />
      </FormKitSection>

      <FormKitSection>
        <template #submit-button>
          <div class="flex mt-8">
            <FormKit type="submit" label="Yes, delete my account" input-class="bg-red-500 hover:bg-red-400 dark:bg-red-500 dark:hover:bg-red-400 border-0" />
          </div>
        </template>
        <template #title>
          Delete account
        </template>
        <template #subtitle>
          No longer want to use our service? You can delete your account here. This action is not reversible. All
          information related to this account will be deleted permanently.
        </template>
      </FormKitSection>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'
import { useAuth } from '#imports'
import { changePassword, updateUser } from '~/composables/users'

const { data: user, refresh, status } = useAuth()

if (status.value === 'unauthenticated') {
  throw createError({ statusCode: 401, message: 'You must be authenticated to access this page.' })
}
async function updatePersonalInfo (formData: any) {
  await updateUser(user?.value?.id, formData)
  toast.success('Information has been updated')
  await refresh()
}

async function resetPassword (formData) {
  try {
    await changePassword(formData.currentPassword, formData.newPassword)
    toast.success('Your password has been updated')
  } catch (e) {
    toast.error(e.statusMessage)
  }
}
</script>
