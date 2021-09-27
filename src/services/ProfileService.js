import { AppState } from '../AppState'
import { ProfileModel } from '../models/ProfileModel'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class ProfileService {
  async getProfileById(id) {
    AppState.profile = []
    const res = await api.get('api/profiles/' + id)
    logger.log('profile res', res.data)
    AppState.profile = res.data
  }

  async editProfile(profile) {
    const res = await api.put('profile', profile)
    logger.log('edit data', res)
    // AppState.profile = new ProfileModel(res.data)
  }
}

export const profileService = new ProfileService()
