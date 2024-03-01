import { api } from "./AxiosService.js"
import { logger } from "../utils/Logger.js"
import { Post } from "../models/Post.js"
import { AppState } from "../AppState.js"

class PostsService {


    async getPosts() {
        const response = await api.get('api/posts')
        // logger.log('posts response', response.data.posts)
        const foundPosts = response.data.posts.map(postPOJO => new Post(postPOJO))
        // logger.log('posts response mapped', foundPosts)
        AppState.posts = foundPosts
    }
}

export const postsService = new PostsService()