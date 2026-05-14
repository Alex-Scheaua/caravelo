import { mountSuspended } from '@nuxt/test-utils/runtime'
import GeneralButton from '../../components/GeneralButton.vue'

describe('GeneralButton', () => {
  it('Can mount the component', async () => {
    const component = await mountSuspended(GeneralButton)
    expect(component.exists()).toBe(true)
  })

  it('disables the button when disabled prop is true', async () => {
    const component = await mountSuspended(GeneralButton, {
      props: {
        disabled: true,
      }
    })
    const button = component.find('.button')

    expect(button.isDisabled()).toBe(true)
  })
})
