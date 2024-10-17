<template>
<div class="users-list">
  <UsersListItem v-for="user in userList" :key="user.id" :user />
</div>
</template>

<script lang="ts" setup>
import { useUsers } from "~/composables";

const { retrieveUsers, userList } = useUsers()

onMounted(async () => await retrieveUsers())

</script>

<style lang="scss" scoped>

</style>