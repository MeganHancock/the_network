import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class SearchService {

    async searchPostsAndUsers(searchQuery) {
        const response = await api(`/api/posts?query=${searchQuery}`)
        logger.log('seearch service', response.data)

        AppState.searchQuery = searchQuery

        const foundPosts = response.data.posts.map(postPOJO => new Post(postPOJO))
        AppState.posts = foundPosts
        logger.log(foundPosts)
    }
}

export const searchService = new SearchService()