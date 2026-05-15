import type { User, QuotaChange } from "~/types";

export const useUsers = () => {
    const userList = useState<User[]>('users', () => [])
    const userSavedSuccessfully = useState<boolean | null>('userSavedSuccessfully', () => null)
    const quotaChanges = useState<QuotaChange[]>('quotaChanges', () => [])
    const loading = ref(false)
    const historyLoading = ref(false)

    const retrieveUsers = async () => {
        userList.value = await $fetch<Promise<User[]>>('/api/getUsers')
    }

    const retrieveQuotaChanges = async (userId: number) => {
        try {
            historyLoading.value = true
            quotaChanges.value = await $fetch<QuotaChange[]>(`/api/getQuotaChanges?userId=${userId}`)
        } finally {
            historyLoading.value = false
        }
    }

    const updateUserFlightQuota = async (user: User, reasonId?: number) => {
        try {
            loading.value = true
            const newUser = await $fetch(`/api/updateFlightsQuota`, {
                method: "POST",
                body: JSON.stringify({ ...user, reasonId }),
            })

            const userInUserList = userList.value.find(u => u.id === newUser.id)!
            userInUserList.flightsQuota = newUser.flightsQuota
            updateUserSavedSuccessfully(true)
        } catch (error) {
            updateUserSavedSuccessfully(false)
        }

        loading.value = false
    }

    const addUser = async (name: string, flightsQuota = 0) => {
        await $fetch(`/api/createUser`, {
            method: "POST",
            body: JSON.stringify({ name, flightsQuota }),
        })

        await retrieveUsers()
    }

    const removeUser = async (id: number) => {
        await $fetch(`/api/deleteUser`, {
            method: "POST",
            body: JSON.stringify({ id }),
        })

        await retrieveUsers()
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
        quotaChanges: computed(() => quotaChanges.value),
        loading: computed(() => loading.value),
        historyLoading: computed(() => historyLoading.value),
        retrieveUsers,
        retrieveQuotaChanges,
        updateUserFlightQuota,
        addUser,
        removeUser,
    }
}
