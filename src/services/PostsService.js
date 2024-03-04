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
        AppState.currentPage = response.data.page
        AppState.totalPages = response.data.totalPages
    }

    async getPostsByCreatorId(profileId) {
        const response = await api.get(`api/posts?creatorId=${profileId}`)
        // logger.log('posts found?', response.data.posts)
        const foundPosts = response.data.posts.map(postsPOJO => new Post(postsPOJO))
        AppState.posts = foundPosts
        AppState.currentPage = response.data.page
        AppState.totalPages = response.data.totalPages
    }

    async postNewPost(formData) {
        const response = await api.post('api/posts', formData)
        logger.log('created post', response.data)
        const newPost = new Post(response.data)
        AppState.posts.push(newPost)
        AppState.currentPage = response.data.page
        AppState.totalPages = response.data.totalPages
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

    async changePage(pageNumber) {
        const response = await api.get(`/api/posts?page=${pageNumber}`)
        logger.log('change page', response.data)
        const foundPosts = response.data.posts.map(postsPOJO => new Post(postsPOJO))
        AppState.posts = foundPosts
        AppState.currentPage = response.data.page
        AppState.totalPages = response.data.totalPages
    }

    async changePageOnProfile(pageNumber, profileId) {
        const response = await api.get(`/api/profiles/${profileId}/posts?page=${pageNumber}`)
        // const response = await api.get(`api/posts?creatorId=${profileId}`)
        logger.log('change page', response.data)
        const foundPosts = response.data.posts.map(postsPOJO => new Post(postsPOJO))
        AppState.posts = foundPosts
        AppState.currentPage = response.data.page
        AppState.totalPages = response.data.totalPages

    }

    //   }

}

export const postsService = new PostsService()