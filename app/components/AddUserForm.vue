<template>
  <div>
    <div class="title">Add user</div>
    <div class="subtitle">Create a new subscriber</div>
    <div class="form">
      <div class="form__field">
        <label for="user-name">Name</label>
        <input
          id="user-name"
          v-model="userName"
          type="text"
          placeholder="User name"
          class="form__input"
        />
      </div>
      <div class="form__field">
        <label for="user-quota">Flights Quota</label>
        <input
          id="user-quota"
          v-model.number="userFlightsQuota"
          type="number"
          min="0"
          max="3"
          class="form__input"
        />
      </div>
    </div>
    <div class="button-container">
      <GeneralButton
        class="save-button"
        :disabled="isSaveDisabled"
        @click="saveUser"
      >
        {{ saving ? 'LOADING...' : 'ADD USER' }}
      </GeneralButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { closeModal } = useModal()
const { addUser } = useUsers()

const userName = ref('')
const userFlightsQuota = ref(0)
const saving = ref(false)

const isSaveDisabled = computed(() => !userName.value.trim() || saving.value)

const saveUser = async () => {
  if (isSaveDisabled.value) return

  saving.value = true
  await addUser(userName.value.trim(), userFlightsQuota.value)
  saving.value = false
  closeModal()
}
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: .8rem;
  font-size: 1.2rem;
}

.subtitle {
  font-size: .8rem;
  color: #777;
}

.form {
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__field {
    display: flex;
    flex-direction: column;
    gap: .4rem;

    label {
      font-size: .85rem;
      color: #555;
    }
  }

  &__input {
    padding: .5rem;
    border: 1px solid lightgrey;
    border-radius: .3rem;
    width: 20rem;
  }
}

.button-container {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
