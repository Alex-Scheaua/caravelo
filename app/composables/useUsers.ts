import type { User } from "~/types";

export const useUsers = () => {
    const userList = useState<User[]>('users', () => [])
    const userSavedSuccessfully = useState<boolean | null>('userSavedSuccessfully', () => null)
    const loading = ref(false)

    const retrieveUsers = async () => {
        userList.value = await $fetch<Promise<User[]>>('/api/getUsers')
    }

    const updateUserFlightQuota = async (user: User) => {
        try {
            loading.value = true
            const newUser = await $fetch(`/api/updateFlightsQuota`, {
                method: "POST",
                body: JSON.stringify(user),
            })

            const userInUserList = userList.value.find(u => u.id === newUser.id)!
            userInUserList.flightsQuota = newUser.flightsQuota
            updateUserSavedSuccessfully(true)
        } catch (error) {
            updateUserSavedSuccessfully(false)
        }

        loading.value = false
    }

    const updateUserSavedSuccessfully = (value: boolean) => {
        userSavedSuccessfully.value = value

        setTimeout(() => {
            userSavedSuccessfully.value = null
        }, 3000)
    }

    return {
        userList: computed(() => userList.value),
        userSavedSuccessfully: computed(() => userSavedSuccessfully.value),
        loading: computed(() => loading.value),
        retrieveUsers,
        updateUserFlightQuota,
    }
}
