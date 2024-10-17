<template>
  <div class="container">
    <TheNotification />
    <div class="header">
      <logo />
    </div>
    <div class="main">
      <UsersList />
    </div>
  </div>
  <TheModal v-if="isModalOpen" />
</template>

<script lang="ts" setup>
import logo from '~/assets/icons/logo.vue'
import UsersList from "~/components/UsersList.vue";
import { useModal } from "~/composables";

const { isModalOpen } = useModal()

</script>

<style lang="scss">
@mixin for-mobile {
  @media (max-width: 1023px) {
    @content;
  }
}

@mixin for-desktop {
  @media (min-width: 1024px) {
    @content;
  }
}

.container {
  position: relative;
  margin: 0 auto;
  width: 100%;

  @include for-desktop {
    max-width: 1270px;
  }

  .header {
    height: 4rem;
    padding: 1rem;
  }

  .main {
    height: 100%;
  }
}
</style>