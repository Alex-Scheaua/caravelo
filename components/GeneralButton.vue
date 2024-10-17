<template>
  <button class="button" :disabled>
    <slot/>
  </button>
</template>

<script lang="ts" setup>
defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
})
</script>

<style lang="scss" scoped>
.button {
  border: none;
  background-color: transparent;
  transition-duration: .3s;
  padding: .5rem;
  border-radius: .3rem;

  &:hover {
    cursor: pointer;
    background-color: #eee;
  }
}
</style>