import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class ProfileService {
  async getProfileById(id) {
    AppState.profile = []
    const res = await api.get('api/profiles/' + id)
    logger.log('profile res', res.data)
    AppState.profile = res.data
  }
}

export const profileService = new ProfileService()
