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
                <QuotaChangeButton class="quota-remove" @click="quotaRemove()">-</QuotaChangeButton>
                {{quotaToBeUpdated}}
                <QuotaChangeButton class="quota-add" @click="quotaAdd()">+</QuotaChangeButton>
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
                class="save-button"
                :disabled="isSaveButtonDisabled"
                @click="saveUser"
            >
              {{loading ? 'LOADING...' : 'SAVE CHANGES'}}
            </GeneralButton>
          </div>
          <div v-if="quotaChanges.length" class="history-section">
            <div class="history-section__title">Change History</div>
            <div class="history-section__list">
              <div v-for="change in quotaChanges" :key="change.id" class="history-section__item">
                <span class="history-section__item-quota">
                  {{change.oldQuota}} &rarr; {{change.newQuota}}
                </span>
                <span class="history-section__item-reason">{{change.reason || '—'}}</span>
                <span class="history-section__item-date">{{change.changedAt}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script lang="ts"setup>
import cross from '~/assets/icons/cross.vue'
import type { QuotaChange } from "~/types";

const { selectedUser , closeModal } = useModal()
const { loading, updateUserFlightQuota, retrieveQuotaChanges, quotaChanges } = useUsers()

const quotaToBeUpdated = ref<number>(0)
const selectedReasonId = ref<number>(0)

const flightsQuotaUpdateReasons = ref({})

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
  await updateUserFlightQuota(
    { ...selectedUser.value, flightsQuota: quotaToBeUpdated.value },
    selectedReasonId.value
  )

  closeModal()
}

onMounted(async () => {
  quotaToBeUpdated.value = selectedUser.value?.flightsQuota
  flightsQuotaUpdateReasons.value = await $fetch('/api/getFlightQuotaReasons')

  if (selectedUser.value) {
    retrieveQuotaChanges(selectedUser.value.id)
  }
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
    max-width: 40rem;
    min-height: 20rem;
    max-height: 90vh;
    overflow-y: auto;
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
      flex-direction: column;
      gap: 1rem;

      @media (min-width: 768px) {
        flex-direction: row;
      }

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

    .history-section {
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid #eee;

      &__title {
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 1rem;
      }

      &__list {
        display: flex;
        flex-direction: column;
        gap: .75rem;
      }

      &__item {
        display: flex;
        flex-direction: column;
        gap: .25rem;
        padding: .75rem;
        background: #f9f9f9;
        border-radius: .3rem;
        font-size: .85rem;

        &-quota {
          font-weight: 600;
          color: #333;
        }

        &-reason {
          color: #555;
        }

        &-date {
          color: #999;
          font-size: .75rem;
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
