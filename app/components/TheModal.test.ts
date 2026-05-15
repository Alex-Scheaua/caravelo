import { mountSuspended } from '@nuxt/test-utils/runtime'
import { defineComponent } from 'vue'
import TheModal from './TheModal.vue'

describe('TheModal', () => {
  it('should not render when modal stack is empty', async () => {
    const component = await mountSuspended(TheModal)

    expect(component.find('.modal').exists()).toBe(false)
  })

  it('should render when modal stack has an entry', async () => {
    const modal = useModal()
    const testComponent = defineComponent({
      template: '<div class="test-content">Test</div>'
    })

    modal.openModal({ component: testComponent })

    const component = await mountSuspended(TheModal)

    expect(component.find('.modal').exists()).toBe(true)
    expect(component.find('.test-content').exists()).toBe(true)
    expect(component.find('.test-content').text()).toBe('Test')

    modal.closeModal()
  })

  it('should render component with props', async () => {
    const modal = useModal()
    const testComponent = defineComponent({
      props: ['message'],
      template: '<div class="test-props">{{ message }}</div>'
    })

    modal.openModal({ component: testComponent, props: { message: 'Hello props' } })

    const component = await mountSuspended(TheModal)

    expect(component.find('.test-props').text()).toBe('Hello props')

    modal.closeModal()
  })

  it('should close modal when overlay is clicked', async () => {
    const modal = useModal()
    const testComponent = defineComponent({
      template: '<div>Content</div>'
    })

    modal.openModal({ component: testComponent })

    const component = await mountSuspended(TheModal)
    expect(component.find('.modal').exists()).toBe(true)

    await component.find('.modal__overlay').trigger('click')

    expect(component.find('.modal').exists()).toBe(false)
  })
})
