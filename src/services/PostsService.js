import { api } from "./AxiosService.js"
import { logger } from "../utils/Logger.js"

class PostsService {


    async getPosts() {
        const response = await api.get('api/posts')
        logger.log('posts response', response.data.posts)
    }
}

export const postsService = new PostsService()