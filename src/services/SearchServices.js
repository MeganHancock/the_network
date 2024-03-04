import { logger } from "../utils/Logger.js"

class SearchService {

    async searchService(editableSearchQuery) {
        logger.log('seearch service')
    }
}

export const searchService = new SearchService()