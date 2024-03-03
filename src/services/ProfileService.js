import { AppState } from "../AppState.js"
import { Profile } from "../models/Profile.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { Account } from '../models/Account.js'
import { useRoute, useRouter } from 'vue-router';

class ProfileService {
    async getProfileById(profileId) {
        const response = await api.get(`api/profiles/${profileId}`)
        // logger.log('response in service', response.data)
        const newProfile = new Profile(response.data)
        AppState.activeProfile = newProfile
        logger.log(AppState.activeProfile)
    }

    async updateProfile(profileData) {
        const response = await api.put('/account', profileData)
        logger.log('updated profile', response.data)
        AppState.account = new Profile(response.data)
        logger.log('appstate account', AppState.account)
        // router.push({ name: 'ProfilePage' })

    }

    // async updateAccount(accountData) {
    //     const response = await api.put('/account', accountData)
    //     logger.log('Updated account', response.data)
    //     AppState.account = new Account(response.data)
    //   }

    clearAppState() {
        AppState.activeProfile = null
    }
}

export const profileService = new ProfileService()