<template>
  <ClientOnly>
    <WalletModalProvider>
      <template #default="modalScope">
        <WalletMultiButton @click="modalScope.openModal()"></WalletMultiButton>
      </template>
    </WalletModalProvider>
  </ClientOnly>
</template>

<script setup lang="ts">
import { WalletMultiButton, WalletModalProvider, useWallet } from "solana-wallets-vue";

const connectedWallet = computed(() => {
  const { publicKey } = useWallet()

  if (publicKey && publicKey.value) {
    return publicKey.value.toBase58()
  }
})

watch(connectedWallet, async (currentValue) => {
  const { data: user } = useAuth()
  if (!user?.value?.id) {
    throw new Error('user not found')
  }
  await updateUser(user?.value?.id, {
    publicKey: currentValue || null,
  })

})
</script>
