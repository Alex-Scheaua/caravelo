<template>
  <div v-if="currentEntry" class="modal">
    <div class="modal__overlay" @click="closeModal()"></div>
    <div class="modal__container">
      <GeneralButton class="modal__close" @click="closeModal()">
        <cross />
      </GeneralButton>
      <div class="modal__content">
        <component :is="currentEntry.component" v-bind="currentEntry.props" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import cross from '~/assets/icons/cross.vue'

const { currentEntry, closeModal } = useModal()
</script>

<style lang="scss" scoped>
.modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;

  &__overlay {
    width: 100%;
    height: 100%;
    background: #1119;
  }

  &__container {
    position: fixed;
    max-width: 40rem;
    max-height: 90vh;
    overflow-y: auto;
    background: #fff;
  }

  &__content {
    padding: 1.5rem;
  }

  &__close {
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    width: 2rem;
    height: 2rem;
    z-index: 1;
  }
}
</style>
