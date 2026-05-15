<template>
  <div>
    <div class="title">Delete user</div>
    <div class="message">Are you sure you want to delete <strong>{{ user.name }}</strong>?</div>
    <div class="button-container">
      <GeneralButton class="cancel-button" @click="closeModal()">
        CANCEL
      </GeneralButton>
      <GeneralButton class="confirm-button" :disabled="deleting" @click="deleteUser">
        {{ deleting ? 'DELETING...' : 'DELETE' }}
      </GeneralButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { User } from "~/types";

const props = defineProps<{
  user: User
}>()

const { closeModal } = useModal()
const { removeUser } = useUsers()

const deleting = ref(false)

const deleteUser = async () => {
  deleting.value = true
  await removeUser(props.user.id)
  deleting.value = false
  closeModal()
}
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: .8rem;
  font-size: 1.2rem;
}

.message {
  padding: 2rem 0;
  font-size: 1rem;
  color: #555;
}

.button-container {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1rem;
}
</style>
