import { AppState } from '../AppState'
import { PostModel } from '../models/PostModel'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import { convertToQuery } from '../utils/Query'

class PostsService {
  async getPosts(query = {}) {
    AppState.posts = []
    const res = await api.get('api/posts' + convertToQuery(query))
    logger.log(res.data)
    AppState.posts = res.data.posts.map(p => new PostModel(p))
  }

  async createPost(newPostData) {
    const res = await api.post('api/posts', newPostData)
    AppState.posts.unshift(new PostModel(res.data))
    logger.log('created post data', res.data)
  }

  async deletePost(postId) {
    const res = await api.delete('api/posts/' + postId)
    logger.log('the post that twas deleted', res)
    AppState.posts = AppState.posts.filter(p => p.id !== postId)
  }

  async getNextPage(pagenumber) {
    const res = await api.get('api/posts?page=' + (pagenumber++))
    logger.log('the next page res data', res)
  }

  async getPreviousPage(pagenumber) {
    const res = await api.get('api/posts?page=' + (pagenumber--))
    logger.log('the next page res data', res)
  }
}
export const postsService = new PostsService()
