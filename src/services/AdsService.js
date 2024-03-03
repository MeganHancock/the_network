import { api } from "./AxiosService.js"
import { logger } from "../utils/Logger.js"
import { Ad } from "../models/Ad.js"
import { AppState } from "../AppState.js"

class AdsService {
    async getAds() {
        const response = await api.get('api/ads')
        const foundAds = response.data.map(adPOJO => new Ad(adPOJO))
        logger.log('posts response mapped', foundAds)
        AppState.ads = foundAds
    }
}

export const adsService = new AdsService()