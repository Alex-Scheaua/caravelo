import type { User } from "~/types";
import type {Ref} from "vue";

const userList: Ref<User[]> = ref([])
const userSavedSuccessfully: Ref<boolean | null> = ref(null)

export const useUsers = () => {
    const loading: Ref<boolean> = ref(false)

    /**
     * Retrieves the list of users from the `/api/getUsers` endpoint.
     *
     * @returns {Promise<void>} A promise that resolves when the user list is successfully updated.
     *
     * @throws {Error} If the fetch request fails.
     */
    const retrieveUsers = async () => {
        userList.value = await $fetch<Promise<User[]>>('/api/getUsers')
    }
    /**
     * Updates the flight quota for a given user.
     * On success, updates the user's flight quota in the local `userList` and sets a flag indicating successful update.
     * On failure, sets a flag indicating the update was not successful.
     *
     * @param {User} user - The user object containing user details to update.
     * @returns {Promise<void>} A promise that resolves when the update process is complete.
     * @throws {Error} If the update request fails.
     */
    const updateUserFlightQuota = async (user: User) => {
        try {
            loading.value = true
            const newUser = await $fetch(`/api/updateFlightsQuota`, {
                method: "POST",
                body: JSON.stringify(user),
            })

            const userInUserList = userList.value.find(user => user.id === newUser.id)!
            userInUserList.flightsQuota = newUser.flightsQuota
            updateUserSavedSuccessfully(true)
        } catch (error) {
            updateUserSavedSuccessfully(false)
        }

        loading.value = false
    }
    /**
     * Updates the `userSavedSuccessfully` flag to indicate whether the user was saved successfully.
     * Resets the flag to `null` after 3 seconds.
     *
     * @param {boolean} value - A boolean indicating whether the user was saved successfully (true) or not (false).
     */
    const updateUserSavedSuccessfully = (value: boolean) => {
        userSavedSuccessfully.value = value

        setTimeout(() => {
            userSavedSuccessfully.value = null
        },3000)
    }

    return {
        userList: computed(() => userList.value),
        userSavedSuccessfully: computed(() => userSavedSuccessfully.value),
        loading: computed(() => loading.value),
        retrieveUsers,
        updateUserFlightQuota
    }
}