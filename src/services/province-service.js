import ProvinceRepository from '../repositories/province-repository.js'

export default class ProvinceService {
  getAllAsync = async () => {
    const repo = new ProvinceRepository()
    const returnArray = await repo.getAllAsync()
    return returnArray
  }

  getByIdAsync = async (id) => {
    const repo = new ProvinceRepository()
    const entity = await repo.getByIdAsync(id)
    return entity
  }

  createAsync = async (entity) => {
    const repo = new ProvinceRepository()
    const created = await repo.createAsync(entity)
    return created
  }

  updateAsync = async (entity) => {
    const repo = new ProvinceRepository()
    const updated = await repo.updateAsync(entity)
    return updated
  }

  deleteByIdAsync = async (id) => {
    const repo = new ProvinceRepository()
    const deleted = await repo.deleteByIdAsync(id)
    return deleted
  }
}
