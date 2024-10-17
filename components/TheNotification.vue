<template>
  <div v-if="shouldShowNotification" class="notification-container" :class="{
      'updated-successfully': userSavedSuccessfully === true,
      'updated-failed': userSavedSuccessfully === false,
    }"
  >
    {{notificationText}}
  </div>
</template>

<script setup lang="ts">
import { useUsers } from "~/composables";

const { userSavedSuccessfully } = useUsers()

const shouldShowNotification = computed(() => userSavedSuccessfully.value || userSavedSuccessfully.value === false)
const notificationText = computed(() => userSavedSuccessfully.value ? 'Flights quota successfully saved...' : 'There was an error while saving...')
</script>

<style scoped lang="scss">
.notification-container {
  position: absolute;
  top: 2rem;
  left: 0;
  right: 0;
  margin-inline: auto;
  width: 30rem;
  padding: 1rem 3rem;
  border-radius: .3rem;

  &.updated-successfully {
    background-color: lightgreen;
  }

  &.updated-failed {
    background-color: lightcoral;
  }
}
</style>