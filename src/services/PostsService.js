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

    async getPostsByCreatorId(profileId) {
        const response = await api.get(`api/posts?creatorId=${profileId}`)
        // logger.log('posts found?', response.data.posts)
        const foundPosts = response.data.posts.map(postsPOJO => new Post(postsPOJO))
        AppState.posts = foundPosts
    }

    async postNewPost(formData) {
        const response = await api.post('api/posts', formData)
        logger.log('created post', response.data)
        const newPost = new Post(response.data)
        AppState.posts.push(newPost)
    }

    async likeAndUnlikePost(postId) {
        logger.log('post service', postId)
        const response = await api.post(`/api/posts/${postId}/like`)
        logger.log('like response', response.data)
        const updatedPost = new Post(response.data)
        // logger.log('updated post', updatedPost.likeIds)
        // AppState.ac

    }

    async removePost(postId) {
        const response = await api.delete(`api/posts/${postId}`)
        logger.log('removed post', response.data)
    }

}

export const postsService = new PostsService()