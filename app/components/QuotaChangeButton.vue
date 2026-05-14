<template>
  <button :disabled>
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
button {
  border: none;
  border-radius: 50%;
  padding: .3rem .6rem;
  transition-duration: .3s;

  &:hover {
    cursor: pointer;
    background-color: lightgrey;
  }
}
</style>