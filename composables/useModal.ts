import { useUsers } from "~/composables/useUsers";

const { userList } = useUsers()

const isModalOpen = ref(false)
const selectedUser = ref()

export const useModal = () => {
    /**
     * Opens a modal and selects a user based on the provided user ID.
     *
     * @param {number} userId - The ID of the user to be selected and displayed in the modal.
     */
    const openModal = (userId: number) => {
        selectedUser.value = userList.value.find(user => user.id === userId )
        isModalOpen.value = true
    }

    /**
     * Closes the modal and resets the `selectedUser` value.
     */
    const closeModal = () => {
        isModalOpen.value = false
        selectedUser.value = null
    }

    return {
        selectedUser,
        isModalOpen: computed(() => isModalOpen.value),
        openModal,
        closeModal
    }
}