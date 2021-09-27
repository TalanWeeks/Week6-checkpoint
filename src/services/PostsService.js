import { AppState } from '../AppState'
import { PostModel } from '../models/PostModel'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import { convertToQuery } from '../utils/Query'

class PostsService {
  async getPosts(query = {}) {
    AppState.posts = []
    AppState.likedPosts = []
    const res = await api.get('api/posts' + convertToQuery(query))
    logger.log(res.data)
    logger.log('likes info', res.data.posts[0].likeIds)
    AppState.likeIds = res.data.posts[0].likeIds
    AppState.posts = res.data.posts.map(p => new PostModel(p))

    AppState.likedPosts = AppState.posts.filter(p => p.id === AppState.account.id)
  }

  async likePost(postId) {
    const res = await api.post('api/posts/' + postId + '/like')
    logger.log("you're liked post", res)
    const index = AppState.posts.findIndex(p => p.id === postId)
    AppState.posts.splice(index, 1, new PostModel(res.data))
    AppState.posts = [...AppState.posts]

    // NOTE make likes display differnet pic if you've like them already
    AppState.likedPosts = AppState.posts.filter(p => p.likeIds === AppState.account.id)
    logger.log(AppState.likedPosts)
  }

  async createPost(newPostData) {
    const res = await api.post('api/posts', newPostData)
    AppState.posts.unshift(new PostModel(res.data))
    logger.log('created post data', res.data)
  }

  async searchForPosts(query = {}) {
    const res = await api.get('api/posts/?query=' + query)
  }

  async deletePost(postId) {
    const res = await api.delete('api/posts/' + postId)
    logger.log('the post that twas deleted', res)
    AppState.posts = AppState.posts.filter(p => p.id !== postId)
  }

  async getNextPage() {
    AppState.posts = []
    AppState.currentPage--
    const res = await api.get('api/posts?page=' + AppState.currentPage)
    logger.log('the next page res data', res)
    AppState.posts = res.data.posts.map(p => new PostModel(p))
  }

  async getPreviousPage() {
    AppState.posts = []
    AppState.currentPage++
    const res = await api.get('api/posts?page=' + AppState.currentPage)
    logger.log('the next page res data', res)
    AppState.posts = res.data.posts.map(p => new PostModel(p))
  }
}
export const postsService = new PostsService()
