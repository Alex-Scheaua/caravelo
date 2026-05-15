import type { Component } from 'vue'

interface ModalEntry {
  component: Component
  props?: Record<string, any>
}

export const useModal = () => {
    const modalStack = useState<ModalEntry[]>('modalStack', () => [])

    const openModal = (entry: ModalEntry) => {
        modalStack.value.push(entry)
    }

    const closeModal = () => {
        modalStack.value.pop()
    }

    const currentEntry = computed(() => {
        const stack = modalStack.value
        return stack.length > 0 ? stack[stack.length - 1] : null
    })

    const isModalOpen = computed(() => modalStack.value.length > 0)

    return {
        currentEntry,
        isModalOpen,
        openModal,
        closeModal,
    }
}
