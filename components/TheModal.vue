<template>
  <div class="modal">
    <div class="modal__overlay" @click="closeModal()"></div>
      <div class="modal__container">
        <GeneralButton class="modal__close" @click="closeModal()">
          <slot name="close">
            <cross icon="cross" size="0.875rem" color="color-black" />
          </slot>
        </GeneralButton>
        <div class="modal__content">
          <div class="title">Edit flights</div>
          <div class="subtitle">Add or remove flights from the subscriber</div>
          <div class="controls-container">
            <div class="controls-container__quantity">
              <span>Flights Left</span>
              <div>
                <QuotaChangeButton @click="quotaRemove">-</QuotaChangeButton>
                {{quotaToBeUpdated}}
                <QuotaChangeButton @click="quotaAdd">+</QuotaChangeButton>
              </div>
            </div>
            <div class="controls-container__reason">
              <select v-model="selectedReasonId">
                <option :value="0" selected disabled>What is the motive?</option>
                <option v-for="option in flightQuotaSelectOptions" :key="option.id" :value="option.id">
                  {{option.message}}
                </option>
              </select>
            </div>
          </div>
          <div class="button-container">
            <GeneralButton
                :disabled="isSaveButtonDisabled"
                @click="saveUser"
            >
              {{loading ? 'LOADING...' : 'SAVE CHANGES'}}
            </GeneralButton>
          </div>
        </div>
      </div>
  </div>
</template>
<script lang="ts"setup>
import cross from '~/assets/icons/cross.vue'
import { useModal, useUsers } from "~/composables";

const { selectedUser , closeModal } = useModal()
const { loading, updateUserFlightQuota } = useUsers()

const quotaToBeUpdated = ref<number>(0)
const selectedReasonId = ref<number>(0)

const flightsQuotaUpdateReasons = ref({})

/**
 * - Returns an empty array if the `quotaToBeUpdated` is equal to the `selectedUser`'s current flight quota.
 * - If `quotaToBeUpdated` is greater than the current flight quota, returns the options for increasing the flight quota.
 * - If `quotaToBeUpdated` is less than the current flight quota, returns the options for decreasing the flight quota.
 *
 * @returns {Array} An array of options for updating the flight quota, depending on whether it is being increased or decreased.
 */
const flightQuotaSelectOptions = computed(() => {
  if(quotaToBeUpdated.value === selectedUser.value?.flightsQuota) return []
  if(quotaToBeUpdated.value! > selectedUser.value?.flightsQuota) return flightsQuotaUpdateReasons.value.add
  return flightsQuotaUpdateReasons.value.remove
})

const isSaveButtonDisabled = computed(() => quotaToBeUpdated.value === selectedUser.value?.flightsQuota || !selectedReasonId.value || loading.value)

const quotaRemove = () => {
  if(quotaToBeUpdated.value > 0)
    quotaToBeUpdated.value--
}
const quotaAdd = () => {
  if(quotaToBeUpdated.value < 3)
    quotaToBeUpdated.value++
}

const saveUser = async () => {
  await updateUserFlightQuota({
    ...selectedUser.value,
    flightsQuota: quotaToBeUpdated.value
  })

  closeModal()
}

onMounted(async () => {
  quotaToBeUpdated.value = selectedUser.value?.flightsQuota
  flightsQuotaUpdateReasons.value = await $fetch('/api/getFlightQuotaReasons')
})
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

  &__overlay {
    width: 100%;
    height: 100%;
    background: #1119;
  }

  &__container {
    position: fixed;
    width: 40rem;
    height: 20rem;
    background: #fff;
  }

  &__content {
    padding: 1.5rem;

    .title {
      margin-bottom: .8rem;
      font-size: 1.2rem;
    }

    .subtitle {
      font-size: .8rem;
      color: #777;
    }

    .controls-container {
      padding: 2.5rem 0;
      height: 100%;
      display: flex;
      justify-content: center;
      gap: 1rem;

      &__quantity {
        padding: .8rem 3rem;
        background-color: lightgrey;

        & > span {
          text-align: center;
          display: block;
          margin-bottom: 1rem;
        }

        & > div {
          display: flex;
          justify-content: center;
          gap: 2rem;
          background-color: white;
          padding: .5rem;
        }
      }

      &__reason {
        select {
          width: 20rem;
          padding: .5rem;
          border: 1px solid lightgrey;
          border-radius: .3rem;
          color: #777;

          &:focus-visible {
            border: 1px solid lightgrey;
          }
        }
      }
    }

    .button-container {
      width: 100%;
      display: flex;
      justify-content: center;

      .button {
        &:disabled {
          background-color: #ddd;
          color: gray;
          padding: .5rem 1rem;
          cursor: auto;
        }
      }
    }
  }

  &__close {
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    width: 2rem;
    height: 2rem;
  }
}
</style>
