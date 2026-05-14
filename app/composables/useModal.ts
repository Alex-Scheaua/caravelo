import type { User } from "~/types";

export const useModal = () => {
    const { userList } = useUsers()

    const isModalOpen = useState('isModalOpen', () => false)
    const selectedUser = useState<User | null>('selectedUser', () => null)

    const openModal = (userId: number) => {
        selectedUser.value = userList.value.find(user => user.id === userId) ?? null
        isModalOpen.value = true
    }

    const closeModal = () => {
        isModalOpen.value = false
        selectedUser.value = null
    }

    return {
        selectedUser,
        isModalOpen,
        openModal,
        closeModal,
    }
}
