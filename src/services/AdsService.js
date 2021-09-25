import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import { AppState } from '../AppState'

class AdsService {
  async getAds() {
    AppState.ads = []
    const res = await api.get('api/ads')
    logger.log('ad data', res.data)
    AppState.ads = res.data
  }
}
export const adsService = new AdsService()
