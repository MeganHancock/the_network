import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class ProfileService {
    async getProfileById(profileId) {
        const response = await api.get(`api/profiles/${profileId}`)
        logger.log('response in service', response.data)
    }
}

export const profileService = new ProfileService()