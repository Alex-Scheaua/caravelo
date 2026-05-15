<template>
<div class="users-list">
  <div class="users-list__header">
    <span class="users-list__title">Users</span>
    <GeneralButton class="users-list__add-button" @click="openAddUserModal()">
      ADD USER
    </GeneralButton>
  </div>
  <UsersListItem v-for="user in userList" :key="user.id" :user />
</div>
</template>

<script lang="ts" setup>
import AddUserForm from './AddUserForm.vue'

const { retrieveUsers, userList } = useUsers()
const { openModal } = useModal()

const openAddUserModal = () => {
  openModal({ component: AddUserForm })
}

onMounted(async () => await retrieveUsers())

</script>

<style lang="scss" scoped>
.users-list__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem .5rem;

  .button {
    font-weight: 600;
    background-color: #007bff;
    color: #fff;
    padding: .5rem 1rem;

    &:hover {
      background-color: #0056b3;
    }
  }
}

.users-list__title {
  font-size: 1.2rem;
  font-weight: 600;
}
</style>
