import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, it, expect, vi } from 'vitest'
import TheModal from './TheModal.vue'

describe('TheModal', () => {
  const mockSelectedUser = { name: 'John Doe', id: 1, flightsQuota: 2 }

  vi.stubGlobal('$fetch', () => () => {})

  it('should mount the component correctly', async () => {
    const component = await mountSuspended(TheModal)

    expect(component.exists()).toBe(true)
    expect(component.find('.modal').exists()).toBe(true)
    expect(component.find('.title').text()).toBe('Edit flights')
    expect(component.find('.subtitle').text()).toBe('Add or remove flights from the subscriber')
  })

  it('should increment and decrement the quota correctly', async () => {
    const component = await mountSuspended(TheModal)
    component.vm.quotaToBeUpdated.value = 1;

    const quotaRemoveButton = component.find('.quota-remove')
    const quotaAddButton = component.find('.quota-add')
    await quotaAddButton.trigger('click')

    expect(component.find('.controls-container__quantity').text()).toContain('2')

    await quotaAddButton.trigger('click')
    expect(component.text()).toContain('3')

    await quotaRemoveButton.trigger('click')
    expect(component.text()).toContain('2')
  })

  it('should disable save button when conditions are not met', async () => {
    const component = await mountSuspended(TheModal)

    const saveButton = component.find('.save-button')
    expect(saveButton.exists()).toBe(true)

    component.vm.selectedUser.value = mockSelectedUser

    component.vm.selectedReasonId.value = 2
    component.vm.quotaToBeUpdated.value = undefined

    await component.vm.$nextTick()

    expect(component.find('.save-button]').isDisabled()).toBe(true)
  })
})