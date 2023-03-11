import axios from 'axios'
import positionMapper from '../../mappers/Position/position.mapper'

class PositionService {
  async getPositions (token: string) {
    try {
      const responseApi = await axios.get('/api/position', {
        headers: {
          authorization: token
        }
      })
      const response = responseApi.data.map((item: any) => {
        const result = positionMapper(item)
        return result
      })
      return response
    } catch (error) {
      throw error
    }
  }
}

export default PositionService
