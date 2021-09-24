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
}
export const postsService = new PostsService()