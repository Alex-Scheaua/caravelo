<template>
  <div class="user-list-item">
    <span class="user-list-item__name">{{user.name}}</span>
    <span class="user-list-item__quota">{{user.flightsQuota}}</span>
    <div class="user-list-item__actions">
      <GeneralButton @click="openEditFlightsModal()">
        <pen/>
        EDIT FLIGHTS
      </GeneralButton>
      <GeneralButton class="user-list-item__delete" @click="openDeleteModal()">
        DELETE
      </GeneralButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { User } from "~/types";
import Pen from "assets/icons/pen.vue";
import EditFlightsContent from './EditFlightsContent.vue'
import DeleteUserConfirm from './DeleteUserConfirm.vue'

const { openModal } = useModal()

const props = defineProps({
  user: {
    type: Object as () => User,
    required: true,
  },
})

const openEditFlightsModal = () => {
  openModal({ component: EditFlightsContent, props: { user: props.user } })
}

const openDeleteModal = () => {
  openModal({ component: DeleteUserConfirm, props: { user: props.user } })
}
</script>

<style lang="scss" scoped>
.user-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid lightgrey;
  padding: 1rem;
  margin: .5rem;
  border-radius: .4rem;

  &__name {
    width: 20rem;
  }

  &__actions {
    display: flex;
    gap: .5rem;
  }

  &__delete {
    color: #c00;
  }

  .button {
    display: flex;
    align-items: center;
    gap: .3rem;
  }
}
</style>
