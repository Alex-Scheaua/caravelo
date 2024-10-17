<template>
  <div class="user-list-item">
    <span class="user-list-item__name">{{user.name}}</span>
    <span class="user-list-item__quota">{{user.flightsQuota}}</span>
    <GeneralButton @click="openModal(user.id)">
      <pen/>
      EDIT FLIGHTS
    </GeneralButton>
  </div>
</template>

<script lang="ts" setup>
import type { User } from "~/types";
import { useModal } from "~/composables";
import Pen from "assets/icons/pen.vue";

const { openModal } = useModal()

defineProps({
  user: {
    type: Object as () => User,
    required: true,
  },
})
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

  .button {
    display: flex;
    align-items: center;
    gap: .3rem;
  }
}
</style>