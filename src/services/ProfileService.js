import { AppState } from "../AppState.js"
import { Profile } from "../models/Profile.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class ProfileService {
    async getProfileById(profileId) {
        const response = await api.get(`api/profiles/${profileId}`)
        // logger.log('response in service', response.data)
        const newProfile = new Profile(response.data)
        AppState.activeProfile = newProfile
        logger.log(AppState.activeProfile)
    }

    // clearAppState() {
    //     AppState.activeProfile = null
    // }
}

export const profileService = new ProfileService()