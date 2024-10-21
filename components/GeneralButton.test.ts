import { expect, describe, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import GeneralButton from './GeneralButton.vue'

describe('LocaleSidebar', () => {
  it('Can mount the component', async () => {
    const component = shallowMount(GeneralButton)
    expect(component.exists()).toBe(true)
  })

  it('Can mount the component', async () => {
    const component = shallowMount(GeneralButton, {
      props: {
        disabled: true,
      }
    })
    const button = component.find('.button')

    expect(button.isDisabled()).toBe(true)
  })
})
